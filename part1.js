var rs = require('readline-sync');

const board = {
  rowA: ['-', '-', '-'],
  rowB: ['-', '-', '-'],
  rowC: ['-', '-', '-'],
}

const userBoard = {
  rowA: ['-', '-', '-'],
  rowB: ['-', '-', '-'],
  rowC: ['-', '-', '-'],
}

const battleshipBoard = {
  borderTop: '  --1-2-3--',
  rowA: `A | ${board.rowA[0]} ${board.rowA[1]} ${board.rowA[2]} |`,
  rowB: `B | ${board.rowB[0]} ${board.rowB[1]} ${board.rowB[2]} |`,
  rowC: `C | ${board.rowC[0]} ${board.rowC[1]} ${board.rowC[2]} |`,
  borderBottom: '  ---------',
}

const randomNum = () => Math.floor(Math.random() * 9) + 1;

const twoRandomShips = () => {
  let shipOne = randomNum();
  let shipTwo = randomNum();
  if (shipTwo === shipOne) {
    shipTwo = randomNum();
  }
  placeShipOnBoard(shipOne);
  placeShipOnBoard(shipTwo);
}

const placeShipOnBoard = (ship) => {
  const rowA = ship === 1 || ship === 2 || ship === 3;
  const rowB = ship === 4 || ship === 5 || ship === 6;
  const rowC = ship === 7 || ship === 8 || ship === 9;
  const one = ship === 1 || ship === 4 || ship === 7;
  const two = ship === 2 || ship === 5 || ship === 8;
  const three = ship === 3 || ship === 6 || ship === 9;

  if (rowA) {
    if (one) {
      board.rowA[0] = '0';
    }
    if (two) {
      board.rowA[1] = '0';
    }
    if (three) {
      board.rowA[2] = '0';
    }
  }
  if (rowB) {
    if (one) {
      board.rowB[0] = '0';
    }
    if (two) {
      board.rowB[1] = '0';
    }
    if (three) {
      board.rowB[2] = '0';
    }
  }
  if (rowC) {
    if (one) {
      board.rowC[0] = '0';
    }
    if (two) {
      board.rowC[1] = '0';
    }
    if (three) {
      board.rowC[2] = '0';
    }
  }
}

const logBattleshipBoard = () => {
  const battleshipBoard = {
    borderTop: '  --1-2-3--',
    rowA: `A | ${userBoard.rowA[0]} ${userBoard.rowA[1]} ${userBoard.rowA[2]} |`,
    rowB: `B | ${userBoard.rowB[0]} ${userBoard.rowB[1]} ${userBoard.rowB[2]} |`,
    rowC: `C | ${userBoard.rowC[0]} ${userBoard.rowC[1]} ${userBoard.rowC[2]} |`,
    borderBottom: '  ---------',
  }

  for (let [property, value] of Object.entries(battleshipBoard)) {
    console.log(value);
  }
}

const userStrike = () => {
  let strike = rs.question('Enter a Location to Strike = ');
  let validStrike = /^[a-c || A-C][1-3].*$/;
  if (validStrike.test(strike)) {
    console.log('This is valid!');
  } else {
    console.log('Invalid Input! Try Again.');
    userStrike();
  }
}

let startGame;

if (!startGame) {
  rs.keyIn('Press a key to start! ');
  twoRandomShips();
  console.log(board);
  logBattleshipBoard();
  userStrike();
}

// Would have to a row and letter conditions A1 || B1
// When changing ship would have to grab old and put in the new
// can only change property method by battleshipBoard.rowA

// Steps 
// Step 1 randomly place 2 ships in separate locations
// Each Ship is 1 unit long