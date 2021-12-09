import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const refs = {
inputEl: document.querySelector('#datetime-picker'),
buttonEl: document.querySelector('button[data-start]'),
daysValueEl: document.querySelector('.value[data-days]'),
hoursValueEl: document.querySelector('.value[data-hours]'),
minutesValueEl: document.querySelector('.value[data-minutes]'),
secondsValueEl: document.querySelector('.value[data-seconds]'),
selectedDates : null,
};


refs.buttonEl.setAttribute('disabled', true);



const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if(selectedDates[0] < Date.now()) {
           return Notiflix.Notify.failure('Please choose a date in the future!');
        } else {
            refs.buttonEl.removeAttribute('disabled'); 
            refs.selectedDates = selectedDates;
            console.log(selectedDates[0]);
        }
    //   console.log(selectedDates[0]);
     
  
    },
  };

flatpickr(refs.inputEl, options);



refs.buttonEl.addEventListener('click', onStart);

function onStart() {
    let timerId = setInterval(() => {
    const currentTime = Date.now();
    // console.log(currentTime);

    const timer =  refs.selectedDates[0] - currentTime;
    convertMs(timer) ;
   
    console.log(convertMs(timer));

    updateTimer(convertMs(timer))
    if(timer < 1000){
        clearInterval(timerId);
    }
  
   }, 1000);
  
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }
  
//   console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//   console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//   console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function updateTimer({ days, hours, minutes, seconds }) {
    refs.daysValueEl.textContent = `${days}`;
    refs.hoursValueEl.textContent = `${hours}`;
    refs.minutesValueEl.textContent = `${minutes}`;
    refs.secondsValueEl.textContent = `${seconds}`;
  }


function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}