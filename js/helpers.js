import {borderBacklightHelperStyling, buttonsStyling} from "./styling.js";

const [answerHelper] = document.getElementsByClassName("answer-helper")
const [boardHelper] = document.getElementsByClassName("board-helper")
export let answerHelperToggle = false
export let boardHelperToggle = false


function init() {
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

init()