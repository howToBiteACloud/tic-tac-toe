/**
 *
 * 2. Сохраняем ввод пользователя и передаем ход другому.
 * 3. После каждого хода проверяем победил ли игрок.
 *    Если победил, то говорим об этом и заканчиваем игру.
 */

// const {getRandomColor} = require('./utils');

let step = 1;
let table = Array(3)
  .fill(null)
  .map(() => Array(3).fill(null));
const player1 = {
  value: "x",
  name: "Крестики",
  className: "cell_x",
};
const player2 = {
  value: "o",
  name: "Нолики",
  className: "cell_o",
};

const line = document.getElementsByClassName("line")[0];

let player = player1;

const [frameElement] = document.getElementsByClassName("frame");

function start() {
  const [containerElement] = document.getElementsByClassName("container");
  const playing = document.getElementById("play");

  function handler(event) {
    if (!isCell(event.target)) return; // тыкнул ли он туда

    const parentRow = event.target.parentElement;
    const rowIndex = [...containerElement.children].findIndex(
      (el) => el === parentRow
    ); // 1
    const columnIndex = [...parentRow.children].findIndex(
      (el) => el === event.target
    );

    // занята ли ячейка
    if (isWasClicked(rowIndex, columnIndex)) return;

    // успешный ход
    input(rowIndex, columnIndex);
    event.target.classList.add(player.className);

    const hasWinner = checkWinner(table);
    const isStandoff = !hasWinner && step === 9;

    if (hasWinner) {
      playing.textContent = "Победили " + player.name + "!!!";
      containerElement.removeEventListener("click", handler);
      setInterval(() => {
        playing.style.color = getRandomColor();
        frameElement.style.backgroundColor = getRandomColor();
      }, 500);
      return;
    }

    if (isStandoff) {
      playing.textContent = "Ничья";
      containerElement.removeEventListener("click", handler);
      return;
    }

    turnToNextPlayer(playing);
  }

  containerElement.addEventListener("click", handler);
}

function isCell(element) {
  const classList = [...element.classList];

  return classList.includes("cell");
}

function isWasClicked(row, column) {
  return !!table[row][column];
}

function input(row, column) {
  table[row][column] = player.value;
}

function checkWinner(table) {
  if (
    !!table[0][0] &&
    table[0][0] === table[1][1] &&
    table[1][1] === table[2][2]
  ) {
    line.style.transform = "translate(-50%, -50%) rotate(45deg)";
    line.style.width = "580px";
    line.style.display = "block";
    return true;
  }

  if (
    !!table[0][0] &&
    table[0][0] === table[0][1] &&
    table[0][1] === table[0][2]
  ) {
    line.style.top = "17%";
    line.style.display = "block";
    return true;
  }

  if (
    !!table[1][0] &&
    table[1][0] === table[1][1] &&
    table[1][1] === table[1][2]
  ) {
    line.style.display = "block";
    return true;
  }

  if (
    !!table[2][0] &&
    table[2][0] === table[2][1] &&
    table[2][1] === table[2][2]
  ) {
    line.style.top = "83.75%";
    line.style.display = "block";
    return true;
  }

  if (
    !!table[0][1] &&
    table[0][1] === table[1][1] &&
    table[1][1] === table[2][1]
  ) {
    line.style.transform = "translate(-50%, -50%) rotate(90deg)";
    line.style.display = "block";
    return true;
  }

  if (
    !!table[0][0] &&
    table[0][0] === table[1][0] &&
    table[1][0] === table[2][0]
  ) {
    line.style.transform = "translate(-50%, -50%) rotate(90deg)";
    line.style.left = "17%";
    line.style.display = "block";
    return true;
  }

  if (
    !!table[0][2] &&
    table[0][2] === table[1][2] &&
    table[1][2] === table[2][2]
  ) {
    line.style.transform = "translate(-50%, -50%) rotate(90deg)";
    line.style.left = "83.75%";
    line.style.display = "block";
    return true;
  }

  if (
    !!table[0][2] &&
    table[0][2] === table[1][1] &&
    table[1][1] === table[2][0]
  ) {
    line.style.transform = "translate(-50%, -50%) rotate(-45deg)";
    line.style.width = "580px";
    line.style.display = "block";
    return true;
  }

  return false;
}

function turnToNextPlayer(node) {
  player = player === player1 ? player2 : player1;

  node.textContent = "Ходят: " + player.name;
  step++;
}

start();

// utils.js
function getRandomNumber(from, to) {
  // Должна вернуть случайное число от 'from' до 'to'
  return Math.floor(Math.random() * (to - from + 1) + from);
}

function getRandomColor() {
  // Должна вернуть случайный цвет
  // в формате #rrggbb

  let red = getRandomNumber(0, 255).toString(16);
  let green = getRandomNumber(0, 255).toString(16);
  let blue = getRandomNumber(0, 255).toString(16);

  console.log(`#${red}${green}${blue}`);

  return `#${red}${green}${blue}`;
}

function getContrastYIQ(hexcolor) {
  // меняет цвет на белый или чёрный в зависимости от контрастности
  // (наиболее контрастный выбранному в параметре)
  var r = parseInt(hexcolor.substr(1, 2), 16);
  var g = parseInt(hexcolor.substr(3, 2), 16);
  var b = parseInt(hexcolor.substr(5, 2), 16);
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "black" : "white";
}
