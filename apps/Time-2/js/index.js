const newTimer = document.getElementById('newTimer');
const newTimerButton = document.getElementById('newTimerButton');
const clearAllTimersButton = document.getElementById('clearAllTimers');
const newTimerInput = document.getElementById('newTimerInput');
const newTimerCancel = document.getElementById('newTimerCancel');
const newTimerAdd = document.getElementById('newTimerAdd');
const newTimerDisplay = document.querySelectorAll('.timer-time .value');
let timerIntervalArray = [];

const months = [
   "January",
   "February",
   "March",
   "April",
   "May",
   "June",
   "July",
   "August",
   "September",
   "October",
   "November",
   "December"
]

const weekdays = [
   "Sunday",
   "Monday",
   "Tuesday",
   "Wednesday",
   "Thursday",
   "Friday",
   "Saturday"
]
// let startDate = new Date(toDateElement.dataset.date);

let timerArray = [];

function twoDigitFormat(num) {
   if (num < 10) {
      return (num = `0${num}`);
   }
   return num;
}

// let startDate = new Date(2021,5,18,0,0,0);
let endDate = new Date(2021,5,26,0,0,0);

// const startYear = startDate.getFullYear();
// const startMonth = months[startDate.getMonth()];
// const startDay = startDate.getDate();
// const startWeekday = weekdays[startDate.getDay()];
// let hours = twoDigitFormat(startDate.getHours());
// let minutes = twoDigitFormat(startDate.getMinutes());
// let seconds = twoDigitFormat(startDate.getSeconds());
// let meridian = 'am'
// startDateDisplay.textContent = `${startWeekday}, ${startMonth} ${startDay}, ${startYear}`;
// if (hours > 12) {
//    meridian = 'pm';
//    hours -= 12;
// }
// time.textContent = `${hours}:${minutes}${meridian}
const endWeekday = weekdays[endDate.getDay()];
const endMonth = months[endDate.getMonth()];
const endDay = endDate.getDate();
const endYear = endDate.getFullYear();
// endDateDisplay.textContent = `${endWeekday}, ${endMonth} ${endDay}, ${endYear}`;

// const futureTime = startDate.getTime();

function loadTimers() {
   timerArray = JSON.parse(window.localStorage.getItem('timerList'));
   if (!timerArray) { timerArray = [] };
   timerArray.forEach(item => {
      const timerId = camelCase(item.title)
      addTimer(timerId, item.title, item.date);
   })
}

function getTimeTo(toDateTime) {
   const today = new Date().getTime();
   toDateTime = new Date(toDateTime);

   const t = toDateTime - today;
   if ( t < 0 ) { return [0,0,0,0] };
   // 1s = 1000ms
   // 1m = 60s
   // 1h = 60m
   // 1d = 24h
   const oneMinute = 60 * 1000;
   const oneHour = 60 * oneMinute;
   const oneDay = 24 * oneHour;
   let daysRem = t / oneDay;
   daysRem = Math.floor(daysRem);
   let hoursRem = Math.floor((t % oneDay) / oneHour);
   let minutesRem = Math.floor((t % oneHour) / oneMinute);
   let secondsRem = Math.floor((t % oneMinute) / 1000);
   return [daysRem,hoursRem,minutesRem,secondsRem];
}

function camelCase(str) {
   return str
       .replace(/\s(.)/g, function(a) {
           return a.toUpperCase();
       })
       .replace(/\s/g, '')
       .replace(/^(.)/, function(b) {
           return b.toLowerCase();
       });
}

function clearTimerInput() {
   newTimerInput.classList.add('hidden');
   document.getElementById('newTimerTitle').value = '';
   document.getElementById('newTimerDate').value = '';
}

function saveTimer(newTitle, newDate) {
   var newTimerObject = {
      "title": newTitle,
      "date": newDate
      };
   timerArray.push(newTimerObject);
   window.localStorage.setItem('timerList',JSON.stringify(timerArray));
}

function addTimer(timerId, newTitle, time2Date) {
   var newTimerObj = document.createElement('div');
   newTimerObj.classList.add('timer-2');
   newTimerObj.id = timerId;

   var timerObj = [  `<div class="timer-title">`,
                        `<h2>${newTitle}</h2>`,
                     `</div>`,
                     `<div class="timer-date">`,
                        `<h4>${time2Date}</h4>`,
                     `</div>`,
                     `<div>`,
                        `<button class="delete" type="button" id="remove">X</button>`,
                     `</div>`,
                     `<div class="timer-time">`,
                        `<div class="time time-days">`,
                           `<p class="value"></p>`,
                           `<p class="label">days</p>`,
                        `</div>`,
                        `<div class="time time-hours">`,
                           `<p class="value"></p>`,
                           `<p class="label">hours</p>`,
                        `</div>`,
                        `<div class="time time-minutes">`,
                           `<p class="value"></p>`,
                           `<p class="label">minutes</p>`,
                        `</div>`,
                        `<div class="time time-seconds">`,
                           `<p class="value"></p>`,
                           `<p class="label">seconds</p>`,
                        `</div>`,
                     `</div>` ].join('\n');
   newTimerObj.innerHTML = timerObj;
   document.querySelector('.timers').appendChild(newTimerObj);
   startTimer(timerId, time2Date);
   timerIntervalArray.push(timerId);
}

function startTimer(timerId, newDate) {
   const timeToArray = getTimeTo(newDate);
   const timerDisplay = document.querySelectorAll(`#${timerId} .value`);
   timerDisplay.forEach(function(item,index) {
      item.innerHTML = twoDigitFormat(timeToArray[index]);
   });
   if (timeToArray == [0,0,0,0]) {

   } else {
      setTimeout(function() {startTimer(timerId, newDate), 1000});
   }
}

newTimerButton.addEventListener('click', function() {
   newTimerInput.classList.remove('hidden');
})

clearAllTimersButton.addEventListener('click', function() {
   window.localStorage.clear();
   location.reload(true);
})

newTimerCancel.addEventListener('click', function() {
   clearTimerInput()
})

newTimerAdd.addEventListener('click', function() {
   const newTitle = document.getElementById('newTimerTitle').value;
   // const timerId = newTitle.split(' ').join('');
   const timerId = camelCase(newTitle);
   var newDate = document.getElementById('newTimerDate').value;
   newDate = `${newDate.slice(5,7)}/${newDate.slice(8,10)}/${newDate.slice(0,4)}`;
   saveTimer(newTitle,newDate);
   addTimer(timerId, newTitle, newDate);
   clearTimerInput()
})

// var countdown = setInterval(getRemainingTime,1000);
loadTimers()
