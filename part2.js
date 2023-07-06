var rs = require('readline-sync');

let startGame;

while (!startGame) {
  startGame = true;

  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const shipsObj = ['OO', 'OOO', 'OOO', 'OOOO', 'OOOOO'];
  const randomShipLocations = [];
  const userStrikes = [];
  let objectives = 0;
  let points = 0;

  const grid = {};
  const hiddenGrid = {};

  const buildGrid = (amount) => {
    grid.numbers = '  ';
    for (let i = 1; i < amount + 1; i++) {
      grid.numbers += ('  ' + i + ' ');
    }
    for (let i = 0; i < amount; i++) {
      grid['row' + letters[i]] = letters[i] + ' |   |   |   |   |   |   |   |   |   |   |';
      hiddenGrid['row' + letters[i]] = [];
      for (let j = 0; j < amount; j++) {
        hiddenGrid['row' + letters[i]].push(' ');
      }
    }
  }
  
  const changeGrid = (letter) => {
    grid['row' + letter] = letter + ' |';
    for (let i = 0; i < ships.length; i++) {
      grid['row' + letter] += ' ' + ships[i] + ' |' ;
    }
  }

  const displayGrid = () => {
    for (let [property, value] of Object.entries(grid)) {
      console.log(value);
      console.log('--------------------------------------------');
    }
  }

  const totalObjectives = () => {
    for (let ship of shipsObj) {
      objectives += ship.length;
    }
  }

  const randomNum = () => Math.floor(Math.random() * 100) + 1;

  const addShipObj = (ships) => {
    for (let ship of ships) {
      randomShipLocation();
    }
  }

  const randomShipLocation = () => {
    let randomLocation = randomNum();
    if (!randomShipLocations.includes(randomLocation)) {
      randomShipLocations.push(randomLocation);
    } else {
      randomShipLocation();
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

  rs.keyIn('Press a key to start! ');
  buildGrid(10);
  // displayGrid();
  totalObjectives();
  addShipObj(shipsObj);
  console.log(randomShipLocations);
  console.log(objectives);
  console.log(hiddenGrid);
}

// Would have to a row and letter conditions A1 || B1
// When changing ship would have to grab old and put in the new
// can only change property method by battleshipBoard.rowA

// Steps
// Step 1 randomly place 2 ships in separate locations
// Each Ship is 1 unit long