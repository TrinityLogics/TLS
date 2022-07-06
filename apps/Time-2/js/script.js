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

let timerArray = [];

function timerId() {
   const today = new Date()
   return today.getTime()
}

function twoDigitFormat(num) {
   if (num < 10) {
      return (num = `0${num}`);
   }
   return num;
}

function loadTimers() {
   document.querySelector('.timers').innerHTML = ''
   timerArray = JSON.parse(window.localStorage.getItem('timerList')) || [];
   if (timerArray.length < 1) { showTimerInput() };
   if (Array.isArray(timerArray)) {
      timerArray.forEach(timer => {
         displayTimer(timer);
      })
      runCountdown()
   }
}

function saveTimers() {
   window.localStorage.setItem('timerList',JSON.stringify(timerArray));
}

function getTimeTo(toDateTime) {
   const today = new Date().getTime();
   toDateTime = new Date(toDateTime);

   const t = toDateTime - today;
   if ( t < 0 ) { return 0 };
  
   const oneMinute = 60 * 1000; // 1s = 1000ms
   const oneHour = 60 * oneMinute; // 1m = 60s
   const oneDay = 24 * oneHour; // 1h = 60m
   let daysRem = t / oneDay; // 1d = 24h
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

function showTimerInput() {
   newTimerInput.classList.remove('hidden');
}

function clearTimerInput() {
   newTimerInput.classList.add('hidden');
   document.getElementById('newTimerTitle').value = '';
   document.getElementById('newTimerDate').value = '';
}

function createTimer(title, date) {
   var newTimerObject = {
      "id": timerId(),
      "title": title,
      "date": date
      };
   timerArray.push(newTimerObject);
   saveTimers()
}

function displayTimer(timer) {
   var newTimerObj = document.createElement('div');
   newTimerObj.classList.add('timer', 'card');
   const deleteButton = `<button class="delete" type="button" onClick="deleteTimer('${timer.id}')">X</button>`

   var timerObj = [  `<div class="timer-title">`,
                        `<h2>${timer.title}</h2>`,
                     `</div>`,
                     `<div class="timer-date">`,
                        `<h4>${timer.date}</h4>`,
                     `</div>`,
                     `<div class='controls'>`,
                        deleteButton,
                     `</div>`,
                     `<div id=${timer.id} class="timer-time">`,
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
}

function runCountdown() {
   timerArray.forEach(timer => {
      const timeRemaining = getTimeTo(timer.date)
      const timeDisplay = document.getElementById(timer.id).querySelectorAll('.value');
      timeDisplay.forEach((item, index) => {
         item.innerHTML = twoDigitFormat(timeRemaining[index])
      })
   })
   setTimeout(runCountdown, 1000)
}

function deleteTimer(id) {
   timerArray = timerArray.filter(time => time.id != id)
   saveTimers()
   loadTimers()
}

newTimerButton.addEventListener('click', function() {
   showTimerInput()
})

clearAllTimersButton.addEventListener('click', function() {
   timerArray = []
   saveTimers()
   loadTimers()
})

newTimerCancel.addEventListener('click', function() {
   clearTimerInput()
})

newTimerAdd.addEventListener('click', function() {
   const title = document.getElementById('newTimerTitle').value;
   var date = document.getElementById('newTimerDate').value;
   date = `${date.slice(5,7)}/${date.slice(8,10)}/${date.slice(0,4)}`;
   createTimer(title,date);
   loadTimers();
   clearTimerInput()
})

loadTimers()
