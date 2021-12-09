const startBtnEl = document.querySelector('button[data-start]');
const stopBtnEl = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');
let timerId = null;

stopBtnEl.setAttribute('disabled', true);

startBtnEl.addEventListener('click', onStartChangeColor);
stopBtnEl.addEventListener('click', onStopColorChange);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

 function onStartChangeColor() {
     timerId = setInterval(() => {
        const color = getRandomHexColor();
        bodyEl.style.backgroundColor =  color;
     }, 1000);
     startBtnEl.setAttribute('disabled', true);
    stopBtnEl.removeAttribute('disabled')
 }
 
 function onStopColorChange() {
    clearInterval(timerId);
    stopBtnEl.setAttribute('disabled', true);
    startBtnEl.removeAttribute('disabled')
 }
