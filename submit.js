let submit = document.getElementById("submit");
submit.addEventListener("click", function () {
  let arr = [];
  for (let i = 1; i <= 9; i++) {
    let temp = [];
    for (let j = 1; j <= 9; j++) {
      let input = document.getElementById(`row${i}-col${j}`);
      temp.push(Math.floor(+input.value));
    }
    arr.push(temp);
  }

  let flag = true;
  let col;
  let row;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (arr[i][j] > 9 || arr[i][j] < 0) {
        console.log(arr[i][j]);
        flag = false;
        col = j;
        row = i;
        break;
      }
    }
    if (flag === false) {
      break;
    }
  }
  if (flag === false) {
    let input = document.getElementById(`row${row + 1}-col${col + 1}`);
    input.style.backgroundColor = "red";
    input.style.color = "white";
    alert(`Please, Enter correct Value in, Row ${row + 1} Column ${col + 1}!`);
  } else {
    let checkdual = checkentry(arr);

    if (checkdual === false) {
      alert("You've Entered wrong Entry!");
    } else {
      solve(arr);
      appendData(arr);
      console.log(arr);
    }
  }
});

function checkentry(arr) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let current = arr[i][j];
      if (current !== 0) {
        for (let k = 0; k < 9; k++) {
          if (arr[i][k] == current && k !== j) {
            return false;
          }
          if (arr[k][j] == current && k !== i) {
            return false;
          }
        }

        // let xapp=Math.floor(j/3)*3;
        // let yapp=Math.floor(i/3)*3;

        // for(let k=0; k<=2; k++)
        // {
        //     for(let l=0; l<=2; l++)
        //     {
        //         if(arr[yapp+k][xapp+l]===current && (k!=i && l!=j))
        //         {
        //             return false;
        //         }
        //     }
        // }
      }
    }
  }
  return true;
}
