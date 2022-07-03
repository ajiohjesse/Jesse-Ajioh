const gameGrid = document.querySelector(".game-grid");
const gameGridCover = document.querySelector(".game-grid-cover");
const cardCover = document.querySelectorAll(".game-card-cover");
const shuffleCardsBtn = document.querySelector(".game-start-btn");
const showCardsBtn = document.querySelector(".game-stop-btn");
const sneekCardsBtn = document.querySelector(".game-sneek-btn");
const gameAlert = document.querySelector(".game-alert");

//*****************************************
//SOUND EFFECTS
//*****************************************
const correctCardSND = new Audio("./audio/correct-card.mp3");
const wrongCardSND = new Audio("./audio/wrong-card.mp3");
const firstCardSND = new Audio("./audio/first-card.mp3");
const gameLostSND = new Audio("./audio/game-lost.mp3");
const gamePlayingSND = new Audio("./audio/game-playing.mp3");
const peakSND = new Audio("./audio/peak.mp3");
const showCardSND = new Audio("./audio/show-cards.mp3");
const winSND = new Audio("./audio/win.mp3");

//game dashboard
const sneaksEl = document.getElementById("sneaks");
const answersEl = document.getElementById("answers");
const livesEl = document.getElementById("lives");

//the icon number array determines where a card should be in the grid
let iconNumber = [];
let openedCards = [];
let sneaks = 3;
let lives = 10;

const indexMap = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "one",
  10: "two",
  11: "three",
  12: "four",
  13: "five",
  14: "six",
  15: "seven",
  16: "eight",
};
let clickFirstCard = false;
let gamePlaying = false;
let firstCard = "";
let secondCard = "";

//*****************************************
//EVENT LISTENERS
//*****************************************
window.addEventListener("DOMContentLoaded", shuffleCards);
gameGridCover.addEventListener("click", renderGame);
shuffleCardsBtn.addEventListener("click", shuffleCards);
sneekCardsBtn.addEventListener("click", sneekCards);
showCardsBtn.addEventListener("click", showCards);

//*****************************************
//FUNCTIONS
//*****************************************

function renderGameSound() {
  gamePlayingSND.volume = 0.4;
  gamePlayingSND.loop = true;
  
  if (gamePlaying) {
    gamePlayingSND.play();
  } else {
    gamePlayingSND.pause();
  }
}

function renderGame(e) {
  let id = e.target.dataset.id;
  if (id && !clickFirstCard) {
    firstCard = iconNumber[id - 1];
    if (openedCards.includes(firstCard)) {
      renderAlert("danger", "Card already open", 1000);
    } else {
      gamePlaying = true;
      renderGameSound();
      firstCardSND.play();
      openedCards.push(firstCard);
      clickFirstCard = true;
      e.target.classList.add("game-card-show");
      addCardActive(e);
    }
  } else if (id && clickFirstCard) {
    secondCard = iconNumber[id - 1];
    if (openedCards.includes(secondCard)) {
      renderAlert("danger", "Card already open", 1000);
    } else {
      if (secondCard === firstCard) {
        renderAlert("danger", "Card already open", 1000);
      } else {
        e.target.classList.add("game-card-show");
        if (indexMap[firstCard] === indexMap[secondCard]) {
          e.target.classList.add("game-card-show");
          removeCardActive();
          clickFirstCard = false;
          openedCards.push(secondCard);
          //render answers
          answersEl.textContent = Math.floor(openedCards.length / 2);

          if (openedCards.length === 16) {
            gameComplete();
          } else {
            correctCardSND.currentTime = 0;
            correctCardSND.play();
            renderAlert("success", "Good Job! A few more to go", 1000);
          }
        } else {
          wrongCardSND.currentTime = 0;
          wrongCardSND.play();
          wrongCardSND.volume = 0.5;
          renderAlert("danger", "Oops. Wrong card. Try again", 1000);
          renderLives();
          setTimeout(() => {
            e.target.classList.remove("game-card-show");
          }, 1000);
        }
      }
    }
  }
}

function renderGameDashBoard() {
  answersEl.textContent = 0;
  lives = 10;
  livesEl.textContent = lives;
  sneaks = 3;
  sneaksEl.textContent = sneaks;
  sneekCardsBtn.classList.remove("none");
}

