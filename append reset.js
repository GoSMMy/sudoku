function appendData(arr) {
  for (let i = 1; i <= 9; i++) {
    for (let j = 1; j <= 9; j++) {
      let input = document.getElementById(`row${i}-col${j}`);

      if (+input.value > 0) {
        input.style.backgroundColor = "yellow";
        input.style.color = "red";
      } else {
        input.style.backgroundColor = "green";
        input.style.color = "white";
      }

      input.value = arr[i - 1][j - 1];
    }
  }
}

let reset = document.getElementById("reset");
reset.addEventListener("click", function () {
  for (let i = 1; i <= 9; i++) {
    for (let j = 1; j <= 9; j++) {
      let input = document.getElementById(`row${i}-col${j}`);
      input.value = null;
      input.style.backgroundColor = "white";
      input.style.color = "black";
      input.style.border = "1px solid gray";
    }
  }
});
