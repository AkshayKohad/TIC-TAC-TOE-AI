# Tic-Tac-Toe Game using Minimax AI Algorithm

This is a simple **Tic-Tac-Toe** game where a human player competes against an AI that uses the **Minimax algorithm** to find the optimal move. The game has a user-friendly interface with a canvas-based board and allows users to start new games, view game rules, and play against a smart AI opponent.

## Features

- **Two Players:** Human vs. AI
- **AI Opponent:** The AI uses the **Minimax algorithm** to make optimal moves.
- **Interactive Game Board:** Click on the grid to make a move, and the game updates in real-time.
- **Game Rules Display:** Displays the basic rules of the game.
- **New Game Button:** Reset the game to start fresh at any time.
- **Result Display:** Announces the winner or if the game ends in a draw.

## Technologies Used

- **HTML5 Canvas:** For rendering the Tic-Tac-Toe board and the X's and O's.
- **JavaScript:** For game logic and implementing the Minimax algorithm.
- **CSS:** For styling the game layout, canvas, and buttons.

## Game Rules

1. The game is played on a 3x3 grid.
2. Players take turns. The human player is assigned 'X' and the AI is assigned 'O'.
3. A player wins if they manage to place three of their symbols (X or O) in a row, column, or diagonal.
4. If all 9 squares are filled and no player has won, the game is a draw.
5. You can start a new game at any time by clicking the **New Game** button.

## AI - Minimax Algorithm

The AI opponent uses the **Minimax algorithm**, which evaluates all possible future moves to choose the one that leads to the best outcome (win, block, or draw). The Minimax function recursively explores all game states and assigns scores to each possible move, ultimately selecting the optimal move for the AI.

## How the Minimax Algorithm Works

1. **Base Cases:**  
   - If the human wins, it returns a score of `-10`.
   - If the AI wins, it returns a score of `+10`.
   - If the game ends in a draw, it returns a score of `0`.
   
2. **Recursion:**  
   The algorithm simulates all possible future game states for both players and tries to minimize the human's chances of winning while maximizing the AI's chances. It evaluates all potential moves and selects the one with the best score for the AI.

3. **Optimal Move Selection:**  
   The AI always picks the move with the highest score (for itself) or lowest score (for the human) from the pool of possible moves.

## File Structure

- `index.html` - The main HTML file that contains the game structure and loads the CSS and JavaScript files.
- `style.css` - The stylesheet that controls the layout and appearance of the game.
- `script.js` - The JavaScript file that implements the game logic, user interaction, and AI logic using the Minimax algorithm.

## How to Run the Game

1. Clone or download the repository.
2. Open `index.html` in any modern web browser.
3. Start playing by clicking on any square to place your 'X'.
4. Watch the AI respond with its 'O' and try to win!

## Screenshots

![Tic-Tac-Toe Game Screenshot](screenshot.png)

## Future Improvements

- **Difficulty Levels:** Implement different difficulty levels for the AI, such as an easy mode where the AI makes random moves.
- **Multiplayer Mode:** Add the option for two human players to play against each other.
- **Enhanced UI:** Improve the visual aesthetics of the game with animations and sound effects.

## License

This project is licensed under the MIT License.

