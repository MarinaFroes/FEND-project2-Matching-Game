//Timer functionality
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
