let cells = document.getElementsByClassName("cell")
let [answerButtons] = document.getElementsByClassName("answer-buttons")
let [answerHelper] = document.getElementsByClassName("answer-helper")
let [boardHelper] = document.getElementsByClassName("board-helper")
let cancelStopwatch = null
let answerHelperToggle = false
let boardHelperToggle = false
let currentCell = null
let onlyDigits = new RegExp("\\d")
let onlyArrows = new RegExp("(ArrowUp)|(ArrowDown)|(ArrowLeft)|(ArrowRight)")
let clicked = false
let duplicates = false

const stopwatch = (onUpdate) => {
    const start = Date.now();
    const intervalId = setInterval(() => {
        const time = new Date(Date.now() - start);
        const diff = (Date.now() - start) / 1000;
        const minutes = Math.floor((diff / 60));
        const seconds = time.getSeconds();

        const result = [minutes, seconds]
            .map((item) => item < 10 ? `0${item}` : item)
            .join(':');
        onUpdate(result);
    }, 500)

    return () => {
        clearInterval(intervalId);
    }
}

function main() {
    document.getElementsByClassName("new-game")[0].addEventListener("click", function () {
        cancelStopwatch?.()
        cancelStopwatch = stopwatch((time) => {
            const timer = document.getElementsByClassName("timer")[0]
            timer.innerText = time
        })
        let board = getRandomBoard()
        fillBoard(board)
        buttonsStyling()
        borderBacklightHelperStyling()
        document.getElementsByClassName("footer")[0].classList.add("answer-buttons-visible")
    })
    for (let i = 0; i < cells.length; i++) {
        let cell = cells[i]
        cell.addEventListener("mouseout", function () {
            cell.classList.forEach((value) => {
                if (clicked === false && value !== "cell") {
                    Array.from(document.getElementsByClassName(value)).forEach(element =>
                        element.classList.remove("mouseover")
                    )
                }
                }
            )
        })
        cell.addEventListener("mouseover", function () {
            if (clicked === false) {
                Array.from(cells).forEach(element => element.classList.remove("mouseover"))
            }
            if (boardHelperToggle) {
                cell.classList.forEach((value) => {
                        if (clicked === false && (value.match("(row.*)") || value.match("(col.*)") || value.match("(block.*)"))) {
                            Array.from(document.getElementsByClassName(value)).forEach(element =>
                                element.classList.add("mouseover")
                            )
                        }
                    }
                )
            }
        })
        cell.addEventListener("click", function () {
            document.getElementsByClassName("footer")[0].classList.add("answer-buttons-visible")
            changeCurrentCell(cell)
            clicked = true
        })
    }
    document.addEventListener("keydown", (e) => keyBoardHandler(e))
    for (let i = 0, answerElements = answerButtons.getElementsByClassName("answer-button"); i < answerElements.length; i++) {
        let answerButton = answerElements[i]
        answerButton.addEventListener("click", function () {
            if (answerButton.id === "abC")
                currentCell.innerText = ""
            else
                currentCell.innerText = answerButton.innerText
            clicked = false
            buttonsStyling()
        })
    }

    answerHelper.addEventListener("click", function () {
        if (answerHelperToggle) {
            answerHelper.classList.remove("answer-helper-hover")
            answerHelperToggle = false
            buttonsStyling()
        } else {
            answerHelper.classList.add("answer-helper-hover")
            answerHelperToggle = true
            buttonsStyling()
        }
    })

    boardHelper.addEventListener("click", function () {
        if (boardHelperToggle) {
            boardHelper.classList.remove("answer-helper-hover")
            boardHelperToggle = false
            borderBacklightHelperStyling()
        } else {
            boardHelper.classList.add("answer-helper-hover")
            boardHelperToggle = true
            borderBacklightHelperStyling()
        }
    })
}

main()

function changeCurrentCell(toCell) {
    currentCell = toCell
    buttonsStyling()
    borderBacklightHelperStyling()
}

function keyBoardHandler(event) {
    if (event.key.match(onlyDigits)) {
        currentCell.innerText = currentCell.classList.contains("disabled") === false ? event.key : currentCell.innerText
        buttonsStyling()
    } else if (event.key.match("Backspace")) {
        currentCell.innerText = currentCell.classList.contains("disabled") === false ? "" : currentCell.innerText
        buttonsStyling()
    } else if (event.key.match(onlyArrows)) {
        switch (event.key) {
            case "ArrowUp":
                changeCurrentCell(getNextCell(-1, 0))
                break
            case "ArrowDown":
                changeCurrentCell(getNextCell(1, 0))
                break
            case "ArrowLeft":
                changeCurrentCell(getNextCell(0, -1))
                break
            case "ArrowRight":
                changeCurrentCell(getNextCell(0, 1))
                break
            default:
                break
        }
    }
}

