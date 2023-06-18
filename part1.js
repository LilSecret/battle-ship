var rs = require('readline-sync');

//   rs.keyIn('Press a key to start!');

const board = {
  borderTop: '---------',
  rowA: '| - - - |',
  rowB: '| - - - |',
  rowC: '| - - - |',
  borderBottom: '---------',
}

const randomNumber = () => Math.floor(Math.random() * 9);

const randomSpot = () => {
  let number = randomNumber();
  const rowSpots = [2, 4, 6];
  const array = [];

  console.log(number);

  // for (let char of rowA) {
  //   array.push(char);
  // }
  // for (let i = 0; i < array.length; i++) {
  //   if (rowSpots.includes(i)) {

  //   }
  // }
}

randomSpot();

const logBoard = () => {
  for (let [property, value] of Object.entries(board)) {
    console.log(value);
  }
}


// const game = () => {
//   let randomNumber = Math.floor(Math.random() * 3);
//   console.log(randomNumber);
  
// }

// const startGame = () => {
//   gameStarted = true;
//   game();
// }