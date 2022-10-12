//UI/display

import {
  TILE_STATUS,
  createBoard,
  marktile,
  revealtile,
  checkWin,
  cheskLose,
} from "./minesweeper.js";

const level = [
  {
    stage: "eazy",
    size: 5,
    bom: 3,
  },
  {
    stage: "medium",
    size: 10,
    bom: 10,
  },
  {
    stage: "hard",
    size: 20,
    bom: 50,
  },
];

function stageNow() {
  let tmp = window.location.search.substr(1).split("=");
  let stage;

  let stageNow = tmp[1];
  level.forEach(function (value) {
    if (value["stage"] == stageNow) {
      stage = value;
    }
  });

  return stage;
}

let stage = stageNow();
// stageNow();

const BOARD_SIZE = stage["size"];
const NUMBER_OF_MINE = stage["bom"];

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINE);
const boardElement = document.querySelector(".stage");
const minesLeftText = document.querySelector("[data-mine-count]");
const minesAll = document.querySelector("[data-mine]");
const messageText = document.querySelector(".subtext");
const score = document.querySelector(".score");
const btnReset = document.querySelector(".btn-reset");
const tmttime = document.querySelector(".tmt-time");
const tmtbom = document.querySelector(".tmt-bom");
const btnStop = document.querySelector(".btn-stop");
const btnresume = document.querySelector(".btn-resume");
const btnclose = document.querySelector(".btn-close");
const btnmark = document.querySelector(".btn-mark");
const btnsimpan = document.querySelector(".btn-simpan");
const start = document.querySelector(".start-game");
const timeDisplay = document.querySelector("[data-time]");
const scoreTime = document.querySelector(".score-time");
const tmtScore = document.querySelector(".tmt-score");
let mark = "off";
let timeScore = 0;

board.forEach((row) => {
  row.forEach((tile) => {
    boardElement.append(tile.element);

    tile.element.addEventListener("click", () => {
      clickTile(board, tile);
      // revealtile(board, tile);
      // checkGameEND();
    });

    tile.element.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      marktile(tile);
      listMineLeft();
    });
  });
});

function clickTile(board, tile) {
  if (mark == "on") {
    marktile(tile);
    listMineLeft();
  }
  if (mark == "off") {
    revealtile(board, tile);
    checkGameEND();
  }
}

btnReset.addEventListener("click", () => {
  location.reload();
});
btnsimpan.addEventListener("click", () => {
  simpanscore();
});
start.classList.add("d-none");
// time
let x = 0,
  tr;
let y = setInterval(() => {
  x++;
  tr = timeRecord(x);
  updateTime(tr);
  if (mark == "on") {
  }
}, 1000);

btnStop.addEventListener("click", (times) => {
  clearInterval(y);
  // console.log(x);
  tr = timeRecord(x);
  updateTime(tr);
  tmtTime(tr);
  tmtScore.classList.toggle("d-none");
});
btnresume.addEventListener("click", (times) => {
  tmtScore.classList.toggle("d-none");
  y = setInterval(() => {
    x++;
    tr = timeRecord(x);
    updateTime(tr);
  }, 1000);
});
btnmark.addEventListener("click", () => {
  if (mark == "off") {
    mark = "on";
    // console.log(mark);
  } else {
    mark = "off";
    // console.log(mark);
  }
  btnmark.classList.toggle("active");
});

boardElement.style.setProperty("--stage", BOARD_SIZE);
minesAll.textContent = NUMBER_OF_MINE;
minesLeftText.textContent = 0;

function listMineLeft() {
  const marktilecount = board.reduce((count, row) => {
    return (
      count + row.filter((tile) => tile.status === TILE_STATUS.MARKED).length
    );
  }, 0);

  minesLeftText.textContent = 0 + marktilecount;
}

function checkGameEND() {
  const win = checkWin(board);
  const lose = cheskLose(board);

  if (win || lose) {
    score.classList.remove("d-none");
    boardElement.addEventListener("click", stopProp, { capture: true });
    boardElement.addEventListener("contextmenu", stopProp, { capture: true });
  }

  if (win) {
    messageText.textContent = "You Win";
    scoreTime.textContent = timeRecord(x);
  }
  if (lose) {
    messageText.textContent = "You Lose";
    scoreTime.textContent = 0;
    board.forEach((row) => {
      row.forEach((tile) => {
        if (tile.status === TILE_STATUS.MARKED) marktile(tile);
        if (tile.mine) revealtile(board, tile);
      });
    });
  }
}

function stopProp(e) {
  e.stopImmediatePropagation();
}
// simpanscore();
function simpanscore() {
  let databasescore = localStorage.getItem("dataScore");
  let nama = document.querySelector("input[name]");

  databasescore = JSON.parse(databasescore);
  if (x != 0) {
    let y = {
      nama: nama.value,
      time: timeRecord(x),
    };
    siempan(y, stage, databasescore);
    console.log(y);
  }
}

function siempan(y, stage, databasescore) {
  if (stage == "eazy") {
    databasescore.eazy.push(y);
    let newy = JSON.stringify(y);
    localStorage.setItem("dataScore", newy);
  }
  if (stage == "medium") {
  }
  if (stage == "hard") {
  }
}
// function time() {
//   setInterval(() => {
//     timeScore += 1;
//     let timeNow = "";
//     let second = 0;
//     let menit = 0;
//     let jam = 0;
//     if (timeScore < 60) {
//       second = timeScore;
//       timeNow = second + "s";
//     }
//     if (timeScore >= 60 && timeScore < 3600) {
//       second = timeScore % 60;
//       menit = Math.floor(timeScore / 60);
//       timeNow = menit + "m" + second + "s";
//     }
//     if (timeScore >= 3600) {
//       second = timeScore % 60;
//       menit = Math.floor((timeScore % 3600) / 60);
//       jam = Math.floor(timeScore / 3600);
//       timeNow = jam + "h" + menit + "m" + second + "s";
//     }
//     timeDisplay.innerText = timeNow;
//   }, 1000);
// }

let h, hh, m, mm, s, ss;
let tm, tmx;
function timeRecord(x) {
  tm = x;
  ss = detik(x);
  mm = menit(x);
  hh = jam(x);

  tmx = hh + ":" + mm + ":" + ss;
  return tmx;
}

function tmtTime(timeNow) {
  tmttime.innerText = timeNow;
  tmtbom.innerText = minesLeftText.textContent + "/" + minesAll.textContent;
}

function updateTime(timeNow) {
  timeDisplay.innerText = timeNow;
}

function detik(x) {
  s = x % 60;
  if (s < 10) {
    s = "0" + s;
  }
  return s;
}

function menit(x) {
  m = Math.floor(x / 60);
  m = m % 60;
  if (m < 10) {
    m = "0" + m;
  }
  return m;
}
function jam(x) {
  h = Math.floor(x / 3600);
  h = h % 60;
  if (h < 10) {
    h = "0" + h;
  }
  return h;
}

//1. membuat papan permainan
//2. fungsi klik kanan
// a. menampilkan kotak
//3. fungsi klik kanan
// b. menandai kotak
//4. cek menang kalah
