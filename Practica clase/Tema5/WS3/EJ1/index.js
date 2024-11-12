document.addEventListener("DOMContentLoaded", () => {
  let seconds = 0;
  let tens = 0;
  const appendTens = document.getElementById("tens");
  const appendSeconds = document.getElementById("seconds");
  const buttonStart = document.getElementById("button-start");
  const buttonStop = document.getElementById("button-stop");
  const buttonReset = document.getElementById("button-reset");
  let interval;

  const updateDisplay = () => {
    appendTens.textContent = tens < 10 ? `0${tens}` : tens;
    appendSeconds.textContent = seconds < 10 ? `0${seconds}` : seconds;
  };

  const startTimer = () => {
    tens++;
    if (tens > 99) {
      seconds++;
      tens = 0;
    }
    updateDisplay();
  };

  buttonStart.addEventListener("click", () => {
    clearInterval(interval);
    interval = setInterval(startTimer, 10);
  });

  buttonStop.addEventListener("click", () => {
    clearInterval(interval);
  });

  buttonReset.addEventListener("click", () => {
    clearInterval(interval);
    tens = 0;
    seconds = 0;
    updateDisplay();
  });
});
