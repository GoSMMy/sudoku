import {buttonsStyling} from "./styling.js";
import {changeCurrentCell, currentCell} from "./main.js";

const onlyDigits = new RegExp("\\d")
const onlyArrows = new RegExp("(ArrowUp)|(ArrowDown)|(ArrowLeft)|(ArrowRight)")

function init() {
    document.addEventListener("keydown", (e) => keyBoardHandler(e))
}

init()

function keyBoardHandler(event) {
    if (event.key.match(onlyDigits) && !currentCell.classList.contains("disabled")) {
        currentCell.innerText = event.key
        buttonsStyling()
    } else if (event.key.match("Backspace") && !currentCell.classList.contains("disabled")) {
        currentCell.innerText = ""
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