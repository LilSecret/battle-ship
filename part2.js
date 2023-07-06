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

  const userGrid = {};

  const buildGrid = (amount, grid) => {
    grid.numbers = '  ';
    for (let i = 1; i < amount + 1; i++) {
      grid.numbers += ('  ' + i + ' ');
    }
    for (let i = 0; i < amount; i++) {
      grid['row' + letters[i]] = letters[i] + ' |   |   |   |   |   |   |   |   |   |   |';
    }
  }
  
  const changeGrid = (letter) => {
    grid['row' + letter] = letter + ' |';
    for (let i = 0; i < ships.length; i++) {
      grid['row' + letter] += ' ' + ships[i] + ' |' ;
    }
  }

  const displayGrid = (grid) => {
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
      let location = randomNum();
      console.log(location);
      if (/^(10|[1-9])$/.test(location)) {
        console.log('This is row A');
      }
      if (/^(1[1-9]|20)$/.test(location)) {
        console.log('This is row B');
      }
      if (/^(2[1-9]|30)$/.test(location)) {
        console.log('This is row C');
      }
      if (/^(3[1-9]|40)$/.test(location)) {
        console.log('This is row D');
      }
      if (/^(4[1-9]|50)$/.test(location)) {
        console.log('This is row E');
      }
      if (/^(5[1-9]|60)$/.test(location)) {
        console.log('This is row F');
      }
      if (/^(6[1-9]|70)$/.test(location)) {
        console.log('This is row G');
      }
      if (/^(7[1-9]|80)$/.test(location)) {
        console.log('This is row H');
      }
      if (/^(8[1-9]|90)$/.test(location)) {
        console.log('This is row I');
      }
      if (/^(9[1-9]|100)$/.test(location)) {
        console.log('This is row J');
      }
    }
  }

  rs.keyIn('Press a key to start! ');
  buildGrid(10, userGrid);
  displayGrid(userGrid);
  // totalObjectives();
  // addShipObj(shipsObj);
}

// Would have to a row and letter conditions A1 || B1
// When changing ship would have to grab old and put in the new
// can only change property method by battleshipBoard.rowA

// Steps
// Step 1 randomly place 2 ships in separate locations
// Each Ship is 1 unit long