function shuffleCards() {
  gamePlaying = false;
  gamePlayingSND.currentTime = 0;
  renderGameSound();
  renderGameDashBoard();
  showCardsBtn.classList.remove("none");
  iconNumber = [];
  openedCards = [];
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  //the first item of the iconnumber array should be a random number
  //const randNumber = generateRandNumber();
  //iconNumber.push(randNumber);

  //functionality for generating icon number array
  for (i = 0; i < 15; i++) {
    const number = generateRandNumber();
    if (!iconNumber.includes(number)) {
      iconNumber.push(number);
    }
  }

  for (let number of numbers) {
    if (!iconNumber.includes(number)) {
      iconNumber.push(number);
    }
  }

  //functionality for pushing cards to grid
  HTMLString = iconNumber
    .map((number) => {
      return `<div class="game-card">
  <img src="./game-images/${number}.svg" alt="game-icon" class="game-card-icon" />
  
</div>`;
    })
    .join("");

  gameGrid.innerHTML = HTMLString;
  addCardCover();
  hideCards();
  removeCardActive();
  renderAlert("success", "Cards shuffled", 1000);
  clickFirstCard = false;
}

function showCards() {
  gamePlayingSND.pause();
  showCardSND.play();
  renderGameDashBoard();
  openedCards = [];
  removeCardCover();
  sneekCardsBtn.classList.add("none");
}

function hideCards() {
  cardCover.forEach((cover) => {
    cover.classList.remove("game-card-show");
  });
}
function removeCardCover() {
  cardCover.forEach((cover) => {
    cover.classList.add("none");
  });
}
function addCardCover() {
  cardCover.forEach((cover) => {
    cover.classList.remove("none");
  });
}

function addCardActive(e) {
  e.target.classList.add("game-card-active");
}
function removeCardActive() {
  cardCover.forEach((card) => {
    card.classList.remove("game-card-active");
  });
}

function sneekCards() {
  if (sneaks > 0) {
    peakSND.play();
  }
  sneaks--;
  if (sneaks >= 0) {
    sneaksEl.textContent = sneaks;
  } else {
    sneaksEl.textContent = 0;
  }

  if (sneaks >= 0) {
    removeCardCover();
    showCardsBtn.classList.add("game-hide");
    sneekCardsBtn.classList.add("game-hide");
    setTimeout(() => {
      addCardCover();
      sneekCardsBtn.classList.remove("game-hide");
      showCardsBtn.classList.remove("game-hide");
    }, 2000);
  } else {
    renderAlert("danger", "You're out of sneaks", 1000);
  }
}

function renderLives() {
  lives--;
  if (lives >= 0) {
    livesEl.textContent = lives;
  } else {
    livesEl.textContent = 0;
  }

  if (lives <= 0) {
    gameFailed();
  }
}

function renderAlert(type, message, duration) {
  gameAlert.classList.remove("game-alert-danger");
  gameAlert.classList.remove("game-alert-success");
  gameAlert.textContent = message;
  gameAlert.classList.add(`game-alert-${type}`);
  gameAlert.classList.remove("game-hide");

  setTimeout(() => {
    gameAlert.classList.remove(`game-alert-${type}`);
    gameAlert.classList.add("game-hide");
    gameAlert.textContent = "hello there";
  }, duration);
}

function generateRandNumber() {
  return Math.floor(Math.random() * 16 + 1);
}

function gameComplete() {
  gamePlayingSND.pause();
  winSND.play();
  setTimeout(() => {
    gameAlert.textContent = "Congratulations! Game Won.";
    gameAlert.classList.add(`game-alert-success`);
    gameAlert.classList.remove("game-hide");
  }, 1000);

  removeCardCover();
  sneekCardsBtn.classList.add("none");
  showCardsBtn.classList.add("none");
}

function gameFailed() {
  gamePlayingSND.pause();
  gameLostSND.play();
  setTimeout(() => {
    gameAlert.textContent = "You have no lives left. Game Over.";
    gameAlert.classList.add(`game-alert-danger`);
    gameAlert.classList.remove("game-hide");
  }, 1000);

  removeCardCover();
  sneekCardsBtn.classList.add("none");
  showCardsBtn.classList.add("none");
}
