let startTime;
let elapsedTime = 0;
let timerInterval;
let laps = [];
let lapCount = 1;

const display = document.querySelector(".display");
const startBtn = document.querySelector(".start");
const pauseBtn = document.querySelector(".pause");
const resetBtn = document.querySelector(".reset");
const lapBtn = document.querySelector(".lap");
const lapsContainer = document.querySelector(".laps_class");

function displayTime(time) {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);
  display.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}:${milliseconds < 10 ? "0" : ""}${milliseconds}`;
}

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    displayTime(elapsedTime);
  }, 10);
}

function pauseTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  displayTime(elapsedTime);
  laps = [];
  lapCount = 1;
  updateLaps();
}

function lapTimer() {
  laps.push(elapsedTime);
  updateLaps();
  lapCount++;
}

function updateLaps() {
  lapsContainer.innerHTML = "";
  laps.forEach((lapTime, index) => {
    const lapItem = document.createElement("li");
    lapItem.classList.add("lap-item");
    lapItem.textContent = `Lap ${index + 1}: ${formatTime(lapTime)}`;
    lapsContainer.appendChild(lapItem);
  });
}

function formatTime(time) {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);
  return `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}:${milliseconds < 10 ? "0" : ""}${milliseconds}`;
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", lapTimer);
