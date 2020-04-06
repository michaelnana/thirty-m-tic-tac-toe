import React from "react";
import styled from "styled-components";
import BoardSquare from "./BoardSquare";

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const TicTacToeBoard = styled.div`
  border: 5px solid black;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 300px;
  width: 300px;
`;

const GameMove = styled.div`
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 500;
`;

const spots = [
  { row: 0, column: 0 },
  { row: 0, column: 1 },
  { row: 0, column: 2 },
  { row: 1, column: 0 },
  { row: 1, column: 1 },
  { row: 1, column: 2 },
  { row: 2, column: 0 },
  { row: 2, column: 1 },
  { row: 2, column: 2 },
];

export default function Board({ playerToMakeMove, makeMove, movePlayed }) {
  return (
    <Container>
      <GameMove>Player {playerToMakeMove} turn</GameMove>
      <TicTacToeBoard>
        {spots.map((pos) => (
          <BoardSquare
            row={pos.row}
            column={pos.column}
            player={playerToMakeMove}
            makeMove={makeMove}
            movePlayed={movePlayed(pos.row, pos.column)}
          />
        ))}
      </TicTacToeBoard>
    </Container>
  );
}