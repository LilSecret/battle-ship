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
      const a = /^(10|[1-9])$/;
      const b = /^(1[1-9]|20)$/;
      const c = /^(2[1-9]|30)$/;
      const d = /^(3[1-9]|40)$/;
      const e = /^(4[1-9]|50)$/;
      const f = /^(5[1-9]|60)$/;
      const g = /^(6[1-9]|70)$/;
      const h = /^(7[1-9]|80)$/;
      const i = /^(8[1-9]|90)$/;
      const j = /^(9[1-9]|100)$/;
      const one = /^(1|[2-9]1)*$/;
      const two = /^(2|[2-9]2)*$/;
      const three = /^(3|[2-9]3)*$/;
      const four = /^(4|[2-9]4)*$/;
      const five = /^(5|[2-9]5)*$/;
      const six = /^(6|[2-9]6)*$/;
      const seven = /^(7|[2-9]7)*$/;
      const eight = /^(8|[2-9]8)*$/;
      const nine = /^(9|[2-9]9)*$/;
      const ten = /^(100|[1-9]0)*$/;
      let location = randomNum();
      let direction = Boolean(Math.round(Math.random()));
      direction = direction ? 'vertical' : 'horizontal';

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