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
});

const emptyBoard = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

test("adds 1 + 2 to equal 3", () => {
  expect(1 + 2).toBe(3);
});
