import {answerHelperToggle, boardHelperToggle} from "./helpers.js";
import {cells, currentCell, footer, win} from "./main.js";

export let duplicates = false

export function buttonsStyling() {
    let parts = currentCell?.classList
    Array.from(document.getElementsByClassName("answer-button")).forEach(element => element.classList.remove("havingNumber"))
    cells.forEach(element => {
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

export function borderBacklightHelperStyling() {
    cells.forEach(element => {
        element.classList.remove("duplicate")
        element.classList.remove("mouseover")
    })
    if (boardHelperToggle) {
        currentCell?.classList.forEach((value) => {
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
        footer.classList.remove("answer-buttons-visible")
        win()
    }
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

function stylingHavingDigits(numbersMap) {
    Array.from(numbersMap.values()).forEach(value => {
        document.getElementById(`ab${value}`).classList.add("havingNumber")
    })
}