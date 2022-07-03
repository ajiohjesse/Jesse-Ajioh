// Blackjack game

const sound = new Audio("../audio/fireworks.mp3");
const fireworks = document.querySelector(".fireworks");
const startBtn = document.getElementById("start-btn");
const newCardBtn = document.getElementById("new-card-btn");
const gameCards = document.querySelector(".game-cards");

let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";

let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let playerEl = document.getElementById("player-el");

function getRandomCard() {
  let randomNumber = Math.floor(Math.random() * 13) + 1;

  if (randomNumber > 10) {
    return 10;
  } else if (randomNumber === 1) {
    return 11;
  } else {
    return randomNumber;
  }
}

function startGame() {
  isAlive = true;
  hasBlackJack = false;
  let firstCard = getRandomCard();
  let secondCard = getRandomCard();
  cards = [firstCard, secondCard];
  sum = firstCard + secondCard;
  renderBlackJackGame();
  btnToggle(newCardBtn);
}

function renderBlackJackGame() {
  resetMsgEl();
  messageEl.textContent = "Generating cards. . .";
  messageEl.classList.add("blue-text");
  setTimeout(() => {
    //display cards
    cardsHTML = cards
      .map((card) => {
        return `
          <div class="game-img-container">
            <img
              class="game-card-img"
              src="./images/game-card2.png"
              alt="game-card"
            />
            <span class="card-number-1">${card}</span>
            <span class="card-number-2">${card}</span>
          </div>

      `;
      })
      .join(" ");

    gameCards.innerHTML = cardsHTML;
    //end display cards

    if (sum <= 20) {
      message = "Do you want a new card?";
      resetMsgEl();
      messageEl.classList.add("white-text");
    } else if (sum === 21) {
      message = "You win! You have Blackjack!";
      resetMsgEl();
      messageEl.classList.add("gold-text");
      hasBlackJack = true;

      //remove buttons
      startBtn.classList.add("hide");
      newCardBtn.classList.add("hide");

      setTimeout(() => {
        startBtn.classList.remove("hide");
      }, 4500);

      // animation
      setTimeout(() => {
        setTimeout(() => {
          fireworks.classList.remove("hide");
          sound.play();
        });

        setTimeout(() => {
          fireworks.classList.add("hide");
        }, 3500);
      });
    } else {
      message = "You're out of the game! Try again. . .";
      resetMsgEl();
      messageEl.classList.add("red-text");
      isAlive = false;
      btnToggle(newCardBtn);
      startBtn.classList.remove("hide");
    }
    messageEl.textContent = message;
    cardsEl.textContent = `Cards:   `;

    for (i = 0; i < cards.length; i++) {
      cardsEl.textContent += cards[i] + " ";
    }

    sumEl.textContent = "Sum:   " + sum;
  }, 1000);
}

function newCard() {
  if (isAlive === true && hasBlackJack === false) {
    let card = getRandomCard();
    cards.push(card);
    sum += card;
    renderBlackJackGame();
  }
}

function btnToggle(btn) {
  if (isAlive === false) {
    btn.classList.add("hide");
  } else {
    btn.classList.remove("hide");
  }
}

btnToggle(newCardBtn);

function resetMsgEl() {
  messageEl.classList.remove("gold-text");
  messageEl.classList.remove("red-text");
  messageEl.classList.remove("blue-text");
  messageEl.classList.add("white-text");
}
