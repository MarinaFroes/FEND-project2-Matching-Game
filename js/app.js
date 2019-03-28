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

//SHUFFLES AND DISPLAYS THE CARDS ON THE PAGE

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

//Shuffles the array of icons
arrayOfIcons = shuffle(arrayOfIcons);

//Defines parent element - saves deck ul element in a variable
const deckOfCards = document.getElementById('deck');

//Distributes the cards on the deck - creates li elements and appends them to the deck ul element
function addCardsToDeck(parentElement, arrayOfIcons) {
  for (let i = 0; i < arrayOfIcons.length; i++) {
    let newCard = document.createElement('li');
    newCard.innerHTML = arrayOfIcons[i];
    newCard.setAttribute('class', 'card');
    parentElement.appendChild(newCard);
  };
}

addCardsToDeck(deckOfCards, arrayOfIcons);

//HANDLES CLICKS TO OPEN CARDS

const CSS_OPEN_CARD_CLASS = 'open';
const CSS_DONT_MATCH_CLASS = 'dont-match';
const CSS_MATCH_CLASS = 'match';

//Temporarily store a pair of clicked cards
let arrayOfClickedCards = [];

//Condition to run the function OpenCard()
let finishChecking = true;

//Adds the class open to the clicked list item that doesn't have this class already
function openCard() {
  let clickedCard = event.target;

  //Prevents from openning a new card while it's still checking the current pair 
  if (!finishChecking) {
    return;
  };

  if (arrayOfClickedCards.length >= 2) {
    //To make sure it will not open more then 2 cards at the same time
    return;
  };

  if (clickedCard.nodeName === 'LI' && !clickedCard.classList.contains(CSS_OPEN_CARD_CLASS)) {
    clickedCard.classList.add(CSS_OPEN_CARD_CLASS);

    if (clickedCard.classList.contains(CSS_DONT_MATCH_CLASS)) {
      clickedCard.classList.remove(CSS_DONT_MATCH_CLASS);
    };
    
    countMoves();
    moveCounter === 1 && manageTimer(true);
    addOpenCardsToList(clickedCard.innerHTML);
  };
}

//Adds up to 2 clicked cards to an array, then it invokes isItAMatch() function to check if both cards are equal
function addOpenCardsToList(card) {
  arrayOfClickedCards.push(card);
  arrayOfClickedCards.length === 2 && isItAMatch();
}

//CHECKS IF THE PAIR OF OPEN CARDS ARE A MATCH

//Stores the cards that are a match
let openCardsArray = [];
let allCards = document.querySelectorAll('.card');

//Checks matching - if true, push the matching pair to openCardsArray, otherwise, invokes notAMatch() function to turn the cards down again
//Invokes finishGame() function with win argument if all the cards are open
function isItAMatch() {
  if (arrayOfClickedCards[0] === arrayOfClickedCards[1]) {
    arrayOfClickedCards.forEach(item => {
      openCardsArray.push(item);
      allCards.forEach(card => {
        let icon = card.innerHTML;
        if (arrayOfClickedCards.includes(icon)) {
          card.classList.add(CSS_MATCH_CLASS);
        };
      })
    });
    
  } else {
    //finishChecking is reassigned to false in order to wait notAMatch() function to finish running
    finishChecking = false;
    setTimeout(notAMatch, 1000, arrayOfClickedCards);
  };

  if (openCardsArray.length === 16) {
    setTimeout(finishGame, 500, true);
  };
  starRating(moveCounter);

  return arrayOfClickedCards = [];
}

//Removes the open class from non matching cards - turns the cards down again 
//Reassigns finishChecking to true, to allow opening new cards
function notAMatch(arrayOfClickedCards) {

  allCards.forEach(card => {
    let icon = card.innerHTML;
    if (card.classList.contains(CSS_OPEN_CARD_CLASS) && arrayOfClickedCards.includes(icon)) {
      card.classList.add(CSS_DONT_MATCH_CLASS);
      card.classList.remove(CSS_OPEN_CARD_CLASS);
    };
  });

  finishChecking = true;
}

//DEFINES WINNING CONDITION

//Displays congratulation or try again modal 
function displayModal(classToAdd) {
  document.querySelector('.modal').classList.add('show-modal');
  let text;

  if (classToAdd === 'win') {
    text = (`
    CONGRATULATIONS! YOU WON!

    Number of moves: ${moveCounter} 
    Star rating: ${'0' + starsCounter}
    Time of game: ${document.getElementById('timer').innerText}

    Click on the X to play again.
    `);
  } else if (classToAdd === 'lose') {
    text = (`
    TRY AGAIN! :(

    Too many moves. 
    You lost all stars.
    Number of moves: ${moveCounter} 
    Time of game: ${document.getElementById('timer').innerText}

    Click on the X to play again.
    `);
  };

  document.querySelector('.modal-text').innerText = text;
  document.querySelector('.modal-content').classList.add(classToAdd);
}

function finishGame(isWinner) {
  isWinner ? displayModal('win') : displayModal('lose');
  manageTimer(false);
}

//MOVE COUNTER
let moveCounter = 0;

function countMoves() {
  moveCounter++;
  document.querySelector('.moves').innerText = moveCounter;
}

//TIMER
let sec = 0;
let min = 0;
let interval;

function manageTimer(runTimer) {
  if (runTimer) {
    interval = setInterval(timer, 1000);
  } else {
    clearInterval(interval);
  };
}

function addLeftZero(num) {
  if (num < 10) {
    num = '0' + num;
  };
  return num;
}

function timer() {
  document.getElementById('timer').innerText = `${addLeftZero(min)}:${addLeftZero(sec)}`;
  sec++;

  if (sec > 59) {
    sec = 0;
    min++;
  };
}

//STAR RATING
//Removes stars depending on the number of moves
//When the user loses all the stars, it invokes finishGame() with a 'lose' argument
let starsCounter = 3;

function starRating(moveCounter) {
  const newStarIcon = '<i class="far fa-star"></i>';

  if (moveCounter > 20 && moveCounter < 35) {
    document.getElementById('third-star').innerHTML = newStarIcon;
    starsCounter = 2;
  };

  if (moveCounter >= 35 && moveCounter < 48) {
    document.getElementById('second-star').innerHTML = newStarIcon;
    starsCounter = 1;
  };

  if (moveCounter >= 48 && openCardsArray.length < 16) {
    document.getElementById('first-star').innerHTML = newStarIcon;
    starsCounter = 0;
    setTimeout(finishGame, 500, false);
  };
}