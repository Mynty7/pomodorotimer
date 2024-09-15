let minutesDisplay = document.getElementById('minutes');
let secondsDisplay = document.getElementById('seconds');
let startButton = document.getElementById('start');
let pauseButton = document.getElementById('pause');
let resetButton = document.getElementById('reset');

let workMinutes = 25;
let breakMinutes = 5; // Default short break
let longBreakMinutes = 10;
let seconds = 0;
let countdown;
let isPaused = false;
let currentMode = 'work'; // Modes: work, shortBreak, longBreak

function startTimer() {
  if (!countdown || isPaused) {
    countdown = setInterval(timer, 1000);
    isPaused = false;
  }
}

function timer() {
  if (seconds === 0) {
    if (workMinutes === 0 && currentMode === 'work') {
      clearInterval(countdown);
      transitionToBreak();
      return;
    } else if (breakMinutes === 0 && currentMode === 'shortBreak') {
      clearInterval(countdown);
      alert('Short break over! Time to work.');
      resetWork();
      return;
    } else if (longBreakMinutes === 0 && currentMode === 'longBreak') {
      clearInterval(countdown);
      alert('Long break over! Time to work.');
      resetWork();
      return;
    }
    if (currentMode === 'work') {
      workMinutes--;
      seconds = 59;
    } else if (currentMode === 'shortBreak' || currentMode === 'longBreak') {
      breakMinutes--;
      seconds = 59;
    }
  } else {
    seconds--;
  }

  if (currentMode === 'work') {
    minutesDisplay.textContent = workMinutes < 10 ? '0' + workMinutes : workMinutes;
  } else {
    minutesDisplay.textContent = breakMinutes < 10 ? '0' + breakMinutes : breakMinutes;
  }
  secondsDisplay.textContent = seconds < 10 ? '0' + seconds : seconds;
  
  // Update the progress bar
  updateProgressBar();
}

function pauseTimer() {
  clearInterval(countdown);
  isPaused = true;
}

function resetTimer() {
  clearInterval(countdown);
  resetWork();
  countdown = null; // Reset countdown
  isPaused = false;
}

function resetWork() {
  workMinutes = 25;
  breakMinutes = 5; // Reset to default break
  seconds = 0;
  minutesDisplay.textContent = '25';
  secondsDisplay.textContent = '00';
  currentMode = 'work';
  document.querySelector('.progress').style.width = '0%'; // Reset progress bar
}

function transitionToBreak() {
  alert('Work session completed! Time for a break.');
  currentMode = 'shortBreak'; // Transition to short break by default
  breakMinutes = 5; // Default to 5 min break
  seconds = 0;
  minutesDisplay.textContent = '05';
  countdown = null;
  startTimer(); // Auto-start the break
}

function updateProgressBar() {
  let totalTime, timePassed;
  if (currentMode === 'work') {
    totalTime = 25 * 60; // 25 minutes in seconds
    timePassed = (25 - workMinutes) * 60 + (60 - seconds);
  } else if (currentMode === 'shortBreak') {
    totalTime = 5 * 60; // 5 minutes in seconds
    timePassed = (5 - breakMinutes) * 60 + (60 - seconds);
  } else if (currentMode === 'longBreak') {
    totalTime = 10 * 60; // 10 minutes in seconds
    timePassed = (10 - breakMinutes) * 60 + (60 - seconds);
  }

  let progressPercentage = (timePassed / totalTime) * 100;
  document.querySelector('.progress').style.width = progressPercentage + '%';
}

// Event listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);