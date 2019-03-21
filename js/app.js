//TODO: Start by building a grid of randomly placed cards

//  * Create a list that holds all of your cards
//Array of fontawesome icon's classes
let arrayOfClasses = ['far fa-angry', 'far fa-grin-hearts', 'far fa-frown-open', 'far fa-grimace', 'far fa-grin', 'far fa-grin-beam-sweat', 'far fa-meh-rolling-eyes', 'far fa-grin-tongue', 'far fa-angry', 'far fa-grin-hearts', 'far fa-frown-open', 'far fa-grimace', 'far fa-grin', 'far fa-grin-beam-sweat', 'far fa-meh-rolling-eyes', 'far fa-grin-tongue'];

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

//To shuffle the array of classes
arrayOfClasses = shuffle(arrayOfClasses);

//Saving the deck ul element in a variable
const myDeckOfCards = document.getElementById("deck");

//Creating i elements and li elements, appeding them to the deck ul element
function addCards(element, array) {
  for (let i = 0; i < array.length; i++) {
    let newIElement = document.createElement('i'); newIElement.setAttribute('class', array[i]);
    // newCard.innerText = array[i];
    let newCard = document.createElement('li');
    newCard.setAttribute('class', 'card');
    newCard.appendChild(newIElement);
    element.appendChild(newCard);
  }
}

addCards(myDeckOfCards, arrayOfClasses);

//TODO: Add the functionality to handle clicks (event delegation)
//  * set up the event listener for a card. If a card is clicked:
//  *  - display the card's symbol (put this functionality in another function that you call from this one)
//  *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 
function openCard() {
  if (event.target.nodeName === 'LI') {
    event.target.classList.add('open');
  }
}

//TODO: Work on the matching logic
// * - if the list already has another card, check to see if the two cards match
//   * + if the cards do match, lock the cards in the open position(put this functionality in another function that you call from this one)
//   * + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)


//TODO: Create the winning condition
// + if all cards have matched, display a message with the final score(put this functionality in another function that you call from this one)


//Implement additional functionality
//TODO: Move counter
// + increment the move counter and display it on the page(put this functionality in another function that you call from this one)


//TODO: Timer
let sec = 0;
let min = 0;

function timer() {
  document.getElementById('timer').innerText = `${min}:${sec}`;
  sec++;
  if (sec > 59) {
    sec = 0;
    min++;
  }
  if (min > 10) {
    clearInterval(interval);
    document.getElementById('timer').innerText = `End`;
  }
}
// const interval = setInterval(timer, 1000);

//TODO: Star rating


//TODO: Reset Button