function getNextCell(row, col) {
    if (currentCell === null)
        currentCell = document.getElementById("row1-col1")
    let currentCords = currentCell.id.split("-")
    let resultRow = parseInt(currentCords[0][3]) + row
    let resultCol = parseInt(currentCords[1][3]) + col
    if (resultRow <= 0)
        resultRow = 9
    else if (resultRow >= 10)
        resultRow = 1
    if (resultCol <= 0)
        resultCol = 9
    else if (resultCol >= 10)
        resultCol = 1
    return document.getElementById(`row${resultRow}-col${resultCol}`)
}

function buttonsStyling() {
    let parts = currentCell.classList
    Array.from(document.getElementsByClassName("answer-button")).forEach(element => element.classList.remove("havingNumber"))
    Array.from(document.getElementsByClassName("cell")).forEach(element => {
        element.classList.remove("currentCell")
        element.classList.remove("duplicate")
        element.classList.remove("win")
    })
    if (currentCell !== null)
        currentCell.classList.add("currentCell")
    if (answerHelperToggle) {
        stylingHavingDigits(getHavingDigits(parts[1]))
        stylingHavingDigits(getHavingDigits(parts[2]))
        stylingHavingDigits(getHavingDigits(parts[3]))
    }
    stylingCells()
}

function borderBacklightHelperStyling() {
    Array.from(cells).forEach(element => {
        element.classList.remove("duplicate")
        element.classList.remove("mouseover")
    })
    if (boardHelperToggle) {
        currentCell.classList.forEach((value) => {
                if (value !== "cell" && (value.match("(row.*)") || value.match("(col.*)") || value.match("(block.*)"))) {
                    Array.from(document.getElementsByClassName(value)).forEach(element =>
                        element.classList.add("mouseover")
                    )
                }
            }
        )
    }
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
    duplicates = false
    let parts = ["block", "row", "col"]
    let winProgress = 0

    for (let i = 0; i < parts.length; i++) {
        for (let j = 1; j <= 9; j++) {
            let uniqueMap = new Map;
            Array.from(document.getElementsByClassName(`${parts[i]}${j}`)).forEach(element => {
                if (element.innerText !== "" && !Array.from(uniqueMap.keys()).includes(element.innerText)) {
                    uniqueMap.set(element.innerText, element.id)
                } else if (element.innerText !== "") {
                    duplicates = true
                    if (boardHelperToggle) {
                        document.getElementById(uniqueMap.get(element.innerText)).classList.add("duplicate")
                        document.getElementById(element.id).classList.add("duplicate")
                    }
                }
            })
            if (uniqueMap.size === 9)
                winProgress++
        }
    }

    if (winProgress === 27) {
        document.getElementsByClassName("footer")[0].classList.remove("answer-buttons-visible")
        win()
    }
}

function win() {
    Array.from(document.getElementsByClassName("cell"))
        .forEach(element => {
            element.classList.remove("mouseover")
            element.classList.add("win")
            element.classList.add("disabled")
        })
    cancelStopwatch?.()
}

function stylingHavingDigits(numbersMap) {
    Array.from(numbersMap.values()).forEach(value => {
        document.getElementById(`ab${value}`).classList.add("havingNumber")
    })
}

function fillBoard(board) {
    Array.from(document.getElementsByClassName("cell")).forEach(element => {
        element.classList.remove("disabled")
        element.innerText = ""
    })
    // Array.from(document.getElementsByClassName("answer-button")).forEach(element => {
    //     element.removeAttribute("style")
    //     element.removeAttribute("display")
    //     element.disabled = false
    // })
    for (let i = 0; i < 9; i++) {
        Array.from(document.getElementsByClassName(`row${i + 1}`)).forEach((element, j) => {
            if (board[i][j] !== 0) {
                element.innerText = board[i][j]
                element.classList.add("disabled")
            }
        })
    }
}

function getRandomBoard() {
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
            ]
        ]
    return boards[Math.floor(Math.random() * boards.length)]
}
