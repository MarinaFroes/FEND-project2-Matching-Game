//Array of fontawesome icons
let arrayOfIcons = [
  '<i class="far fa-grin-hearts"></i>',
  '<i class="far fa-frown-open"></i>',
  '<i class="far fa-grimace"></i>',
  '<i class="far fa-grin"></i>',
  '<i class="far fa-grin-beam-sweat"></i>',
  '<i class="far fa-meh-rolling-eyes"></i>',
  '<i class="far fa-grin-squint"></i>',
  '<i class="far fa-grin-tongue"></i>',
  '<i class="far fa-grin-hearts"></i>',
  '<i class="far fa-frown-open"></i>',
  '<i class="far fa-grimace"></i>',
  '<i class="far fa-grin"></i>',
  '<i class="far fa-grin-beam-sweat"></i>',
  '<i class="far fa-meh-rolling-eyes"></i>',
  '<i class="far fa-grin-squint"></i>',
  '<i class="far fa-grin-tongue"></i>'
];

//Display the cards on the page
//Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//To shuffle the array of icons
arrayOfIcons = shuffle(arrayOfIcons);

//Saving the deck ul element in a variable
const deckOfCards = document.getElementById("deck");

//Creating li elements and appending them to the deck ul element
function addCardsToDeck(parentElement, arrayOfIcons) {
  for (let i = 0; i < arrayOfIcons.length; i++) {
    let newCard = document.createElement('li');
    newCard.innerHTML = arrayOfIcons[i];
    newCard.setAttribute('class', 'card');
    parentElement.appendChild(newCard);
  }
}

addCardsToDeck(deckOfCards, arrayOfIcons);

//Functionality to handle clicks (event delegation)
let arrayOfClickedCards = [];
const cssOpenCardClass = 'open';
let finishChecking = true;

function openCard() {
  if (!finishChecking) {
    return;
  }
  if (arrayOfClickedCards.length >= 2) {
    console.log('WARNING: arrayOfClickedCards.length > 2');
    return;
  }
  if (event.target.nodeName === 'LI' && !event.target.classList.contains(cssOpenCardClass)) {
    event.target.classList.add(cssOpenCardClass);
    countMoves();
    starRating(moveCounter);
    addOpenCardsToList(event.target.innerHTML);
  }
}

//Checking if the open cards match
function addOpenCardsToList(card) {
  arrayOfClickedCards.push(card);
  if (arrayOfClickedCards.length === 2) {
    return isItAMatch();
  }
}

let openCardsArray = [];

function isItAMatch() {
  if (arrayOfClickedCards[0] === arrayOfClickedCards[1]) {
    arrayOfClickedCards.forEach(item => openCardsArray.push(item));
  } else {
    finishChecking = false;
    setTimeout(notAMatch, 1000, arrayOfClickedCards);
  }

  if (openCardsArray.length === 16) {
    setTimeout(finishGame, 500, 'win');
  }

  return arrayOfClickedCards = [];
}

//Cards don't match: removing the cards from the list and hiding the card's symbol 
function notAMatch(arrayOfClickedCards) {
  let listItems = document.querySelectorAll('.card');

  for (let i = 0; i < listItems.length; i++) {
    const icon = listItems[i].innerHTML;

    if (listItems[i].classList.contains(cssOpenCardClass) && arrayOfClickedCards.includes(icon)) {
      listItems[i].classList.remove(cssOpenCardClass);
    }
  }
  finishChecking = true;
}

//Winning condition

//TODO: add modal with time elapsed, star rating
//number of moves and option to restart the game ;

function finishGame(winOrLose) {
  document.querySelector('.modal').classList.add('show-modal');
  if (winOrLose === 'win') {

    document.querySelector('.modal-content').classList.add('win');
    document.querySelector('.modal-text').innerText = (`
    CONGRATULATIONS! YOU WON!

    Number of moves: ${moveCounter} 
    Star rating: ${'0' + starsCounter}
    Time of game: ${document.getElementById('timer').innerText}

    Click on the X to play again.
    `);
  }
  if (winOrLose === 'lose') {

    document.querySelector('.modal-content').classList.add('lose');
    document.querySelector('.modal-text').innerText = (`
    TRY AGAIN! :(

    Too many moves. 
    You lost all stars.
    Number of moves: ${moveCounter} 
    Time of game: ${document.getElementById('timer').innerText}

    Click on the X to play again.
    `);
  }

  clearInterval(interval);
}

//Move counter
let moveCounter = 0;

function countMoves() {
  moveCounter++;
  document.querySelector('.moves').innerText = moveCounter;
}

//Timer
let sec = 0;
let min = 0;

function addLeftZero(num) {
  if (num < 10) {
    num = "0" + num;
  }
  return num;
}

function timer() {
  document.getElementById('timer').innerText = `${addLeftZero(min)}:${addLeftZero(sec)}`;
  sec++;

  if (sec > 59) {
    sec = 0;
    min++;
  }

}
const interval = setInterval(timer, 1000);

//Star rating
let starsCounter = 3;

function starRating(moveCounter) {
  const newStarIcon = '<i class="far fa-star"></i>';

  if (moveCounter > 16 && moveCounter < 32) {
    document.getElementById('third-star').innerHTML = newStarIcon;
    starsCounter = 2;
  }

  if (moveCounter >= 32 && moveCounter < 48) {
    document.getElementById('second-star').innerHTML = newStarIcon;
    starsCounter = 1;
  }

  if (moveCounter >= 48 && openCardsArray.length < 16) {
    document.getElementById('first-star').innerHTML = newStarIcon;
    starsCounter = 0;
    setTimeout(finishGame, 500, 'lose');
  }
}
