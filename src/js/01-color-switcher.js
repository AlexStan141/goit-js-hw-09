var startButton = document.querySelector('[data-start]');
var stopButton = document.querySelector('[data-stop]');
stopButton.setAttribute('disabled', true);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function changeScreenColor() {
  document.getElementsByTagName('body')[0].style.backgroundColor =
    getRandomHexColor();
}

var timerId;

startButton.addEventListener('click', () => {
  startButton.setAttribute('disabled', true);
  stopButton.removeAttribute('disabled');
  timerId = setInterval(changeScreenColor, 1000);
});

stopButton.addEventListener('click', () => {
  stopButton.setAttribute('disabled', true);
  startButton.removeAttribute('disabled');
  clearInterval(timerId);
});
