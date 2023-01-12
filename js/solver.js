import {fillBoard} from "./board.js";
import {buttonsStyling, duplicates} from "./styling.js";
import {win} from "./main.js";

let [solveButton] = document.getElementsByClassName("auto-solver")
let board = [[], [], [], [], [], [], [], [], []]

function init() {
    solveButton.addEventListener("click", function () {
        toMatrix()
        if (duplicates === false && sudokuSolver()) {
            fillBoard(board)
            buttonsStyling()
            win()
        } else {
            alert("Невалидное судоку")
        }
    })
}

init()

function toMatrix() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let num = document.getElementById(`row${i + 1}-col${j + 1}`).innerText
            if (num === "")
                board[i][j] = 0
            else
                board[i][j] = parseInt(num)
        }
    }
    console.log(board)
}

function sudokuSolver() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) {
                for (let k = 1; k <= 9; k++) {
                    if (isValid(board, i, j, k)) {
                        board[i][j] = k;
                        if (sudokuSolver(board)) {
                            return true;
                        } else {
                            board[i][j] = 0;
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function isValid(board, row, col, k) {
    for (let i = 0; i < 9; i++) {
        const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const n = 3 * Math.floor(col / 3) + i % 3;
        if (board[row][i] === k || board[i][col] === k || board[m][n] === k) {
            return false;
        }
    }
    return true;
}