import GameState from "../../domain/GameState";

describe("GameState", () => {
  const testGameState = new GameState();
  describe("Checking for a draw game", () => {
    test("if the board has no more valid moves, it's a draw", () => {
      testGameState.board = [
        [1, 2, 1],
        [2, 1, 2],
        [1, 1, 2],
      ];
      expect(testGameState.isADraw()).toBeTruthy();
    });

    test("if the board still has a valid move, it's a draw", () => {
      testGameState.board = [
        [0, 2, 1],
        [2, 1, 2],
        [1, 1, 2],
      ];
      expect(testGameState.isADraw()).toBeFalsy();
    });
  });

  test("resetting game board removes all players moves", () => {
    testGameState.board = [
      [1, 2, 1],
      [2, 1, 2],
      [1, 1, 2],
    ];
    testGameState.resetBoard();
    expect(testGameState.board).toEqual(emptyBoard);
  });

  describe("Checking for a valid move", () => {
    test("If position isn't taken, it's a valid move", () => {
      testGameState.board = [
        [0, 2, 1],
        [2, 1, 2],
        [1, 1, 2],
      ];
      expect(testGameState.isValidMove({ row: 0, column: 0 })).toBeTruthy();
    });

    test("If position is taken, it isn't a valid move", () => {
      testGameState.board = [
        [0, 2, 1],
        [2, 1, 2],
        [1, 1, 2],
      ];
      expect(testGameState.isValidMove({ row: 1, column: 1 })).toBeFalsy();
    });
  });

  describe("Checking the status of the current game", () => {
    test("if the game is a draw return 3", () => {
      testGameState.board = [
        [1, 2, 1],
        [2, 1, 2],
        [1, 1, 2],
      ];
      expect(testGameState.checkGameStatus()).toEqual(3);
    });

    test("if the game is a draw return 3", () => {
      testGameState.board = [
        [1, 2, 1],
        [2, 1, 2],
        [2, 1, 2],
      ];
      expect(testGameState.checkGameStatus(1)).toEqual(3);
    });

    test("if the game isn't concluded return 0", () => {
      testGameState.board = [
        [0, 2, 1],
        [2, 1, 2],
        [2, 1, 2],
      ];
      expect(testGameState.checkGameStatus(1)).toEqual(0);
    });

    test("if player 1 wins return 1", () => {
      testGameState.board = [
        [1, 2, 1],
        [2, 1, 2],
        [2, 1, 1],
      ];
      expect(testGameState.checkGameStatus(1)).toEqual(1);
    });

    test("if player 2 wins return 2", () => {
      testGameState.board = [
        [2, 2, 2],
        [1, 1, 2],
        [2, 1, 1],
      ];
      expect(testGameState.checkGameStatus(2)).toEqual(2);
    });
  });

  describe("adding game moves", () => {
    test("if you make a invalid move response should include invalid move and board remains same", () => {
      testGameState.board = [
        [0, 2, 2],
        [1, 1, 2],
        [2, 1, 1],
      ];
      const {
        validMove,
        gameDetails: { board },
      } = testGameState.addMove(1, { row: 0, column: 1 });
      expect(validMove).toBeFalsy();
      expect(board).toEqual(testGameState.board);
    });

    test("if you make a valid move response should include valid move and board updates", () => {
      testGameState.board = [
        [0, 0, 2],
        [2, 2, 1],
        [1, 2, 1],
      ];
      const {
        validMove,
        gameDetails: { board },
      } = testGameState.addMove(1, { row: 0, column: 0 });
      expect(validMove).toBeTruthy();
      expect(board).toEqual([
        [1, 0, 2],
        [2, 2, 1],
        [1, 2, 1],
      ]);
    });
  });
});

const emptyBoard = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
