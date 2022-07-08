function possible(arr, y, x, n) {
  for (let i = 0; i <= 8; i++) {
    if (arr[y][i] === n || arr[i][x] === n) {
      return false;
    }
  }

  let xapp = Math.floor(x / 3) * 3;
  let yapp = Math.floor(y / 3) * 3;

  for (let i = 0; i <= 2; i++) {
    for (let j = 0; j <= 2; j++) {
      if (arr[yapp + i][xapp + j] === n) {
        return false;
      }
    }
  }
  return true;
}

function solve(board) {
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (board[y][x] === 0) {
        for (let n = 1; n <= 9; n++) {
          if (possible(board, y, x, n) == true) {
            board[y][x] = n;

            if (solve(board)) return board;
          }
        }
        board[y][x] = 0;
        return false;
      }
    }
  }

  return board;
}
