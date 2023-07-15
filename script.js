// get select hour element
const selectHour = document.getElementById("hour");
// get select minute element
const selectMinute = document.getElementById("minute");
// get am/pm element
const selectAmPm = document.getElementById("ampm");
// get set alarm button element
const setBtn = document.querySelector("button");
// get heading element for current time
const currTime = document.getElementById("time");
// get content element
const content = document.querySelector(".content");

// declare alarm variables and ringtone
var playing = false;
var alarmTime;
var isAlarmSet;
var ringtone = new Audio("./assets/default_iphone_alarm.mp3");

// populate hours for select hour options
for (let i = 1; i <= 12; i++) {
    let hr = i < 10 ? "0" + i : i;
    let option = "<option value=" + hr + ">" + hr + "</option>";
    selectHour.lastElementChild.insertAdjacentHTML("afterend", option);
}

// populate minutes for select minute options
for (let i = 0; i < 60; i++) {
    let minute = i < 10 ? "0" + i : i;
    let option = "<option value=" + minute + ">" + minute + "</option>";
    selectMinute.lastElementChild.insertAdjacentHTML("afterend", option);
}

// interval for current time, function will run every second and update time inside current time heading tag
setInterval(() => {
    // create date object
    let date = new Date();
    // get current hour
    let hour = date.getHours();
    // get current minute
    let minute = date.getMinutes();
    // get current second
    let second = date.getSeconds();
    // declare and initialize ampm variable
    let ampm = "AM";

    // hour is in 24 hour formate, so changing it into ampm is required
    if (hour >= 12) {
        ampm = "PM";
        hour = hour - 12;
    }

    // handle when hour is 0, it should be 12
    if (hour == 0) hour = 12;

    // if single digit then add 0 in front of digit
    if (hour < 10) hour = "0" + hour;
    if (minute < 10) minute = "0" + minute;
    if (second < 10) second = "0" + second;

    currTime.innerText = `${hour}:${minute}:${second} ${ampm}`;

    //get current time
    let currentTime = String(currTime.innerText);
    currentTime =
        currentTime.substring(0, currentTime.lastIndexOf(":")) +
        currentTime.substring(currentTime.lastIndexOf(" "));
    
    if (alarmTime == currentTime) {
        // if ringtone is not playing, play ringtone
        if (playing == false) {
            ringtone.play();
            console.log("play");
            playing = true;
            ringtone.loop = true;
        }
    }
}, 1000);

// event listener for setting and removing alarm
setBtn.addEventListener("click", () => {
    // if alarm is already set then pause the ringtone and clear alarm
    if (isAlarmSet) {
        playing = false;
        alarmTime = "";
        ringtone.pause();
        setBtn.innerText = "Set Alarm";
        // remove disable class from from content (hour, minute, ampm)
        content.classList.remove("disable");
        isAlarmSet = false;
        return isAlarmSet;
    }

    // if alarm is not set then set it

    // check whether user has entered all values
    let time = selectHour.value + ":" + selectMinute.value + " " + selectAmPm.value;
    if (
        time.includes("HOUR") ||
        time.includes("MINUTE") ||
        time.includes("AM/PM")
    ) {
        return alert("Please enter valid time!");
    }
    isAlarmSet = true;
    alarmTime = time;
    setBtn.innerText = "Clear Alarm";
    // add disable class to the content so that it is not modifiable
    content.classList.add("disable");
});
