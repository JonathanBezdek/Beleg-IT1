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

//diese Funktion zeigt die aktuelle Zeit
function updateCurrentTime() {
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;

    let current_time = hour + " : " + minute + " : " + second;
    document.getElementById("currentTime").innerHTML = current_time;
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
    //ab 00:00 beginnt der nächste Tag zu dem kann man nicht einfach inkrementieren da die Uhrzeit geresettet wird
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

    //hier wird dem Element die Voreinstellung übergeben
    document.getElementById("endTime").value = displayTime;
    document.getElementById("endDate").value = displayDate;

}

//diese Funktion wird getriggeret wenn die Form submittet wird 
function checkForm() {

    let endDate = document.getElementById('endDate').value;
    //console.log(endDate);
    let endTime = document.getElementById('endTime').value;
    //console.log(endTime);

    //Konvertierung in ein ISO Datum (YYYY-MM-DDTHH:MM:SSZ)
    let endFormat = endDate + "T" + endTime + "Z";

    //die deadline wird initizialisiert und in die richtige Zeitzone umgerechnet 
    deadline = new Date(endFormat);
    deadline.setTime(deadline.getTime() + deadline.getTimezoneOffset() * 60 * 1000);
    let countdownEndTime = "Ende: " + endTime;
    document.getElementById("countdownEndTime").innerHTML = countdownEndTime;
    initializeClock('clockdiv', deadline);
    return false;
}

function getTimeRemaining(endtime) {

    console.log(endtime);

    var total = Date.parse(endtime) - Date.parse(new Date());
    total = total + 60000; //offset für die letzte minute 
    //console.log(total);

    var hours = Math.floor((total / 3600000));
    //console.log(hours);
    var minutes = Math.floor(((total) / 1000 / 60) % 60);
    //console.log(minutes);
    return {
        total,
        hours,
        minutes
    };
}

function initializeClock(id, endtime) {
    //für den fall, dass eine neue deadline gewählt wird
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

        //für den Übergang zwischen: Stunde > 0 und Stunde < 0 
        switch (t.hours) {
            case 0: //wenn Stunde < 0, dann wird sie nicht angezeigt 
                hoursSpan.innerHTML = "";
                minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
                break;
            default:
                //wenn Stunde = 0 und die Minuten gleich 0 dann wird nur 60min angezeigt 
                if (t.minutes == 0 && t.hours == 1) {
                    hoursSpan.innerHTML = "";
                    minutesSpan.innerHTML = "60";
                } else {
                    //wenn Stunde > 0 
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



setValues();
setInterval(updateCurrentTime, 1000);



//sidebar
function menuToggle() {
    var nav = document.getElementById("nav")
    var toggle = document.getElementById("toggle")
    nav.classList.toggle("active")
    toggle.classList.toggle("active")
}

