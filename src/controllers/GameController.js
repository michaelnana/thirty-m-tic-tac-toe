import GameState from "../domain/GameState";

const gameState = new GameState();

export const getGame = () => {
    return gameState.getDetails();
}

export const addMove = (player, position) => {
    return gameState.addMove(player, position);
}

export const resetGame = () => {
    return gameState.resetScore();
}