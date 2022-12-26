let cells = document.getElementsByClassName("cell")
let [answerButtons] = document.getElementsByClassName("answer-buttons")
let clicked = false
let duplicates = false

function main() {
    Array.from(document.getElementsByClassName("new-game")).forEach(element => {
        element.addEventListener("click", function () {
            let board = getRandomBoard()
            fillBoard(board)
        })
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
            cell.classList.forEach((value) => {
                    if (clicked === false && value !== "cell") {
                        Array.from(document.getElementsByClassName(value)).forEach(element =>
                            element.classList.add("mouseover")
                        )
                    }
                }
            )
        })
        cell.addEventListener("click", function () {
            answerButtons.classList.add("answer-buttons-visible")
            console.log("CLICKED", cell.id)
            answerButtons.setAttribute("cellNumber", `${cell.getAttribute("id")}`)
            clicked = true
            buttonsStyling(cell.id)
            cell.style.border = "3px solid gray"
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
            clicked = false
            buttonsStyling(cellId)
        })
    }

    // fillBoard(getRandomBoard())
}

main()

function buttonsStyling(cellId) {
    let cell = document.getElementById(cellId)
    Array.from(document.getElementsByClassName("answer-button")).forEach(element => element.style.backgroundColor = "white")
    Array.from(document.getElementsByClassName("cell")).forEach(element => {
        element.classList.remove("duplicate")
        element.style.removeProperty("border")
    })
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
    duplicates = false
    let slices = ["block", "row", "col"]
    let winProgress = 0

    for (let i = 0; i < slices.length; i++) {
        for (let j = 1; j <= 9; j++) {
            let uniqueMap = new Map;
            Array.from(document.getElementsByClassName(`${slices[i]}${j}`)).forEach(element => {
                if (element.innerText !== "" && !Array.from(uniqueMap.keys()).includes(element.innerText)) {
                    uniqueMap.set(element.innerText, element.id)
                } else if (element.innerText !== "") {
                    duplicates = true
                    document.getElementById(uniqueMap.get(element.innerText)).classList.add("duplicate")
                    document.getElementById(element.id).classList.add("duplicate")
                }
            })
            if (uniqueMap.size === 9)
                winProgress++
        }
    }

    if (winProgress === 27) {
        document.getElementsByClassName("win-container")[0].classList.remove("hide")
        document.getElementsByClassName("answer-buttons")[0].classList.remove("answer-buttons-visible")
        // document.getElementsByClassName("win-container")
        win()
    }
}

function autoSolver() {
    if (duplicates) {
        alert("Ошибка: На поле присутсвуют дупликаты")
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
    Array.from(document.getElementsByClassName("cell")).forEach(element => {
        element.removeAttribute("style")
        element.disabled = false
        element.innerText = ""
    })
    Array.from(document.getElementsByClassName("answer-button")).forEach(element => {
        element.removeAttribute("style")
        element.removeAttribute("display")
        element.disabled = false
    })
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