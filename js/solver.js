let board = []

function solve() {

}

function toArray() {
    for (let i = 1; i <= 9; i++) {
        for (let j = 1; j <= 9; j++) {
            let num = parseInt(document.getElementById(`row${i}-col${j}`).innerText)
            board[i][j] = num
        }
    }
}