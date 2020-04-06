export default class TicTacToe {
  constructor() {
    this.gameScore = { 1: 0, 2: 0 };
    if (!localStorage.getItem("gameScore")) {
      localStorage.setItem("gameScore", JSON.stringify(this.gameScore));
    }
  }

  saveGameScore(player) {
    this.gameScore = {
      ...this.gameScore,
      ...{ [player]: this.gameScore[player] + 1 },
    };
    localStorage.setItem("gameScore", JSON.stringify(this.gameScore));
  }

  getGameScore() {
    return JSON.parse(localStorage.getItem("gameScore"));
  }

  clearGameScore() {
    this.gameScore = { 1: 0, 2: 0 };
    localStorage.setItem("gameScore", JSON.stringify(this.gameScore));
  }
}
