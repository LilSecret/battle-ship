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

const switchStatement = (one, two, three, number, row) => {
  switch(number) {
    case one:
      row.charAt(2) = 'O';
    break;
    case two:
      row.charAt(4) = 'O';
    break;
    case three:
      row.charAt(6) = 'O';
    break;
    default: 
      console.log('Impossible');
  }
}

const randomSpot = () => {
  let number = randomNumber();
  const rowSpots = [2, 4, 6];
  const array = [];

  const rowACondition = number === 0 || number === 1 || number === 2;
  const rowBCondition = number === 3 || number === 4 || number === 5;
  const rowCCondition = number === 6 || number === 7 || number === 8;
  
  if (rowACondition) {
    let row = board.rowA;
    switch(number) {
      case 0:
        row.charAt(2) = 'O';
      break;
      case 1:
        row.charAt(4) = 'O';
      break;
      case 2:
        row.charAt(6) = 'O';
      break;
      default: 
        console.log('Impossible');
    }
  }
  if (rowBCondition) {
    let row = board.rowB;
    switch(number) {
      case 3:
        row.charAt(2) = 'O';
      break;
      case 4:
        row.charAt(4) = 'O';
      break;
      case 5:
        row.charAt(6) = 'O';
      break;
      default: 
        console.log('Impossible');
    }
  }
  if (rowCCondition) {
    let row = board.rowC;
    switch(number) {
      case 6:
        row.charAt(2) = 'O';
      break;
      case 7:
        row.charAt(4) = 'O';
      break;
      case 8:
        row.charAt(6) = 'O';
      break;
      default: 
        console.log('Impossible');
    }
  }
  console.log(number);  
}

randomSpot();
// console.log(board);

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