var size = 3;
var fieldCells = createField();
var values;
var startwatch = false;
var emptyX, emptyY;
var LEFT = { dx: 1, dy: 0 };
var RIGHT = { dx: -1, dy: 0 };
var UP = { dx: 0, dy: 1 };
var DOWN = { dx: 0, dy: -1 };
var turn = 0;
var second = 0;
var minute = 0;
var hour = 0;
var rounds = 0;
var pturns = 0;
var a = 0;
//Creat table
function createField() {
  let cells = [];
  let table = document.getElementById("field");
  for (let y = 0; y < size; y++) {
    let tr = document.createElement("tr");
    table.appendChild(tr);
    let rowCells = [];
    cells.push(rowCells);
    for (let x = 0; x < size; x++) {
      let td = document.createElement("td");
      td.setAttribute("class", "cell", "id", "celldata");
      td.id = y.toString() + "-" + x.toString();
      tr.appendChild(td);
      rowCells.push(td);
    }
  }
  return cells;
}

//store values in an array .
function createInitialValues() {
  emptyX = emptyY = size - 1;
  let v = [];
  let i = 1;
  for (let y = 0; y < size; y++) {
    let rowValues = [];
    v.push(rowValues);
    for (let x = 0; x < size; x++) {
      rowValues.push(i);
      i++;
    }
  }
  v[emptyY][emptyX] = 0;
  return v;
}

//draw values on table cell
function draw() {
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let v = values[y][x];
      let td = fieldCells[y][x];
      td.innerHTML = v == 0 ? "" : String(v);
    }
  }
}

//swap values 

function makeMove(move) {
  let newX = emptyX + move.dx,
    newY = emptyY + move.dy;
  if (newX >= size || newX < 0 || newY >= size || newY < 0) {
    return false;
  }

  let c = values[newY][newX];
  values[newY][newX] = 0;
  values[emptyY][emptyX] = c;
  emptyX = newX;
  emptyY = newY;
  return true;
}

//Mouse click event

function handleClick() {
  document.addEventListener("click", clickInput)
}

function clickInput(e) {

  let temp = e.target.innerHTML;
  let row;
  let column;
  let swap = false;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let v = values[y][x];
      let td = fieldCells[y][x];
      if (td.innerHTML == temp && e.target.getAttribute("class") == "cell") {
        row = y;
        column = x;
      }
    }
  }

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let v = values[y][x];
      let td = fieldCells[y][x];
      if (td.innerHTML == 0 && e.target.getAttribute("class") == "cell") {
        if (
          (y == row + 1 && x == column) ||
          (y == row - 1 && x == column) ||
          (x == column + 1 && y == row) ||
          (x == column - 1 && y == row)
        ) {
          td.innerHTML = temp;
          swap = true;
          countMoves();
          gameOverClick();
        }
      } 
    }
    if (e.target.getAttribute("class") == "cell" && swap == true){
      e.target.innerHTML = "";
    }
  }
  gameOver();
  puzzlesolved();
}

handleClick();

//count Moves

function countMoves() {
  let ct = document.getElementById("Turns");
  turn = turn + 1;
  ct.innerHTML = turn;
  return turn;
}

//timer

window.setInterval(function timer() {
  if (startwatch) {
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
    if (minute == 60) {
      hour++;
      minute = 0;
      second = 0;
    }
    if (second == 60) {
      minute++;
      second = 0;
    }
    if (minute == 60) {
      hour++;
      minute = 0;
      second = 0;
    }
    let hrString = hour;
    let minString = minute;
    let secString = second;

    if (hour < 10) {
      hrString = "0" + hrString;
    }

    if (minute < 10) {
      minString = "0" + minString;
    }

    if (second < 10) {
      secString = "0" + secString;
    }

    document.getElementById("hr").innerHTML = hrString;
    document.getElementById("min").innerHTML = minString;
    document.getElementById("sec").innerHTML = secString;
  }
}, 1000);

let clr;
function startTimer() {
  clr = setInterval(timer, 1000);
}

