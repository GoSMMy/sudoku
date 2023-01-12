import {fillBoard, getRandomBoard} from "./board.js";
import {stopwatch} from "./stopwatch.js";
import {boardHelperToggle} from "./helpers.js";
import {borderBacklightHelperStyling, buttonsStyling} from "./styling.js";

export const cells = Array.from(document.getElementsByClassName("cell"))
export let currentCell = null
export const [footer] = document.getElementsByClassName("footer")
export const [answerButtons] = document.getElementsByClassName("answer-buttons")
export const [newGameButton] = document.getElementsByClassName("new-game")

let cancelStopwatch = null
let clicked = false

function main() {
    newGameButton.addEventListener("click", function () {
        cancelStopwatch?.()
        cancelStopwatch = stopwatch((time) => {
            const timer = document.getElementsByClassName("timer")[0]
            timer.innerText = time
        })
        fillBoard(getRandomBoard(), true)
        buttonsStyling()
        borderBacklightHelperStyling()
        footer.classList.add("answer-buttons-visible")
    })
    cells.forEach(cell => {
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
                cells.forEach(element => element.classList.remove("mouseover"))
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
            footer.classList.add("answer-buttons-visible")
            changeCurrentCell(cell)
            clicked = true
        })
    })

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
}

main()

export function changeCurrentCell(toCell) {
    currentCell = toCell
    buttonsStyling()
    borderBacklightHelperStyling()
}

export function win() {
    cells.forEach(element => {
        element.classList.remove("mouseover")
        element.classList.add("win")
        element.classList.add("disabled")
    })
    cancelStopwatch?.()
}
