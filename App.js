import React, { useEffect } from "react";
import { StyleSheet, View, Modal, Text, Pressable } from "react-native";
import { Ionicons, FontAwesome, Entypo } from "@expo/vector-icons"; // 6.2.2
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from "./components/Header";
import Score from "./components/Score";
import Card from "./components/Card";

import "./helpers";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.renderCards = this.renderCards.bind(this);
        this.resetCards = this.resetCards.bind(this);

        NavigationBar.setBackgroundColorAsync("#323338");

        let sources = {
            fontawesome: FontAwesome,
            entypo: Entypo,
            ionicons: Ionicons
        };

        let cards = [
            {
                src: "fontawesome",
                name: "heart",
                color: "red"
            },
            {
                src: "entypo",
                name: "feather",
                color: "#7d4b12"
            },
            {
                src: "entypo",
                name: "flashlight",
                color: "#f7911f"
            },
            {
                src: "entypo",
                name: "flower",
                color: "#37b24d"
            },
            {
                src: "entypo",
                name: "moon",
                color: "#ffd43b"
            },
            {
                src: "entypo",
                name: "youtube",
                color: "#FF0000"
            },
            {
                src: "entypo",
                name: "shop",
                color: "#5f5f5f"
            },
            {
                src: "fontawesome",
                name: "github",
                color: "#24292e"
            },
            {
                src: "fontawesome",
                name: "skype",
                color: "#1686D9"
            },
            {
                src: "fontawesome",
                name: "send",
                color: "#1c7cd6"
            },
            {
                src: "ionicons",
                name: "magnet",
                color: "#d61c1c"
            },
            {
                src: "ionicons",
                name: "logo-facebook",
                color: "#3C5B9B"
            }
        ];

        let clone = JSON.parse(JSON.stringify(cards));

        this.cards = cards.concat(clone);
        this.cards.map((obj) => {
            let id = Math.random().toString(36).substring(7);
            obj.id = id;
            obj.src = sources[obj.src];
            obj.is_open = false;
        });

        this.cards = this.cards.shuffle();
        this.state = {
            current_selection: [],
            selected_pairs: [],
            score: 0,
            cards: this.cards,
            modalVisible: false,
            lastMaxScore: 0,
            maxScore: 0
        };
    }

    async componentDidMount() {
        try {
            const value = await AsyncStorage.getItem("maxScore");
            console.log("value", value);
            if (value !== null) {
                this.setState({ maxScore: value });
            } else {
                this.setState({ maxScore: 0 });
            }
        } catch (e) {
            console.log("error", e);
        }
    }

    getDataStorage = async () => {
        let maxScore;
        try {
            const value = await AsyncStorage.getItem("maxScore");
            if (value !== null) {
                maxScore = value;
            } else {
                this.setState({ maxScore: 0 });
            }
        } catch (e) {
            console.log("error getDataStorage:", e);
        }
        return maxScore;
    };

    storeData = async (value) => {
        try {
            await AsyncStorage.setItem("maxScore", value);
        } catch (e) {
            console.log("error storeData:", e);
        }
    };

    modalVisibleChange() {
        this.setState({ modalVisible: !this.state.modalVisible });
        this.resetCards();
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar style="light" />
                <Header />
                <Score score={this.state.score} />
                <View>
                    <Pressable onPress={this.resetCards}>
                        <FontAwesome
                            name="refresh"
                            size={28}
                            color="black"
                            style={styles.restart}
                        />
                    </Pressable>
                </View>
                <View style={styles.body}>{this.renderRows.call(this)}</View>
                <Modal animationType="slide" transparent={true} visible={this.state.modalVisible}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>¡Puntuación!</Text>
                            <Text style={styles.modalTextScore}>{this.state.score}</Text>
                            <Text style={styles.modalText}>⭐ Récord ⭐</Text>
                            <Text style={[styles.modalTextScore, { color: "gold" }]}>
                                {this.state.maxScore}
                            </Text>

                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => this.modalVisibleChange()}
                            >
                                <Text
                                    style={styles.textStyle}
                                    onPress={() => this.modalVisibleChange()}
                                >
                                    Jugar de nuevo
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }

    resetCards() {
        let cards = this.cards.map((obj) => {
            obj.is_open = false;
            return obj;
        });

        cards = cards.shuffle();

        this.setState({
            current_selection: [],
            selected_pairs: [],
            cards: cards,
            score: 0
        });
    }

    renderRows() {
        let contents = this.getRowContents(this.state.cards);
        return contents.map((cards, index) => {
            return (
                <View key={index} style={styles.row}>
                    {this.renderCards(cards)}
                </View>
            );
        });
    }

    renderCards(cards) {
        return cards.map((card, index) => {
            return (
                <Card
                    key={index}
                    src={card.src}
                    name={card.name}
                    color={card.color}
                    is_open={card.is_open}
                    clickCard={this.clickCard.bind(this, card.id)}
                />
            );
        });
    }

    clickCard(id) {
        let selected_pairs = this.state.selected_pairs;
        let current_selection = this.state.current_selection;
        let score = this.state.score;

        let index = this.state.cards.findIndex((card) => {
            return card.id == id;
        });

        let cards = this.state.cards;

        if (cards[index].is_open == false && selected_pairs.indexOf(cards[index].name) === -1) {
            cards[index].is_open = true;

            current_selection.push({
                index: index,
                name: cards[index].name
            });

            if (current_selection.length == 2) {
                if (current_selection[0].name == current_selection[1].name) {
                    score += 10;
                    selected_pairs.push(cards[index].name);
                } else {
                    cards[current_selection[0].index].is_open = false;
                    // rest 2 to score when fail
                    if (score > 0) {
                        score -= 2;
                    }

                    setTimeout(() => {
                        cards[index].is_open = false;
                        this.setState({
                            cards: cards
                        });
                    }, 500);
                }

                current_selection = [];
            }

            if (selected_pairs.length === this.cards.length / 2) {
                this.getDataStorage()
                    .then((value) => {
                        if (value < score) {
                            // this.storeData(JSON.stringify(score));
                            this.setState({
                                maxScore: score
                            });
                        }
                    })
                    .catch((e) => {
                        console.log("error", e);
                    });
                //LocalStorage max score
                if (this.state.score > this.state.maxScore) {
                    this.storeData(JSON.stringify(score));
                }

                this.modalVisibleChange();
            }

            this.setState({
                score: score,
                cards: cards,
                current_selection: current_selection
            });
        }
    }

    getRowContents(cards) {
        let contents_r = [];
        let contents = [];
        let count = 0;
        cards.forEach((item) => {
            count += 1;
            contents.push(item);
            if (count == 4) {
                contents_r.push(contents);
                count = 0;
                contents = [];
            }
        });

        return contents_r;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: "stretch",
        backgroundColor: "#323338"
    },
    row: {
        flex: 1,
        flexDirection: "row"
    },
    body: {
        flex: 18,
        justifyContent: "space-between",
        padding: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "#222328",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 20,
        marginTop: 15
    },
    buttonOpen: {
        backgroundColor: "#F194FF"
    },
    buttonClose: {
        backgroundColor: "#5865F2"
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white",
        marginBottom: 10,
        textAlign: "center"
    },
    modalTextScore: {
        marginBottom: 15,
        textAlign: "center",
        color: "white",
        fontSize: 30
    },
    restart: {
        display: "flex",
        textAlign: "right",
        alignItems: "center",
        color: "#24A459",
        marginRight: 35,
        marginTop: -15
    }
});
