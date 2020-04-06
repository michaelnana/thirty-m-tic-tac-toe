// @flow

import React from "react";
import styled from "styled-components";
import { Button, Chip } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import RadioButtonUncheckedOutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";

const Container = styled.div`
  align-items: center;
  border-bottom: 2px solid black;
  box-shadow: 1px 1px;
  display: flex;
  height: 50px;
  position: fixed;
  width: 100%;
  top: 0;
`;

const Logo = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  margin-left: 10px;
  width: 30%;
`;

const Content = styled.div`
  align-items: center;
  height: 100%;
  display: flex;
  padding-left: 100px;
  width: 70%;
`;

const PlayerDetails = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  height: 100%;
  margin-right: 30px;
  width: 130px;
`;

const Player = styled.p`
  font-weight: 500;
`;

type Props = {
  player1: number,
  player2: number,
  resetGame: Function,
};

export default function Navigation({ player1, player2, resetGame }: Props) {
  return (
    <Container>
      <Logo>
        <h3> Thirty M Tic Tac Toe</h3>
      </Logo>
      <Content>
        <PlayerDetails>
          <Player>Player 1</Player>
          <CloseIcon fontSize="large" />
          <Chip color="default" label={player1} />
        </PlayerDetails>
        <PlayerDetails>
          <Player>Player 2</Player>
          <RadioButtonUncheckedOutlinedIcon fontSize="large" />
          <Chip color="default" label={player2} />
        </PlayerDetails>
        <Button variant="outlined" color="default" onClick={resetGame}>
          Reset Game
        </Button>
      </Content>
    </Container>
  );
}
