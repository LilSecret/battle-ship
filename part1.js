var rs = require('readline-sync');

let startGame;

while (!startGame) {
  startGame = true;

  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const randomShipNumbers = [];
  const userStrikes = [];
  let shipsDestroyed = 0;
  let shipObj;

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

  const grid = {};

  const buildBoard = (amount) => {
    grid.numbers = '  ';
    for (let i = 1; i < amount + 1; i++) {
      grid.numbers += ('  ' + i + ' ');
    }
    for (let i = 0; i < amount; i++) {
      grid['row' + letters[i]] = '';
      grid['row' + letters[i]] = letters[i] + ' |   |   |   |   |   |   |   |   |   |   |'
    }
    // for (let [property, value] of Object.entries(grid)) {
    //   console.log(value);
    //   console.log('--------------------------------------------');
    // }
    return amount * amount;
  }

  const randomNum = () => Math.floor(Math.random() * 9) + 1;

const randomShips = (number) => {
  if (number < 10) {
    shipObj = number;
    for (let i = 0; i < number; i++) {
      logRandomShips();
    }
    for (let num of randomShipNumbers) {
      placeShipOnBoard(num);
    }
  } else {
    console.log('Not enough squares for that number!');
  }
}

const logRandomShips = () => {
  let randomShipNum = randomNum();
  
  if (randomShipNumbers.includes(randomShipNum)) {
    logRandomShips();
  } else {
    randomShipNumbers.push(randomShipNum);
  }
  return randomShipNum
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

const validStrike = () => {
  let strike = rs.question('Enter a Location to Strike = ');
  let validateStrike = /^[a-c || A-C][1-3].*$/;
  if (validateStrike.test(strike)) {
    const strikeInputs = [];
    for (let char of strike) {
      strikeInputs.push(char);
    }
    let letter = strikeInputs[0].toUpperCase();
    let number = +strikeInputs[1];
    if (userStrikes.includes(letter + number)) {
      console.log('You have already picked this location.');
      validStrike();
    } else {
      strikeBoard(letter, number);
    }
  } else {
    console.log('Invalid Input! Try Again.');
    validStrike();
  }
}

const strikeBoard = (letter, number) => {
  userStrikes.push(letter + number);
  let userSpot = userBoard['row' + letter][number - 1];
  let boardSpot = board['row' + letter][number - 1];
  if (boardSpot === '0') {
    if (shipsDestroyed === 0) {
      console.log('Hit! You have sunken a battleship. One ship remaining.');
    }
    userBoard['row' + letter][number - 1] = 'H';
    shipsDestroyed++;
    logBattleshipBoard();
  } else {
    console.log('You have missed!');
    userBoard['row' + letter][number - 1] = 'M';
    logBattleshipBoard();
  }
  // console.log(userStrikes);
  // console.log(shipsDestroyed);
}

  rs.keyIn('Press a key to start! ');
  randomShips(2);
  // console.log(board);
  buildBoard(10);
  logBattleshipBoard();
  while (userStrikes.length < 5 && shipsDestroyed < shipObj) {
    validStrike();
  }
  if (shipsDestroyed === shipObj) {
    let game = rs.keyInYN('You have destroyed all battleships. Would you like to play again? Y/N');
    if (game) {
      startGame = false;
    }
  } else {
    console.log('You are out of strikes! You Lose!');
    let game = rs.keyInYN('Would you like to play again? Y/N');
    if (game) {
      startGame = false;
    }
  }
}

// Would have to a row and letter conditions A1 || B1
// When changing ship would have to grab old and put in the new
// can only change property method by battleshipBoard.rowA

// Steps
// Step 1 randomly place 2 ships in separate locations
// Each Ship is 1 unit long