var rs = require('readline-sync');

let startGame;

const letters = ['A', 'B', 'C'];
const ship = 'O';
const randomShipLocations = ['A1', 'B2'];
const userStrikes = ['A2', 'B3']; 
let shipsDestroyed = 0;
let shipObj = 0;

const board = {};

const conditions = {
  row: {
    rowA:  /^[1-3]$/,
    rowB: /^[4-6]$/,
    rowC: /^[7-9]$/,
  },
  column: {
    one1:  /^(1||4||7)$/,
    two2:  /^(2||5||8)$/,
    three3:  /^(3||6||9)$/,
  }
}

const buildBoard = (size) => {
  for (let letter of letters) {
    board[`row${letter}`] = [];
    for (let i = 0; i < size; i++) {
      board[`row${letter}`].push('-');
    }
  }
}

const clearStats = () => {
  shipsDestroyed = 0;
  shipObj = 0;
  userStrikes.splice(0, userStrikes.length);
  randomShipLocations.splice(0, randomShipLocations.length);
}

const randomNum = (max) => Math.floor(Math.random() * max) + 1;

const getPosition = (ship) => {
  let position = '';
  for (let [property, value] of Object.entries(conditions)) {
    for (let [prop, val] of Object.entries(value)) {
      if (val.test(ship)) {
        position += prop.charAt(prop.length - 1);
      }
    }
  }
  return position;
}

const placeShipOnBoard = (location, board) => {
  let letter = location.charAt(0);
  let column = location.charAt(1) - 1;
  board['row' + letter][+column] = ship;
}

const uniqueSpot = () => {
  let location = getPosition(randomNum(9));
  if(!logRandomShips(location)) {
    uniqueSpot();
  } else {
    randomShipLocations.push(location);
    return location;
  }
}

const placeRandomShips = (number) => {
  shipObj = number;
  for (let i = 0; i < number; i++) {
    placeShipOnBoard(uniqueSpot(), board);
  }
}

const logRandomShips = (location) => {
  if (!randomShipLocations.includes(location)) {
    randomShipLocations.push(location);
    return true;
  }
  return false;
}

const logBattleshipBoard = (board) => {
  const battleshipBoard = {
    borderTop: '  --1-2-3--',
    rowA: `A | ${board.rowA[0]} ${board.rowA[1]} ${board.rowA[2]} |`,
    rowB: `B | ${board.rowB[0]} ${board.rowB[1]} ${board.rowB[2]} |`,
    rowC: `C | ${board.rowC[0]} ${board.rowC[1]} ${board.rowC[2]} |`,
    borderBottom: '  ---------',
  }

  for (let [property, value] of Object.entries(battleshipBoard)) {
    console.log(value);
  }
}

const validStrike = () => {
  let strike = rs.question('Enter a Location to Strike = ');
  let validateStrike = /^[a-c || A-C][1-3]$/;
  if (validateStrike.test(strike)) {
    let letter = strike.charAt(0).toUpperCase(); 
    let number = +strike.charAt(1);
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
  number--;
  let boardSpot = board['row' + letter][number];
  if (boardSpot === 0) {
    if (shipsDestroyed === 0) {
      console.log('Hit! You have sunken a battleship. One ship remaining.');
    }
    shipsDestroyed++;
  } else {
    console.log('You have missed!');
  }
}

const restart = () => {
  let game = rs.keyInYN('You have destroyed all battleships. Would you like to play again? Y/N');
  if (game) {
    startGame = false;
  }
}

while (!startGame) {
  startGame = true;

  rs.keyIn('Press any key to start the game! ');
  buildBoard(3);
  clearStats()
  console.log(userStrikes);
  console.log(randomShipLocations);
  // placeRandomShips(2);
  // console.log(randomShipLocations);
  // logBattleshipBoard();
  // while (shipsDestroyed < shipObj) {
  //   validStrike();
  // }
  // console.log('!!!!You WIN!!!!');
  // restart();
}

// make board
// clear board and score
// place ships on board
// ask user for strikes
// play until user points equals win condition
// ask to play again