// @flow

import React from "react";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import RadioButtonUncheckedOutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";

const Container = styled.button`
  border: none;
  border: 1px solid black;
  box-sizing: border-box;
  cursor: pointer;
  height: 100px;
  width: 100px;
`;

type Props = {
  column: number,
  makeMove: Function,
  movePlayed: number,
  player: number,
  row: number,
};

export default function BoardSquare({
  row,
  column,
  movePlayed,
  makeMove,
  player,
}: Props) {
  if (movePlayed === 0) {
    return (
      <Container onClick={() => makeMove(row, column, player)}></Container>
    );
  } else if (movePlayed === 1) {
    return (
      <Container onClick={() => makeMove(row, column, player)}>
        <CloseIcon fontSize="large" />
      </Container>
    );
  } else {
    return (
      <Container onClick={() => makeMove(row, column, player)}>
        <RadioButtonUncheckedOutlinedIcon fontSize="large" />
      </Container>
    );
  }
}
