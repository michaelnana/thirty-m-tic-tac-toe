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
  width: 200px;
`;

const Content = styled.div`
  align-items: center;
  height: 100%;
  display: flex;
  justify-content: center;
  padding-left: 100px;
`;

const Player = styled.div`
  margin: 0 10px;
`;

export default function Navigation({ player1, player2, resetGame }) {
  return (
    <Container>
      <Logo>
        <h3> Thirty M Tic Tac Toe</h3>
      </Logo>
      <Content>
        <Player>Player 1</Player>
        <CloseIcon size="lg" />
        <Chip color="primary" label={player1} />
        <Player>Player 2</Player>
        <RadioButtonUncheckedOutlinedIcon />
        <Chip color="primary" label={player2} />
        <Button variant="outlined" color="primary" onClick={resetGame}>
          Reset Game
        </Button>
      </Content>
    </Container>
  );
}
