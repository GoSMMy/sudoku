import {cells} from "./main.js";

export function fillBoard(board, disable = false) {
    cells.forEach(element => {
        element.classList.remove("disabled")
        element.innerText = ""
    })
    for (let i = 0; i < 9; i++) {
        Array.from(document.getElementsByClassName(`row${i + 1}`)).forEach((element, j) => {
            if (board[i][j] !== 0) {
                element.innerText = board[i][j]
                if (disable)
                    element.classList.add("disabled")
            }
        })
    }
}

export function getRandomBoard() {
    const boards =
        [
            [
                [1, 0, 4, 8, 6, 5, 2, 3, 7],
                [7, 3, 0, 4, 1, 2, 9, 6, 8],
                [8, 0, 2, 3, 9, 7, 1, 0, 5],
                [9, 2, 1, 7, 4, 8, 3, 5, 6],
                [6, 7, 8, 5, 3, 1, 4, 2, 9],
                [4, 5, 3, 9, 2, 6, 8, 7, 1],
                [3, 8, 9, 0, 5, 4, 7, 1, 2],
                [2, 4, 6, 1, 7, 9, 5, 8, 3],
                [5, 1, 7, 2, 8, 3, 6, 9, 4]
            ],
            [
                [8, 7, 0, 5, 0, 0, 0, 6, 0],
                [0, 1, 0, 0, 0, 0, 2, 0, 7],
                [6, 4, 0, 1, 8, 0, 5, 0, 9],
                [0, 0, 0, 0, 0, 1, 0, 0, 0],
                [1, 2, 0, 0, 0, 6, 0, 7, 5],
                [0, 0, 8, 0, 7, 2, 0, 0, 6],
                [0, 0, 0, 6, 0, 5, 0, 0, 8],
                [0, 0, 0, 0, 0, 4, 0, 0, 0],
                [9, 0, 4, 0, 0, 8, 6, 2, 1]
            ],
            [
                [0, 3, 2, 1, 0, 4, 0, 7, 0],
                [5, 0, 0, 3, 0, 0, 0, 0, 2],
                [0, 0, 0, 6, 2, 5, 0, 0, 0],
                [0, 8, 0, 0, 6, 1, 0, 2, 0],
                [0, 0, 7, 4, 0, 2, 6, 0, 8],
                [2, 0, 1, 7, 8, 0, 0, 5, 4],
                [6, 4, 0, 0, 0, 0, 0, 3, 0],
                [0, 9, 8, 0, 0, 3, 7, 0, 0],
                [7, 2, 3, 0, 5, 6, 0, 0, 1]
            ],
            //INVALID
            // [
            //     [0, 0, 9, 0, 2, 8, 7, 0, 0],
            //     [8, 0, 6, 0, 0, 4, 0, 0, 5],
            //     [0, 0, 3, 0, 0, 0, 0, 0, 4],
            //     [6, 0, 0, 0, 0, 0, 0, 0, 0],
            //     [0, 2, 0, 7, 1, 3, 4, 5, 0],
            //     [0, 0, 0, 0, 0, 0, 0, 0, 2],
            //     [3, 0, 0, 0, 0, 0, 5, 0, 0],
            //     [9, 0, 0, 4, 0, 0, 8, 0, 7],
            //     [0, 0, 1, 2, 5, 0, 3, 0, 0]
            // ]
        ]
    return boards[Math.floor(Math.random() * boards.length)]
}