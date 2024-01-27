const currentTime = document.querySelector("h1");
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("button");
const content = document.querySelector(".content");

let alarmTime, isAlarmSet = false,
  ringtone = new Audio("./utils/sound.mp3");

//To display list of 12 hours

for (let i = 12; i > 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option)
}

//To display list of 60 minutes and 60 seconds

for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option)
}

//To display list to choose between AM/PM

for (let i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = `<option value="${ampm}">${ampm}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option)
}

setInterval(() => {
  let date = new Date(),
    hour = date.getHours(),
    min = date.getMinutes(),
    sec = date.getSeconds(),
    ampm = "AM";

  if (hour >= 12) {
    hour = hour - 12;
    ampm = "PM";
  }

  //if hour value is zero set this value to 12

  hour = hour == 0 ? hour = 12 : hour;
  // adding zero before hour,min,sec if value is less than 10
  hour = hour < 10 ? "0" + hour : hour;
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;
  currentTime.innerText = `${hour}:${min}:${sec} ${ampm}`;

  if (alarmTime == `${hour}:${min} ${ampm}`) {
    ringtone.play();
    ringtone.loop = true;
    console.log("ringing..")
  }
}, 1000);

function setAlarm() {

  if (isAlarmSet) {
    alarmTime = "";
    ringtone.pause();
    content.classList.remove("disable");
    setAlarmBtn.innerText = "Set Alarm";
    return isAlarmSet = false;
  }


  let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`
  if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
    return alert("please set a valid time to set Alarm!");
  }
  isAlarmSet = true;
  alarmTime = time;
  content.classList.add("disable");
  setAlarmBtn.innerText = "Clear Alarm";

}

setAlarmBtn.addEventListener("click", setAlarm)
