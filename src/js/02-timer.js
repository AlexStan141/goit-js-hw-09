import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

var button = document.querySelector('[data-start]');
button.setAttribute('disabled', true);
var input = document.querySelector('#datetime-picker');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      button.setAttribute('disabled', true);
      alert('Please choose a date in the future');
    } else {
      button.removeAttribute('disabled');
    }
  },
};

flatpickr(input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  if (value < 10) {
    return value.toString().padStart(2, '0');
  } else {
    return value.toString();
  }
}

function updateCronometer() {
  if (new Date(input.value).getTime() - new Date().getTime() > 0) {
    var timeObject = convertMs(
      new Date(input.value).getTime() - new Date().getTime()
    );
    document.querySelector('[data-days]').innerHTML = addLeadingZero(
      timeObject.days
    );
    document.querySelector('[data-hours]').innerHTML = addLeadingZero(
      timeObject.hours
    );
    document.querySelector('[data-minutes]').innerHTML = addLeadingZero(
      timeObject.minutes
    );
    document.querySelector('[data-seconds]').innerHTML = addLeadingZero(
      timeObject.seconds
    );
  } else {
    button.setAttribute('disabled', true);
  }
}

button.addEventListener('click', () => {
  setInterval(updateCronometer, 1000);
});
