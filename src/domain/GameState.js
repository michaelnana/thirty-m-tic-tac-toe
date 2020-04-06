import { validWaysToWin } from "./Wins";
import TicTacToe from "../persistence/TicTacToe";

export default class GameState {
  constructor() {
    this.board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    this.ticTacToe = new TicTacToe();
  }

  getDetails() {
    return {
      board: this.board,
      gameScore: this.ticTacToe.getGameScore(),
    };
  }

  addMove(player, position) {
    if (this.isValidMove(position)) {
      this.board[position.row][position.column] = player;
      const gameStatus = this.checkGameStatus(player);
      return {
        gameDetails: this.getDetails(),
        gameStatus: gameStatus,
        move: `Player ${player} selected row: ${position.row} column: ${position.column}`,
        validMove: true,
      };
    } else {
      console.log("Not a valid move");
      return {
        gameDetails: this.getDetails(),
        gameStatus: this.checkGameStatus(player),
        move: "",
        validMove: false,
      };
    }
  }

  isValidMove(position) {
    return this.board[position.row][position.column] === 0;
  }

  checkGameStatus(player) {
    const gameWinners = Object.values(validWaysToWin);
    if (this.isADraw()) {
      this.resetBoard();
      return 3;
    }
    for (var i = 0; i < gameWinners.length; i++) {
      if (
        this.board[gameWinners[i][0].row][gameWinners[i][0].column] ===
          player &&
        this.board[gameWinners[i][1].row][gameWinners[i][1].column] ===
          player &&
        this.board[gameWinners[i][2].row][gameWinners[i][2].column] === player
      ) {
        this.ticTacToe.saveGameScore(player);
        this.resetBoard();
        return player;
      }
    }
    return 0;
  }

  resetBoard = () => {
    this.board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
  };

  resetScore = () => {
    this.resetBoard();
    this.ticTacToe.clearGameScore();
    return this.getDetails();
  };

  isADraw() {
    for (var i = 0; i < this.board.length; i++) {
      for (var j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] === 0) {
          return false;
        }
      }
    }
    return true;
  }
}
