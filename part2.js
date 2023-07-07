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
      one: /^(1|[2-9]1)*$/,
      two: /^(2|[2-9]2)*$/,
      three: /^(3|[2-9]3)*$/,
      four: /^(4|[2-9]4)*$/,
      five: /^(5|[2-9]5)*$/,
      six: /^(6|[2-9]6)*$/,
      seven: /^(7|[2-9]7)*$/,
      eight: /^(8|[2-9]8)*$/,
      nine: /^(9|[2-9]9)*$/,
      ten: /^(100|[1-9]0)*$/,
    },
  }
  const hiddenGrid = {};
  const userGrid = {};

  const buildGrid = (amount) => {
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
    let topNumbers = '   ';
    for (let i = 1; i < letters.length + 1; i++) {
      topNumbers += '  ' + i + ' ';
    }
    console.log(topNumbers)
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

  const randomNum = () => Math.floor(Math.random() * 100) + 1;

  const addShipObj = (ships) => {
    for (let ship of ships) {
      let location = randomNum();
      let direction = Boolean(Math.round(Math.random()));
      direction = direction ? 'vertical' : 'horizontal';
    }
  }

  const findLocation = (number) => {
    let tile = null;
    for (let [property, value] of Object.entries(conditions.letters)) {
      if (value.test(number)) {
        spot = property.toUpperCase();
      }
    }
    for (const [index, [property, value]] of Object.entries(conditions.numbers).entries()) {
      if (value.test(number)) {
        spot += index + 1;
      }
    }
    return tile;
  }

  const placeShip = (location, direction) {

  }

  rs.keyIn('Press a key to start! ');
  buildGrid(10);
  displayGrid(userGrid);
  // totalObjectives();
  addShipObj(shipsObj);
}

// Would have to a row and letter conditions A1 || B1
// When changing ship would have to grab old and put in the new
// can only change property method by battleshipBoard.rowA

// Steps
// Step 1 randomly place 2 ships in separate locations
// Each Ship is 1 unit long