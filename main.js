let cells = document.getElementsByClassName("cell")
let answerButtons = document.getElementById("answer-buttons")

function main() {
    for (let i = 0; i < cells.length; i++) {
        let cell = cells[i]
        cell.addEventListener("click", function () {
            answerButtons.style.display = "block"
            console.log("CLICKED", cell.id)
            answerButtons.setAttribute("cellNumber", `${cell.getAttribute("id")}`)
            buttonsStyling(cell.id)
        })
    }
    for (let i = 0, answerElements = answerButtons.getElementsByClassName("answer-button"); i < answerElements.length; i++) {
        let answerButton = answerElements[i]
        answerButton.addEventListener("click", function () {
            let cellId = answerButtons.getAttribute("cellNumber")
            if (answerButton.id === "abC")
                document.getElementById(cellId).innerText = ""
            else
                document.getElementById(cellId).innerText = answerButton.innerText
            buttonsStyling(cellId)
        })
    }

    fillBoard(getRandomBoard())
}

main()

function buttonsStyling(cellId) {
    let cell = document.getElementById(cellId)
    Array.from(document.getElementsByClassName("answer-button")).forEach(element => element.style.backgroundColor = "white")
    Array.from(document.getElementsByClassName("cell")).forEach(element => element.style.backgroundColor = "white")
    stylingHavingDigits(getHavingDigits(cell.getAttribute("class").split(" ")[1]))
    stylingHavingDigits(getHavingDigits(cell.getAttribute("class").split(" ")[2]))
    stylingHavingDigits(getHavingDigits(cell.getAttribute("class").split(" ")[3]))
    stylingCells()
}

function getHavingDigits(blockNumber) {
    const numbers = new Map();
    let blockCells = document.getElementsByClassName(blockNumber)
    for (let i = 0; i < blockCells.length; i++) {
        if (blockCells[i].innerText !== "")
            numbers.set(blockCells[i].id, parseInt(blockCells[i].innerText))
    }
    return numbers
}

function stylingCells() {
    let slices = ["block", "row", "col"]
    let winProgress = 0

    for (let i = 0; i < slices.length; i++) {
        for (let j = 1; j <= 9; j++) {
            let uniqueMap = new Map;
            Array.from(document.getElementsByClassName(`${slices[i]}${j}`)).forEach(element => {
                if (element.innerText !== "" && !Array.from(uniqueMap.keys()).includes(element.innerText)) {
                    uniqueMap.set(element.innerText, element.id)
                } else if (element.innerText !== "") {
                    document.getElementById(uniqueMap.get(element.innerText)).style.backgroundColor = "red"
                    document.getElementById(element.id).style.backgroundColor = "red"
                }
            })
            if (uniqueMap.size === 9)
                winProgress++
        }
    }

    if (winProgress === 27) {
        win()
    }
}

function win() {
    Array.from(document.getElementsByClassName("cell"))
        .forEach(element => {
            element.style.backgroundColor = "green"
            element.disabled = true
        })
    Array.from(document.getElementsByClassName("answer-button"))
        .forEach(element => {
            element.disabled = true
        })

}

function stylingHavingDigits(numbersMap) {
    Array.from(numbersMap.values()).forEach(value => {
        document.getElementById(`ab${value}`).style.backgroundColor = "gray"
    })
}

function fillBoard(board) {
    console.log(board)
    for (let i = 0; i < 9; i++) {
        Array.from(document.getElementsByClassName(`row${i + 1}`)).forEach((element, j) => {
            if (board[i][j] !== 0) {
                element.innerText = board[i][j]
                element.disabled = true
            }
        })
    }
}

function getRandomBoard() {
    const board1 = [
        [1, 0, 4, 8, 6, 5, 2, 3, 7],
        [7, 3, 0, 4, 1, 2, 9, 6, 8],
        [8, 0, 2, 3, 9, 7, 1, 0, 5],
        [9, 2, 1, 7, 4, 8, 3, 5, 6],
        [6, 7, 8, 5, 3, 1, 4, 2, 9],
        [4, 5, 3, 9, 2, 6, 8, 7, 1],
        [3, 8, 9, 0, 5, 4, 7, 1, 2],
        [2, 4, 6, 1, 7, 9, 5, 8, 3],
        [5, 1, 7, 2, 8, 3, 6, 9, 4]
    ]
    return board1
}