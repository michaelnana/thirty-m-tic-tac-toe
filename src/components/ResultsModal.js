import React from "react";
import { Modal } from "@material-ui/core";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    font-size: 20px;
  }

  to {
    font-size: 30px;
  }
`;

const Content = styled.div`
  background-color: white;
  animation: ${rotate} 1s linear;
  box-shadow: 2px 2px;
  font-size: 20px;
  font-weight: 800;
  left: 40%;
  position: absolute;
  width: 220px;
  padding: 30px;
  text-align: center;
  top: 40%;
`;

export default function ResultsModal({
  shouldDisplay,
  onClose,
  resultsMessage,
}) {
  return (
    <Modal
      open={shouldDisplay}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Content>{resultsMessage}</Content>
    </Modal>
  );
}