function shuffle() {
  let options = [LEFT, RIGHT, UP, DOWN];
  let iterations = 500;
  for (let i = 0; i < iterations; i++) {
    let move = options[Math.floor(Math.random() * options.length)];
    makeMove(move);
  }
}

function resettimer() {
  document.getElementById("sec").innerHTML = "00";
  document.getElementById("min").innerHTML = "00";
  document.getElementById("hr").innerHTML = "00";
  second = 0;
  minute = 0;
  hour = 0;
}


let record = document.getElementById("new");
record.addEventListener("click", click1);

function click1() {
 
  a = countMoves();
  pturns = a;

  rounds = rounds + 1;
  let ct = document.getElementById("Turns");
  turn = 0;
  ct.innerHTML = turn;
  records();
  showrecords();
}


// let nextRound = document.getElementById("new");
// record.addEventListener("click", click2);

function click2() {
 
  a = countMoves();
  pturns = a;

  // rounds = rounds + 1;
  let ct = document.getElementById("Turns");
  turn = 0;
  ct.innerHTML = turn;
  // records();
  // showrecords();
}
//set items in local storage

function records() {
  localStorage.setItem("Seconds", second);
  localStorage.setItem("Minutes", minute);
  localStorage.setItem("Hours", hour);
  localStorage.setItem("Previous Turns", pturns);
  localStorage.setItem("Rounds", rounds);
  localStorage.setItem("PrevCondition", gameOver());
}

//For showing previous records
function showrecords() {
  let round = localStorage.getItem("Rounds");
  let sec = localStorage.getItem("Seconds");
  let min = localStorage.getItem("Minutes");
  let hr = localStorage.getItem("Hours");
  let pt = localStorage.getItem("Previous Turns");
  let prevturn = document.getElementById("prevturn");
  let timer = document.getElementById("timer");
  let plays = document.getElementById("plays");
  let compl = document.getElementById("compl");

  prevturn.innerHTML = "Previous Turns: " + pt;
  timer.innerHTML = "Previous Time: " + hr + " : " + min + " : " + sec;
  plays.innerHTML = "Round No :" + round;

  if (pc == "true") {
    compl.innerHTML = "Status: Previous Round Was Won.";
  } else {
    compl.innerHTML = "Status: Previous Round Was Not Completed";
  }
}
// game over

function gameOver() {
  let expectedValue = 1;
  clearInterval(clr);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (values[y][x] == expectedValue) {
        expectedValue++;
      } else {
        if (x == size - 1 && y == size - 1 && values[y][x] == 0) {
          return true;
        }
        return false;
      }
    }
  }
  records();
  startwatch = false;
  return true;
}

function gameOverClick(){

  document.getElementById("0-0").innerHTML

 if(document.getElementById("0-0").innerHTML == 1 &&
    document.getElementById("0-1").innerHTML == 2 &&
    document.getElementById("0-2").innerHTML == 3 &&
    document.getElementById("1-0").innerHTML == 4 &&
    document.getElementById("1-1").innerHTML == 5 &&
    document.getElementById("1-2").innerHTML == 6 &&
    document.getElementById("2-0").innerHTML == 7 &&
    document.getElementById("2-1").innerHTML == 8
 ){
  setTimeout(function () {
    alert("Congratulation!you won the game!");
    init();
  }, 500);
}

}

document.addEventListener("keydown", function (e) {
  countMoves();

  switch (e.keyCode) {
    case 38:
      makeMove(UP);
      break;
    case 40:
      makeMove(DOWN);
      break;
    case 37:
      makeMove(LEFT);
      break;
    case 39:
      makeMove(RIGHT);
      break;
  }

  draw();

  puzzlesolved();
  
});

function puzzlesolved(){
  
  if (gameOver()) {
    //Event loop to make our code Asynchonous.
    setTimeout(function () {
      alert("Congratulation!you won the game!");
      init();
    }, 500);
  }
  return true
}

function play(){
  values = createInitialValues();
  draw( shuffle());
  startwatch = true;
  startTimer();
 

}

function init() {
  startwatch = true;
  resettimer();
  click2();
  // startTimer();
  values = createInitialValues();
  shuffle();
  draw();
}

