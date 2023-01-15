var date = new Date();
var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();
var hour = date.getHours();
var minute = date.getMinutes();
var second = date.getSeconds();
var deadline
var initial = 0;
var i = 0;

day = day < 10 ? "0" + day : day;
month = month < 10 ? "0" + month : month;
year = year < 10 ? "0" + year : year;

hour = hour < 10 ? "0" + hour : hour;
minute = minute < 10 ? "0" + minute : minute;
second = second < 10 ? "0" + second : second;

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

            if (hour == '00') {
                hour = '0';
            }
            displayTime = (hour + 2) + ":00";
            displayDate = year + "-" + month + "-" + day;

    }

    //hier wird dem Element die Voreinstellung übergeben
    document.getElementById("endTime").value = displayTime;
    // console.log("displayTime: " + displayTime);
    document.getElementById("endDate").value = displayDate;


    document.getElementById("progressbar").style.display = "none";

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
    document.getElementById("progressbar").style.display = "block";


    return false;
}

function getTimeRemaining(endtime) {

    //console.log(endtime);



    var total = Date.parse(endtime) - Date.parse(new Date());
    //offset für die letzte minute 
    //console.log(total);

    i = i + 1;
    //console.log("I:" + i);
    if (i <= 1) {
        initial = total;
        // console.log("initial:" + initial);
    }
    total = total + 60000;
    var hours = Math.floor((total / 3600000));
    //console.log(hours);
    var minutes = Math.floor(((total) / 1000 / 60) % 60);
    //console.log(minutes);



    return {
        total,
        hours,
        minutes,
        initial
    };
}

function initializeClock(id, endtime) {

    //für den fall, dass eine neue deadline gewählt wird
    if (endtime != deadline) {
        i = 0;
        //console.log("NEUNEUNEUNEU");
        return;
    }

    const clock = document.getElementById(id);
    const hoursSpan = clock.querySelector('.hours');
    const minutesSpan = clock.querySelector('.minutes');


    function updateClock() {

        if (endtime != deadline) {
            i = 0;
            clearInterval(timeinterval);
            return;
        }

        var t = getTimeRemaining(endtime);

        //update progresbar 
        // var progressPercent = 100 - ((((t.total - 60000) / (initial)) * 100)) + "%";

        // die schon vergangene zeti /  zeit die vergehen muss 
        //  console.log("t.total:   " + (t.total));
        // console.log("initial:   " + initial);
        var progressPercent = (initial - t.total + 60000);
        //console.log("diff:  " + progressPercent);
        progressPercent = (progressPercent / initial) * 100;

        // console.log("initial: " + initial);
        // console.log("t.total" + t.total);
        //  console.log("%: " + progressPercent);
        if (progressPercent <= 25) {
            document.getElementById("progressbar").style.background = "linear-gradient(90deg, rgba(0,128,0,1) 0%, rgba(117,186,0,1) 100%";

        } else if (progressPercent <= 50) {
            document.getElementById("progressbar").style.background = "linear-gradient(90deg, rgba(0,128,0,1) 0%, rgba(117,186,0,1) 50%, rgba(255,255,0,1) 100%)";

        } else if (progressPercent <= 75) {
            document.getElementById("progressbar").style.background = "linear-gradient(90deg, rgba(0,128,0,1) 0%, rgba(117,186,0,1) 33%, rgba(255,255,0,1) 66%, rgba(255,143,0,1) 100%)";

        } else {
            document.getElementById("progressbar").style.background = "linear-gradient(90deg, rgba(0,128,0,1) 0%, rgba(117,186,0,1) 25%, rgba(255,255,0,1) 50%, rgba(255,143,0,1) 75%, rgba(255,0,0,1) 100%)";
        }

        progressPercent = progressPercent.toFixed(0) + "%";
        document.getElementById("percent").innerHTML = progressPercent;
        document.getElementById("progressbar").style.width = progressPercent;


        //für den Übergang zwischen: Stunde > 0 und Stunde < 0 
        switch (t.hours) {
            case 0: //wenn Stunde < 0, dann wird sie nicht angezeigt und die Minuten ohne führende 0
                hoursSpan.innerHTML = "noch";
                minutesSpan.innerHTML = t.minutes + "min";
                //console.log(t.total);
                break;
            default:
                //wenn Stunde = 0 und die Minuten gleich 0 dann wird nur 60min angezeigt 
                if (t.minutes == 0 && t.hours == 1) {
                    hoursSpan.innerHTML = "noch";
                    minutesSpan.innerHTML = "60min";
                } else {
                    //wenn Stunde > 0 
                    hoursSpan.innerHTML = "noch " + t.hours + "h";
                    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2) + "min";
                }

        }

        if (t.total <= 60000) {
            hoursSpan.innerHTML = '';
            minutesSpan.innerHTML = 'Zeit abgelaufen';
            i = 0;
            clearInterval(timeinterval);
            return;

        }
    }

    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
}



setValues();
setInterval(updateCurrentTime, 1000);



//topbar
function menuToggle() {
    var nav = document.getElementById("nav")
    var toggle = document.getElementById("toggle")
    nav.classList.toggle("active")
    toggle.classList.toggle("active")
}

//progressbar

