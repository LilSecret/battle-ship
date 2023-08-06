var rs = require('readline-sync');

let startGame;

while (!startGame) {
  startGame = true;

  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const shipsObj = ['OO', 'OOO', 'OOO', 'OOOO', 'OOOOO'];
  const userStrikes = [];
  const computerStrikes = [];
  const attempts = 35;
  let objectives = 0;
  let userPoints = 0;
  let computerPoints = 0;
  let size;

  const conditions = {
    letters: {
      a: /^(10|[1-9])$/,
      b: /^(1[1-9]|20)$/,
      c: /^(2[1-9]|30)$/,
      d: /^(3[1-9]|40)$/,
      e: /^(4[1-9]|50)$/,
      f: /^(5[1-9]|60)$/,
      g: /^(6[1-9]|70)$/,
      h: /^(7[1-9]|80)$/,
      i: /^(8[1-9]|90)$/,
      j: /^(9[1-9]|100)$/,
    },
    numbers: {
      one: /^(1|[1-9]1)*$/,
      two: /^(2|[1-9]2)*$/,
      three: /^(3|[1-9]3)*$/,
      four: /^(4|[1-9]4)*$/,
      five: /^(5|[1-9]5)*$/,
      six: /^(6|[1-9]6)*$/,
      seven: /^(7|[1-9]7)*$/,
      eight: /^(8|[1-9]8)*$/,
      nine: /^(9|[1-9]9)*$/,
      ten: /^(100|[1-9]0)*$/,
    },
  }
  const hiddenGrid = {};
  const cpuHiddenGrid = {};
  const userGrid = {};
  const cpuGrid = {};

  const buildGrids = (amount) => {
    size = amount;
    for (let i = 0; i < amount; i++) {
      hiddenGrid['row' + letters[i]] = [];
      cpuHiddenGrid['row' + letters[i]] = [];
      userGrid['row' + letters[i]] = [];
      cpuGrid['row' + letters[i]] = [];
      for (let j = 0; j < amount; j++) {
        hiddenGrid['row' + letters[i]].push(' ');
        cpuHiddenGrid['row' + letters[i]].push(' ');
        userGrid['row' + letters[i]].push(' ');
        cpuGrid['row' + letters[i]].push(' ');
      }
    }
  }

  const displayGrid = (grid, name) => {
    let topBorder = '   ';
    for (let i = 1; i < letters.length + 1; i++) {
      topBorder += '  ' + i + ' ';
    }
    console.log(`-------------- ${name} ----------------`)
    console.log(topBorder);
    for (let [property, value] of Object.entries(grid)) {
      let letterLine = ' ' + property.charAt(3) + ' | ';
      for (let j = 0; j < value.length; j++) {
        letterLine += value[j] + ' | ';
      }
      console.log(letterLine);
      console.log('--------------------------------------------');
    }
  }

  const totalObjectives = () => {
    for (let ship of shipsObj) {
      objectives += ship.length;
    }
  }

  const randomNumOf100 = () => Math.floor(Math.random() * 100) + 1;

  const addShipObjectives = (ships) => {
    for (let ship of ships) {
      placeShip(ship, hiddenGrid);
      placeShip(ship, cpuHiddenGrid);
    }
  }

  const placeShip = (ship, grid) => {
    let randomLocation = findLocation(randomNumOf100());
    let letter = randomLocation.charAt(0);
    let point = findLocationNum(randomLocation) - 1;
    let formerPoint = point - 1;
    let index = letters.indexOf(letter);
    let formerIndex = getFormerIndex(index);
    let direction = randomDirection();
    let isAreaCleared = shipAreaClear(grid, ship, direction, letter, point, formerPoint, index, formerIndex);

    // if (isAreaCleared) {
      // console.log(`Location: ${randomLocation}, Ship size: ${ship.length}, Direction: ${direction}`);
      if (direction === 'horizontal') {
        for (let unit of ship) {
          if (grid['row' + letter].includes(grid['row' + letter][point])) {
            grid['row' + letter][point] = 'O';
            point++;
          }
          else if (!grid['row' + letter].includes(grid['row' + letter][point])) {
            grid['row' + letter][formerPoint] = 'O';
            formerPoint--;
          }
        }
      }
      if (direction === 'vertical') {
        for (let unit of ship) {
          if (grid.hasOwnProperty('row' + letters[index])) {
            grid['row' + letters[index]][point] = 'O';
            index++;
          }
          else if (!grid.hasOwnProperty('row' + letters[index])) {
            grid['row' + letters[formerIndex]][point] = 'O';
            formerIndex--;
          }
        }
      }
    // } else {
    //   placeShip(ship);
    // }
  }

  const findLocation = (number) => {
    let tile = null;
    for (let [property, value] of Object.entries(conditions.letters)) {
      if (value.test(number)) {
        tile = property.toUpperCase();
        break;
      }
    }
    for (const [index, [property, value]] of Object.entries(conditions.numbers).entries()) {
      if (value.test(number)) {
        tile += index + 1;
        break;
      }
    }
    return tile;
  }

  const findLocationNum = (location) => {
    if (location.length === 3) {
      return Number(location.charAt(1) + location.charAt(2));
    }
    return +location.charAt(1);
  }

  const randomDirection = () => Boolean(Math.round(Math.random())) ? 'vertical' : 'horizontal';
  const flipACoin = () => Boolean(Math.round(Math.random())) ? 'heads' : 'tails';

  const getFormerIndex = (index) => {
    if (index === 0) {
      return 9;
    } else {
      return index - 1;
    }
  }

  const shipAreaClear = (grid, ship, direction, letter, point, formerPoint, index, formerIndex) => {
    let areaCleared = true;
    if (direction === 'horizontal') {
      for (let i = 0; i < ship.length; i++) {
        if (grid['row' + letter][point]) {
          if (grid['row' + letter][point] === ' ') {
            point++;
          } else {
            return false;
          }
        }
        else if (!grid['row' + letter][point]) {
          if (grid['row' + letter][formerPoint] === ' ') {
            formerPoint--;
          } else {
            return false;
          } 
        }
      }
    }
    if (direction === 'vertical') {
      for (let i = 0; i < ship.length; i++) {
        if (grid.hasOwnProperty('row' + letters[index])) {
          if (grid['row' + letters[index]][point] === ' ') {
            index++;
          } else {
            return false;
          }
        }
        else if (!grid.hasOwnProperty('row' + letters[index])) {
          if (grid['row' + letters[formerIndex]][point] === ' ') {
            formerIndex--;
          } else {
            return false;
          }
        }
      }
    }
    return areaCleared;
  }

  const validateStrikeCondition = () => new RegExp(`^[${letters[0]}-${letters[letters.length - 1]}]([${1}-${size - 1}]|10)$`);

  const validStrike = () => {
    const strike = rs.question('Enter a Location to Strike = ');
    const letter = strike.charAt(0).toUpperCase(); 
    const number = findLocationNum(strike);
    const validateStrike = validateStrikeCondition();
    if (validateStrike.test(letter + number)) {
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
    if (hiddenGrid['row' + letter][number - 1] === 'O') {
      userGrid['row' + letter][number - 1] = 'X';
      points++;
      displayGrid(userGrid);
      console.log('It\s a Hit! You\'ve destroyed a piece of a ship!');
    } else {
      userGrid['row' + letter][number - 1] = 'O';
      displayGrid(userGrid);
      console.log('You have missed!');
    }
  }

  const whoGoesFirst = () => {
    let coin = flipACoin();
    if (coin === 'heads') {
      game('user', 'computer');
    } 
    if (coin === 'tails') {
      game('computer','user');
    }
  }
  
  const game = (player1, player2) => {
    
  }

  const restartGame = () => {
    let game = rs.keyInYN('Would You like to play again?');
    if (game) {
      console.log('Ohh Ya! Let\s Get it!')
      startGame = false;
    } else {
      console.log('Goodbye! Thank You for playing!');
    }
  }

  rs.keyIn('Press a key to start! ');
  buildGrids(10);
  totalObjectives();
  addShipObjectives(shipsObj);
  whoGoesFirst();
  restartGame();
}

// Would have to a row and letter conditions A1 || B1
// When changing ship would have to grab old and put in the new
// can only change property method by battleshipBoard.rowA

// Steps
// Step 1 randomly place 2 ships in separate locations
// Each Ship is 1 unit long