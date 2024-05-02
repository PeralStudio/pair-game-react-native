# Pair Game

Pair Game is a simple and entertaining mobile game developed using React Native and Expo. The objective of the game is to match pairs of cards within a grid. It's a classic memory game that challenges players to remember the position of cards and find their matching pairs.

## Features

-   **Memory Challenge**: Exercise your memory by finding matching pairs of cards.
-   **Simple Gameplay**: Easy-to-understand gameplay suitable for all ages.
-   **High Scores**: Utilizes AsyncStorage to store and display the highest scores achieved.

## Installation

To run Pair Game on your local machine, follow these steps:

1. Make sure you have Node.js installed on your computer.
2. Clone this repository:

    ```bash
    git clone https://github.com/your-username/pair-game.git
    ```

3. Navigate to the project directory:
    ```bash
    cd pair-game
    ```
4. Install dependencies:
    ```bash
    npm install
    ```
5. Start the Expo development server:
    ```bash
    npm start
    ```
6. Follow the instructions in the console or Expo DevTools to open the app on your iOS or Android device/emulator.

## How to Play

1. Upon starting the game, you will see a grid of facedown cards.
2. Tap on a card to reveal its symbol.
3. Tap on another card to reveal its symbol.
4. If the symbols match, the cards stay face up. If not, they flip back facedown.
5. Continue until all pairs are matched.

## AsyncStorage

Pair Game uses AsyncStorage, a simple, unencrypted, asynchronous, persistent, key-value storage system, to store and retrieve the highest scores achieved by players. This allows users to track their progress and compete for the highest score.

## Contributing

Contributions are welcome! If you have any ideas, enhancements, or bug fixes, feel free to open an issue or create a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgments

-   **React Native**: A fantastic framework for building native mobile applications using React.
-   **Expo**: The fastest way to build an app.
-   **AsyncStorage**: A simple, AsyncStorage interface for React Native.

Enjoy playing Pair Game! If you have any questions or feedback, don't hesitate to reach out. Happy gaming! 🃏
