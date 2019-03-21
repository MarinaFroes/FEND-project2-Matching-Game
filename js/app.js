//TODO: Start by building a grid of randomly placed cards

//TODO: Add the functionality to handle clicks (event delegation)
function openCard() {
  if (event.target.nodeName === 'LI') {
    event.target.classList.add('open');
  }
}

//TODO: Work on the matching logic


//TODO: Create the winning condition


//Implement additional functionality
//TODO: Move counter


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

