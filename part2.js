var rs = require('readline-sync');

let startGame;

while (!startGame) {
  startGame = true;

  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const shipsObj = ['OO', 'OOO', 'OOO', 'OOOO', 'OOOOO'];
  const randomStartingPositions = [];
  const userStrikes = [];
  let objectives = 0;

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
  const userGrid = {};

  const buildGrids = (amount) => {
    for (let i = 0; i < amount; i++) {
      hiddenGrid['row' + letters[i]] = [];
      userGrid['row' + letters[i]] = [];
      for (let j = 0; j < amount; j++) {
        hiddenGrid['row' + letters[i]].push(' ');
        userGrid['row' + letters[i]].push(' ');
      }
    }
  }

  const displayGrid = (grid) => {
    let topBorder = '   ';
    for (let i = 1; i < letters.length + 1; i++) {
      topBorder += '  ' + i + ' ';
    }
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
      placeShip(ship);
    }
  }

  const placeShip = (ship) => {
    let randomLocation = findLocation(randomNumOf100());
    let letter = randomLocation.charAt(0);
    let point = findLocationNum(randomLocation) - 1;
    let formerPoint = point - 1;
    let index = letters.indexOf(letter);
    let formerIndex = index - 1;
    let direction = randomDirection();
    let isAreaCleared = shipAreaClear(ship, direction, letter, point, formerPoint, index, formerIndex);

    if (isAreaCleared) {
      if (direction === 'horizontal') {
        for (let i = 0; i < ship.length; i++) {
          if (hiddenGrid['row' + letter].includes(hiddenGrid['row' + letter][point])) {
            hiddenGrid['row' + letter][point] = 'O';
            point++;
          }
          if (!hiddenGrid['row' + letter].includes(hiddenGrid['row' + letter][point])) {
            hiddenGrid['row' + letter][formerPoint] = 'O';
            formerPoint--;
          }
        }
      }
      if (direction === 'vertical') {
        for (let i = 0; i < ship.length; i++) {
          if (hiddenGrid.hasOwnProperty('row' + letters[index])) {
            hiddenGrid['row' + letters[index]][point] = 'O';
            index++;
          }
          if (!hiddenGrid.hasOwnProperty('row' + letters[index])) {
            hiddenGrid['row' + letters[formerIndex]][point] = 'O';
            formerIndex--;
          }
        }
      }
    } else {
      placeShip(ship);
    }
    console.log(randomLocation);
    console.log(ship.length);
    console.log(direction);
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
      return location.charAt(1) + location.charAt(2);
    }
    return location.charAt(1);
  }

  const randomDirection = () => Boolean(Math.round(Math.random())) ? 'vertical' : 'horizontal';

  const shipAreaClear = (ship, direction, letter, point, formerPos, index) => {
    let formerIndex = index - 1;
    let areaCleared;
    if (direction === 'horizontal') {
      for (let i = 0; i < ship.length; i++) {
        if (hiddenGrid['row' + letter].includes(hiddenGrid['row' + letter][point]) && hiddenGrid['row' + letter][point] != 'O') {
          areaCleared = true;
          point++;
        }
        else if (!hiddenGrid['row' + letter].includes(hiddenGrid['row' + letter][point]) && hiddenGrid['row' + letter][formerPos] != 'O') {
          areaCleared = true;
          formerPos--;
        } 
        else {
          areaCleared = false;
        }
      }
    }
    if (direction === 'vertical') {
      for (let i = 0; i < ship.length; i++) {
        if (hiddenGrid.hasOwnProperty(hiddenGrid['row' + letters[index]]) && hiddenGrid['row' + letters[index]][point] != 'O') {
          areaCleared = true;
          index++;
        }
        else if(!hiddenGrid.hasOwnProperty(hiddenGrid['row' + letters[index]]) && hiddenGrid['row' + letters[formerIndex]][point] != 'O') {
          areaCleared = true;
          formerIndex--;
        } else {
          areaCleared = false;
        }
      }
    }
    return areaCleared;
  }

  rs.keyIn('Press a key to start! ');
  buildGrids(10);
  // displayGrid(userGrid);
  // totalObjectives();
  addShipObjectives(shipsObj);
  displayGrid(hiddenGrid);
}

// Would have to a row and letter conditions A1 || B1
// When changing ship would have to grab old and put in the new
// can only change property method by battleshipBoard.rowA

// Steps
// Step 1 randomly place 2 ships in separate locations
// Each Ship is 1 unit long