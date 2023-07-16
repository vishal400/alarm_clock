// get select hour element
const selectHour = document.getElementById("hour");
// get select minute element
const selectMinute = document.getElementById("minute");
// get am/pm element
const selectAmPm = document.getElementById("ampm");
// get set alarm button element
const setBtn = document.getElementById("set alarm");
// get alarm list
const alarmListElement = document.getElementById("alarms-list");
// get heading element for current time
const currTime = document.getElementById("time");
// get content element
const content = document.querySelector(".content");
// get select ringtone element
const selectRingtone = document.getElementById("ringtone");

// declare alarm variables and ringtone
var listOfAlarms = [];
var currentAlarm;
var playing = false;
var ringtone = new Audio("./assets/default_iphone_alarm.mp3");
var ringtoneTest = new Audio("./assets/default_iphone_alarm.mp3");

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

    // update current time
    currTime.innerText = `${hour}:${minute}:${second} ${ampm}`;

    //get current time
    let currentTime = String(currTime.innerText);
    currentTime =
        currentTime.substring(0, currentTime.lastIndexOf(":")) +
        currentTime.substring(currentTime.lastIndexOf(" "));

    if (listOfAlarms.includes(currentTime)) {
        // if ringtone is not playing, play ringtone
        currentAlarm = currentTime;
        if (playing == false) {
            ringtone.play();
            playing = true;
            ringtone.loop = true;
        }
    }else{
        console.log("pausing");
        ringtone.pause();
        playing = false;
    }
}, 1000);

// stop alarm
function clearAllAlarm(){
        playing = false;
        ringtone.pause();
        listOfAlarms = [];
        alarmListElement.innerHTML = "";
}

// event listener for setting and removing alarm
setBtn.addEventListener("click", () => {
    // check whether user has entered all values
    let time =
        selectHour.value + ":" + selectMinute.value + " " + selectAmPm.value;
    if (
        time.includes("HOUR") ||
        time.includes("MINUTE") ||
        time.includes("AM/PM")
    ) {
        return alert("Please enter valid time!");
    }

    // add alarm to the list of alarms
    if (!listOfAlarms.includes(time)) {
        listOfAlarms.push(time);
        let newItem = document.createElement("li");
        newItem.innerHTML = `<div class="alarm-li-item">
                                    <h4>${time}</h4>
                                    <i
                                    class="fa fa-times-circle-o fa-lg"
                                    aria-hidden="true"
                                    onclick="removeAlarm(this)"></i>
                            </div>`;
        alarmListElement.appendChild(newItem);
    }
});

//remove alarm
function removeAlarm(item) {
    let listItem = item.parentNode.parentNode;
    let timeToRemove = item.parentNode.children[0].innerText;
    alarmListElement.removeChild(listItem);
    listOfAlarms.splice(listOfAlarms.lastIndexOf(timeToRemove), 1);
    console.log(listOfAlarms);
}

//play ringtone, this function handles playing and pausing the ringtone when user clicks on play button
function playRingtone(){
    if(ringtoneTest.paused){
        ringtoneTest.play();
    }else{
        ringtoneTest.pause();
    }
}

//set ringtone
function setRingtone(){
    ringtoneTest.pause();
    ringtone.pause();
    ringtone = new Audio(`./assets/${selectRingtone.value}.mp3`);
    ringtoneTest = new Audio(`./assets/${selectRingtone.value}.mp3`);
    console.log("setting");
}
