// @flow

import React from "react";
import styled from "styled-components";
import BoardSquare from "./BoardSquare";
import { Avatar } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import RadioButtonUncheckedOutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";

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
  align-items: center;
  display: flex;
  justify-content: space-between;
  height: 50px;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 500;
  width: 150px;
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

type Props = {
  makeMove: Function,
  movePlayed: Function,
  playerToMakeMove: number,
};

export default function Board({
  playerToMakeMove,
  makeMove,
  movePlayed,
}: Props) {
  const renderPlayerIcon = () => {
    if (playerToMakeMove === 1) {
      return (
        <Avatar>
          <CloseIcon />
        </Avatar>
      );
    } else {
      return (
        <Avatar>
          <RadioButtonUncheckedOutlinedIcon />
        </Avatar>
      );
    }
  };
  return (
    <Container>
      <GameMove>
        {" "}
        {renderPlayerIcon()} Player {playerToMakeMove} turn
      </GameMove>
      <TicTacToeBoard>
        {spots.map((pos, index) => (
          <BoardSquare
            key={index}
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
