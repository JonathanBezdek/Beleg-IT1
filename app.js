var date = new Date();
var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();
var hour = date.getHours();
var minute = date.getMinutes();
var second = date.getSeconds();
var deadline;



day = day < 10 ? "0" + day : day;
month = month < 10 ? "0" + month : month;
year = year < 10 ? "0" + year : year;

function updateCurrentTime() {
    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;

    let current_time = hour + " : " + minute + " : " + second;
    document.getElementById("currentTime").innerHTML = current_time;
    //console.log(deadline);
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
    deadline.setTime(deadline.getTime() + deadline.getTimezoneOffset() * 60 * 1000);

    initializeClock('clockdiv', deadline);
    return false;
}

function getTimeRemaining(endtime) {

    console.log(endtime);

    var total = Date.parse(endtime) - Date.parse(new Date());
    total = total + 60000; //offset für die letzte minute 
    console.log(total);
    //const seconds = Math.floor((total / 1000) % 60);
    var hours = Math.floor((total / 3600000));
    console.log(hours);
    var minutes = Math.floor(((total) / 1000 / 60) % 60);
    console.log(minutes);
    return {
        total,
        //days,
        hours,
        minutes
        //seconds
    };
}

function initializeClock(id, endtime) {
    if (endtime != deadline) {
        return;
    }
    const clock = document.getElementById(id);

    const hoursSpan = clock.querySelector('.hours');
    const minutesSpan = clock.querySelector('.minutes');


    function updateClock() {

        if (endtime != deadline) {
            return;
        }

        var t = getTimeRemaining(endtime);

        switch (t.hours) {
            case 0:
                hoursSpan.innerHTML = "";
                minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
                break;
            default:
                if (t.minutes == 0 && t.hours == 1) {
                    hoursSpan.innerHTML = "";
                    minutesSpan.innerHTML = "60";
                } else {
                    hoursSpan.innerHTML = t.hours + "h";
                    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
                }

        }

        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }

    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
}

//const deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);

setValues();
setInterval(updateCurrentTime, 1000);




