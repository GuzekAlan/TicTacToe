'use strict';

// VARIABLES
const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const players = ['X', 'O'];
const frameClassName = '.frame';
const emptySign = '0';

let player = 0;
let clickCounter = 0;

// FUNCTIONS

const getPlayerSign = () => {
  return players[player];
};

const changePlayer = () => {
  player = player ? 0 : 1;
};

const getFrameArray = (name) => {
  return document.querySelectorAll(name);
};

const getSignArray = (name) => {
  return Array.from(getFrameArray(name)).map((frame) => frame.innerHTML);
  // return Array.prototype.slice.call(getFrameArray(name)).map((frame) => frame.innerHTML);
};

const setFrameArray = (name, sign) => {
  const frames = getFrameArray(name);
  frames.forEach((frame) => {
    frame.addEventListener('click', () => clickFrame(frame), false);
    frame.innerHTML = sign;
  });
  return frames;
};

const disableFrame = (frame) => {
  frame.classList.add('disabled');
};

const winBanner = async (playerSign) => {
  const frameArray = getFrameArray(frameClassName);
  frameArray.forEach(disableFrame);
  document.querySelector('.scoreboard').innerHTML = `${playerSign} WON !!`;
  // setTimeout(() => playAgainBanner(), 5000);
  document.querySelector('.game').addEventListener('mousedown', () => playAgain(), false);
};

const playAgain = () => {
  console.log('chuj');
  player = 0;
  clickCounter = 0;
  document.querySelector('.scoreboard').innerHTML = '';
  const section = document.querySelector('.game');
  section.replaceWith(section.cloneNode(true));
  const frameArray = getFrameArray(frameClassName);
  frameArray.forEach((frame) => {
    frame.style.color = '';
    frame.classList.remove('disabled');
  });
  setFrameArray(frameClassName, emptySign);
};

const clickFrame = (frame) => {
  frame.innerHTML = getPlayerSign();
  frame.style.color = 'black';
  disableFrame(frame);
  if (checkPosition()) {
    winBanner(getPlayerSign());
  }
  counterHandler();
  changePlayer();
};

const isEqual = ([x, y, z]) => {
  if (x == y && x == z) {
    return true;
  } else {
    return false;
  }
};

const checkPosition = () => {
  const signArray = getSignArray(frameClassName);
  const frameArray = getFrameArray(frameClassName);
  const winStatus = winningPositions.map((indexes) => {
    const subArray = indexes.map((index) => signArray[index]);
    return isEqual(subArray) && subArray[0] != emptySign;
  });
  if (winStatus.includes(true)) {
    winningPositions[winStatus.indexOf(true)].forEach((index) => {
      frameArray[index].style.color = 'var(--color_three)';
    });
    return true;
  } else return false;
};

function counterHandler() {
  ++clickCounter < 9 ? 3 : checkPosition() ? winBanner(getPlayerSign()) : winBanner('NOBODY');
}

setFrameArray(frameClassName, emptySign);

// /////////////////////////////
// MY FAILURES ////////////////
//////////////////////////////

// const won = (signArray) => {
//   winningPositions.forEach();
//   return false;
// };

// const getSituation = async (frameArray) => {
//   while (!didWon) {
//     const signArray = frameArray.map((frame) => frame.innerHTML);
//     if (won(signArray)) {
//       winBanner(players[player]);
//     }
//   }
// };

// FIRST TRY
// const frames = document.getElementsByClassName('frame');
// const frameArray = Array.prototype.slice.call(frames);
// frameArray.map((frame) => {
//   frame.addEventListener('click', move(frame), false);
// });
// console.log(frameArray);
// SECOND TRY
// const framesArray = Array.prototype.slice
//   .call(document.querySelectorAll('.frame'))
//   .map((frame) => addEventListener('click', () => move(frame)));

// const frame = document.getElementById('canva');
// const ctx = frame.getContext('2d');

// // CONSTANTS
// const tileColor = rgb(200, 200, 200);
// const tileSize = 100;
// const padding = 10;
// const winningPositions = [(0, 1, 2), (3, 4, 5), (6, 7, 8), (0, 3, 6), (1, 4, 7), (2, 5, 8), (0, 4, 8), (2, 4, 6)];

// const drawRect = (x, y, sign) => {
//   ctx.fillStyle = tileColor;
//   ctx.fillRect(x, y, tileSize, tileSize);
// };

// const createGameMap = () => {
//   return Array(9).fill('');
// };

// const makeMove = (gameMap, move, player) => {
//   if (gameMap[move] != '') {
//     console.log('Cannot do that');
//     exit();
//   } else {
//     gameMap[move] = player;
//   }
// };

// const drawTiles = (gameMap) => {
//   for (let i = 0; i < 3; i++) {
//     for (let j = 0; j < 3; j++) {
//       drawRect(padding + i * (tileSize + padding), padding + j * (tileSize + padding), gameMap[j * 3 + i]);
//     }
//   }
// };

// const isEqual = (x, y, z) => {
//   if (x == y && x == z) {
//     return true;
//   } else {
//     return false;
//   }
// };

// const checkSituation = (gameMap) => {
//   for (const position of winningPositions) {
//     if (isEqual(position[0], position[1], position[2])) {
//       return gameMap[position[0]];
//     }
//   }
//   return '';
// };

// const gameLoop = () => {
//   const player1 = 'X';
//   const player2 = 'O';
//   const gameMap = createGameMap();
//   while (true) {}
// };

// window.addEventListener(
//   'resize',
//   () => {
//     canva.width = window.innerWidth;
//     canva.height = window.innerHeight;
//   },
//   false,
// );
