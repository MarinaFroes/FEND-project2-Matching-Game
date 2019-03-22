//TODO: Start by building a grid of randomly placed cards

//  * Create a list that holds all of your cards
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

//  * Display the cards on the page
//  - shuffle the list of cards using the provided "shuffle" method below
//  - loop through each card and create its HTML
//  - add each card's HTML to the page

// Shuffle function from http://stackoverflow.com/a/2450976
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

//Creating li elements, appeding them to the deck ul element
function addCardsToDeck(parentElement, array) {
  for (let i = 0; i < array.length; i++) {
    let newCard = document.createElement('li');
    newCard.innerHTML = array[i];
    newCard.setAttribute('class', 'card');
    parentElement.appendChild(newCard);
  }
}

addCardsToDeck(deckOfCards, arrayOfIcons);

//TODO: Add the functionality to handle clicks (event delegation)
//  * set up the event listener for a card. If a card is clicked:
//  *  - display the card's symbol (put this functionality in another function that you call from this one)
let arrayOfClickedCards = [];

function openCard() {
  if (arrayOfClickedCards.length < 2) {
    if (event.target.nodeName === 'LI' && !event.target.classList.contains('open')) {
      event.target.classList.add('open');
      countMoves();
      addOpenCardsToList(event.target.innerHTML);
    }
  }
}

//TODO: Work on the matching logic
//  *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
// * - if the list already has another card, check to see if the two cards match

function addOpenCardsToList(card) {
  arrayOfClickedCards.push(card);
  console.log(arrayOfClickedCards);
  if (arrayOfClickedCards.length === 2) {
    console.log('I invoked isItAMatch function');
    return isItAMatch();
  }
}

//   * + if the cards do match, lock the cards in the open position(put this functionality in another function that you call from this one)
let openCardsArray = []; 

function isItAMatch() {
  if (arrayOfClickedCards[0] === arrayOfClickedCards[1]) {
    arrayOfClickedCards.forEach(item => openCardsArray.push(item));
    console.log('it is a match');
    console.log(`openCardsArray: ${openCardsArray}`);
    
    //TODO: check if openCardsArray.length === 16
    //TODO: if it is, call the finishGame() function
  } else {
    console.log('Not a match');
    setTimeout(notAMatch, 1000, arrayOfClickedCards);
  }
  if (openCardsArray.length === 16) {
    finishGame();
  }
  return arrayOfClickedCards = [];
}

//   * + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)

//TODO: 
function notAMatch(array) {
  let listItems = document.querySelectorAll('.card');
  console.log(listItems);
  for (let i = 0; i < listItems.length; i++) {
    console.log(listItems[i]);
    console.log(listItems[i].innerHTML);
    if (listItems[i].classList.contains('open') && array.includes(listItems[i].innerHTML)) {
      listItems[i].classList.remove('open');
    }
  }
}
  
//TODO: Create the winning condition
// + if all cards have matched, display a message with the final score(put this functionality in another function that you call from this one)

//TODO: add modal with time elapsed, star rating
//number of moves and option to restart the game ;

function finishGame() {
  alert('You finished');
  clearInterval(interval);
}

//Implement additional functionality
//TODO: Move counter
// + increment the move counter and display it on the page(put this functionality in another function that you call from this one)
let counter = 0;

function countMoves() {
  counter++;
  document.querySelector('.moves').innerText = counter;
}

//TODO: Timer
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
  if (min === 10) {
    clearInterval(interval);
    document.getElementById('timer').innerText = `End`;
  }
}
const interval = setInterval(timer, 1000);

//TODO: Star rating


//TODO: Reset Button