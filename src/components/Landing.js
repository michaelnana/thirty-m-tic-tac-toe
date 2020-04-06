// @flow

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Board from "./Board";
import ResultsModal from "./ResultsModal";
import Navigation from "./Navigation";
import {
  addMove,
  getGame,
  resetBoard,
  resetGame,
} from "../controllers/GameController";
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

export default function Landing() {
  const [playerToMakeMove, setPlayerToMakeMove] = useState(1);
  const [displayResults, setDisplayResults] = useState(false);
  const [resultsMessage, setResultsMessage] = useState("");
  const [gameDetails, setGameDetails] = useState({});
  useEffect(() => setGameDetails(getGame()), []);

  const togglePlayer = () => {
    if (playerToMakeMove === 1) {
      setPlayerToMakeMove(2);
    } else {
      setPlayerToMakeMove(1);
    }
  };

  const makeMove = (row: number, column: number, player: number) => {
    const { gameStatus, gameDetails } = addMove(player, {
      row,
      column,
    });

    if (gameStatus === player) {
      setDisplayResults(true);
      setResultsMessage(`Player ${player} wins!`);
    } else if (gameStatus === DRAW) {
      setDisplayResults(true);
      setResultsMessage("It's a draw!");
    }
    setGameDetails(gameDetails);
    togglePlayer();
  };

  const movePlayed = (row: number, column: number) => {
    return isEmpty(gameDetails) ? 0 : gameDetails.board[row][column];
  };

  const resetScore = () => {
    const gameDetails = resetGame();
    setPlayerToMakeMove(1);
    setGameDetails(gameDetails);
  };

  return (
    <Container>
      <Navigation
        player1={isEmpty(gameDetails) ? 0 : gameDetails.gameScore[1]}
        player2={isEmpty(gameDetails) ? 0 : gameDetails.gameScore[2]}
        resetGame={resetScore}
      />
      <ResultsModal
        shouldDisplay={displayResults}
        resultsMessage={resultsMessage}
        onClose={() => {
          resetBoard();
          setDisplayResults(!displayResults);
          setGameDetails(getGame());
        }}
      />
      <Board
        playerToMakeMove={playerToMakeMove}
        makeMove={makeMove}
        movePlayed={movePlayed}
      />
    </Container>
  );
}
