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

const startDateDisplay = document.querySelector('.date-start');
const endDateDisplay = document.querySelector('.date-end');
const time = document.querySelector('.time');
const timer = document.querySelectorAll('.timer-format .number');
const days = document.querySelector('.days');

function twoDigitFormat(num) {
   if (num < 10) {
      return (num = `0${num}`);
   }
   return num;
}

let startDate = new Date(2021,5,18,0,0,0);
let endDate = new Date(2022,6,23,0,0,0);

const startYear = startDate.getFullYear();
const startMonth = months[startDate.getMonth()];
const startDay = startDate.getDate();
const startWeekday = weekdays[startDate.getDay()];
let hours = twoDigitFormat(startDate.getHours());
let minutes = twoDigitFormat(startDate.getMinutes());
let seconds = twoDigitFormat(startDate.getSeconds());
let meridian = 'am'
startDateDisplay.textContent = `${startWeekday}, ${startMonth} ${startDay}, ${startYear}`;
if (hours > 12) {
   meridian = 'pm';
   hours -= 12;
}
// time.textContent = `${hours}:${minutes}${meridian}
const endWeekday = weekdays[endDate.getDay()];
const endMonth = months[endDate.getMonth()];
const endDay = endDate.getDate();
const endYear = endDate.getFullYear();
endDateDisplay.textContent = `${endWeekday}, ${endMonth} ${endDay}, ${endYear}`;

const futureTime = startDate.getTime();

function getRemainingTime() {
   const today = new Date().getTime();
   const t = futureTime - today;
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
   const values = [daysRem,hoursRem,minutesRem,secondsRem];

   timer.forEach(function(item,index) {
      item.innerHTML = twoDigitFormat(values[index]);
   })
   if ( t < 0 ) {
      clearInterval(countdown);

   }
}

var countdown = setInterval(getRemainingTime,1000);
getRemainingTime();
