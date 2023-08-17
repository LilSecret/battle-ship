var rs = require('readline-sync');

let startGame;

while (!startGame) {
  startGame = true;

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

  const randomNum = () => Math.floor(Math.random() * 9) + 1;

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

  const placeShipOnBoard = (number) => {
    let location = getPosition(number);
    let letter = location.charAt(0);
    let column = location.charAt(1) - 1;

    board['row' + letter][+column] = 0;
  }

  const randomShips = (number) => {
    shipObj = number;
    for (let i = 0; i < 2; i++) {
      logRandomShips();
    }
    for (let num of randomShipNumbers) {
      placeShipOnBoard(num);
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
    let userSpot = userBoard['row' + letter][number - 1];
    let boardSpot = board['row' + letter][number - 1];
    if (boardSpot === '0') {
      if (shipsDestroyed === 0) {
        console.log('Hit! You have sunken a battleship. One ship remaining.');
      }
      userBoard['row' + letter][number - 1] = 'H';
      shipsDestroyed++;
    } else {
      console.log('You have missed!');
      userBoard['row' + letter][number - 1] = 'M';
    }
  }

  const restart = () => {
    let game = rs.keyInYN('You have destroyed all battleships. Would you like to play again? Y/N');
    if (game) {
      startGame = false;
    }
  }
  
  rs.keyIn('Press any key to start the game! ');
  randomShips();
  logBattleshipBoard();
  while (shipsDestroyed < shipObj) {
    validStrike();
  }
  console.log('!!!!You WIN!!!!');
  restart();
}