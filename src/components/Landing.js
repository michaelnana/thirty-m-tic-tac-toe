// @flow

import React, { PureComponent } from "react";
import styled from "styled-components";
import Board from "./Board";
import ResultsModal from "./ResultsModal";
import Navigation from "./Navigation";
import { addMove, getGame, resetGame } from "../controllers/GameController";
import isEmpty from "lodash/isEmpty";
import { DRAW } from "../domain/GameStatuses";

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

type Props = {};
type State = {
  playerToMakeMove: number,
  displayResults: boolean,
  resultsMessage: string,
  gameDetails: Object,
};

export default class Landing extends PureComponent<Props, State> {
  state = {
    playerToMakeMove: 1,
    displayResults: false,
    resultsMessage: "",
    gameDetails: {},
  };

  componentDidMount = () => {
    this.setState(() => ({ gameDetails: getGame() }));
  };

  togglePlayer = () => {
    if (this.state.playerToMakeMove === 1) {
      this.setState(() => ({ playerToMakeMove: 2 }));
    } else {
      this.setState(() => ({ playerToMakeMove: 1 }));
    }
  };

  makeMove = (row: number, column: number, player: number) => {
    const { gameStatus, gameDetails } = addMove(player, {
      row,
      column,
    });

    if (gameStatus === player) {
      this.setState(() => ({
        displayResults: true,
        resultsMessage: `Player ${player} wins!`,
      }));
    } else if (gameStatus === DRAW) {
      this.setState(() => ({
        displayResults: true,
        resultsMessage: `It's a draw`,
      }));
    }

    this.setState(() => ({
      gameDetails: gameDetails,
    }));
    this.togglePlayer();
  };

  movePlayed = (row: number, column: number) => {
    const { gameDetails } = this.state;
    return isEmpty(gameDetails) ? 0 : gameDetails.board[row][column];
  };

  resetScore = () => {
    const gameDetails = resetGame();
    this.setState(() => ({ playerToMakeMove: 1, gameDetails: gameDetails }));
  };

  render = () => {
    const {
      displayResults,
      gameDetails,
      playerToMakeMove,
      resultsMessage,
    } = this.state;
    return (
      <Container>
        <Navigation
          player1={isEmpty(gameDetails) ? 0 : gameDetails.gameScore[1]}
          player2={isEmpty(gameDetails) ? 0 : gameDetails.gameScore[2]}
          resetGame={this.resetScore}
        />
        <ResultsModal
          shouldDisplay={displayResults}
          resultsMessage={resultsMessage}
          onClose={() => {
            this.setState((prevState) => ({
              displayResults: !prevState.displayResults,
            }));
          }}
        />
        <Board
          playerToMakeMove={playerToMakeMove}
          makeMove={this.makeMove}
          movePlayed={this.movePlayed}
        />
      </Container>
    );
  };
}
