import React, { PureComponent } from "react";
import styled from "styled-components";
import Board from "./Board";
import ResultsModal from "./ResultsModal";
import Navigation from "./Navigation";
import { addMove, getGame, resetGame } from "../controllers/GameController";
import isEmpty from "lodash/isEmpty";

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

export default class Landing extends PureComponent {
  constructor() {
    super();
    this.state = {
      playerToMakeMove: 1,
      displayResults: false,
      resultsMessage: "",
      gameDetails: {},
    };
  }

  componentDidMount = () => {
    this.setState(() => ({ gameDetails: getGame() }));
  };

  switchPlayer = () => {
    if (this.state.playerToMakeMove === 1) {
      this.setState(() => ({ playerToMakeMove: 2 }));
    } else {
      this.setState(() => ({ playerToMakeMove: 1 }));
    }
  };

  makeMove = (row, column, player) => {
    const response = addMove(player, {
      row: row,
      column: column,
    });
    if (response.gameStatus === player) {
      this.setState(() => ({
        displayResults: true,
        resultsMessage: `Player ${player} wins!`,
        gameDetails: response.gameDetails,
      }));
    } else if (response.gameStatus === 3) {
      this.setState(() => ({
        displayResults: true,
        resultsMessage: `It's a draw`,
        gameDetails: response.gameDetails,
      }));
    }
    this.setState(() => ({
      gameDetails: response.gameDetails,
    }));
    this.switchPlayer();
  };

  movePlayed = (row, column) => {
    const { gameDetails } = this.state;
    return isEmpty(gameDetails) ? 0 : gameDetails.board[row][column];
  };

  resetScore = () => {
    const gameDetails = resetGame();
    this.setState(() => ({ playerToMakeMove: 1, gameDetails: gameDetails }));
  };

  render = () => {
    const { gameDetails } = this.state;
    return (
      <Container>
        <Navigation
          player1={isEmpty(gameDetails) ? 0 : gameDetails.gameScore[1]}
          player2={isEmpty(gameDetails) ? 0 : gameDetails.gameScore[2]}
          resetGame={this.resetScore}
        />
        <ResultsModal
          shouldDisplay={this.state.displayResults}
          resultsMessage={this.state.resultsMessage}
          onClose={() => {
            this.setState((prevState) => ({
              displayResults: !prevState.displayResults,
            }));
          }}
        />
        <Board
          playerToMakeMove={this.state.playerToMakeMove}
          makeMove={this.makeMove}
          movePlayed={this.movePlayed}
        />
      </Container>
    );
  };
}
