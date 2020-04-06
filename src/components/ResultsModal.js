import React from "react";
import { Modal } from "@material-ui/core";
import styled from "styled-components";

const Content = styled.div`
  background-color: white;
  box-shadow: 2px 2px;
  left: 40%;
  position: absolute;
  width: 200px;
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
