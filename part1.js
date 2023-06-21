var rs = require('readline-sync');

const battleshipBoard = {
  borderTop: '  --1-2-3--',
  rowA: 'A | - - - |',
  rowB: 'B | - - - |',
  rowC: 'C | - - - |',
  borderBottom: '  ---------',
}

const randomNum = () => Math.floor(Math.random() * 9) + 1;

const twoRandomShips = () => {
  let shipOne = randomNum();
  let shipTwo = randomNum();
  if (shipTwo === shipOne) {
    shipTwo = randomNum();
  }
}

const startGame = () => {
  rs.keyIn('Press a key to start! ');
  for (let [property, value] of Object.entries(battleshipBoard)) {
    console.log(value);
  }
  twoRandomShips();
}

const shipSpot = (ship) => {
  
}

const placeShipOnBoard = (ship) => {
  const rowACondition = ship === 0 || ship === 1 || ship === 2;
  const rowBCondition = ship === 3 || ship === 4 || ship === 5;
  const rowCCondition = ship === 6 || ship === 7 || ship === 8;
  
  if (rowACondition) {
    battleshipBoard.rowA = shipSpot(ship);
  }
  if (rowBCondition) {
    battleshipBoard.rowB = shipSpot(ship);
  }
  if (rowCCondition) {
    battleshipBoard.rowC = shipSpot(ship);
  }
}

// const addRandomShip = (one, two, three, spotNum) => {
//   switch(spotNum) {
//     case one:
//       row.charAt(2) = 'O';
//     break;
//     case two:
//       row.charAt(4) = 'O';
//     break;
//     case three:
//       row.charAt(6) = 'O';
//     break;
//     default: 
//       console.log('Impossible');
//   }
// }

// const game = () => {
//   let randomNumber = Math.floor(Math.random() * 3);
//   console.log(randomNumber);
  
// }

// const startGame = () => {
//   gameStarted = true;
//   game();
// }