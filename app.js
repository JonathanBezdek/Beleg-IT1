var date = new Date();
var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();
var hour = date.getHours();
var minute = date.getMinutes();
var second = date.getSeconds();
var deadline;


hour = hour < 10 ? "0" + hour : hour;
minute = minute < 10 ? "0" + minute : minute;
second = second < 10 ? "0" + second : second;

day = day < 10 ? "0" + day : day;
month = month < 10 ? "0" + month : month;
year = year < 10 ? "0" + year : year;

function updateCurrentTime() {

    let current_time = hour + " : " + minute + " : " + second;
    document.getElementById("currentTime").innerHTML = current_time;
    console.log(deadline);
}

function setValues() {

    let displayDate;
    let displayTime;
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    let tomorrowDay = tomorrow.getDate();
    let tomorrowMonth = tomorrow.getMonth() + 1;
    let tomorrowYear = tomorrow.getFullYear();

    tomorrowDay = tomorrowDay < 10 ? "0" + tomorrowDay : tomorrowDay;
    tomorrowMonth = tomorrowMonth < 10 ? "0" + tomorrowMonth : tomorrowMonth;
    tomorrowYear = tomorrowYear < 10 ? "0" + tomorrowYear : tomorrowYear;

    //Sonderfälle 22,23 und 24 Uhr     

    switch (hour) {
        case 22:
            displayTime = "00:00";
            displayDate = tomorrowYear + "-" + tomorrowMonth + "-" + tomorrowDay;
            break;
        case 23:
            displayTime = "01:00";
            displayDate = tomorrowYear + "-" + tomorrowMonth + "-" + tomorrowDay;
            break;
        case 24:
            displayTime = "02:00";
            displayDate = tomorrowYear + "-" + tomorrowMonth + "-" + tomorrowDay;
            break;
        default:
            displayTime = hour + 2 + ":00";
            displayDate = year + "-" + month + "-" + day;

    }

    document.getElementById("endTime").value = displayTime;
    document.getElementById("endDate").value = displayDate;
}


function checkForm() {
    //const deadline = new Date(endFormat);
    let endDate = document.getElementById('endDate').value;
    console.log(endDate);
    let endTime = document.getElementById('endTime').value;
    console.log(endTime);

    let endFormat = endDate + "T" + endTime + "Z"; //conversion in ISO date (YYYY-MM-DDTHH:MM:SSZ) 

    deadline = new Date(endFormat);
    console.log(deadline);
    return false;
}

function getTimeRemaining(endtime) {
    
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    //console.log(total);

    return {
        total,
        days,
        hours,
        minutes,
        seconds
    };
}

function initializeClock(id, endtime) {
    
    const clock = document.getElementById(id);
    const daysSpan = clock.querySelector('.days');
    const hoursSpan = clock.querySelector('.hours');
    const minutesSpan = clock.querySelector('.minutes');
    const secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
        const t = getTimeRemaining(endtime);

        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }

    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
}

//const deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
setValues();
checkForm();
initializeClock('clockdiv', deadline);
updateCurrentTime();
//setInterval(updateCurrentTime, 4000);



