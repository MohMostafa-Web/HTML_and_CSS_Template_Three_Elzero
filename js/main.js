/** Create Counter Timing Down */
const daysField = document.querySelector(".events .timer .day");
const hoursField = document.querySelector(".events .timer .hour");
const minutesField = document.querySelector(".events .timer .minute");
const secondsField = document.querySelector(".events .timer .second");

// Get Future Date in ms
let countDownDate = new Date ("Dec 31, 2021 23:59:59").getTime();

function downCounter() {
  // Get Date Now in ms
  let dateNow = new Date ().getTime();

  // Get differential Time in ms
  let diffTime = countDownDate - dateNow;

  // Convert differential Time (ms) to "Days | Hours | Seconds"
  // Days
  let daysCounter = parseInt(diffTime / 1000 / 60 / 60 / 24);
  daysField.innerHTML = daysCounter < 10 ? `0${daysCounter}` : daysCounter;

  // Hours (Remainder of Days)
  let hoursCounter = parseInt(diffTime / 1000 / 60 / 60 % 24);
  hoursField.innerHTML = hoursCounter < 10 ? `0${hoursCounter}` : hoursCounter;

  // Minutes (Remainder of Hours)
  let minutesCounter = parseInt(diffTime / 1000 / 60 % 60);
  minutesField.innerHTML = minutesCounter < 10 ? `0${minutesCounter}` : minutesCounter;

  // Seconds (Remainder of Minutes)
  let secondsCounter = parseInt(diffTime / 1000 % 60);
  secondsField.innerHTML = secondsCounter < 10 ? `0${secondsCounter}` : secondsCounter;

  // Stop Counter when differential time is less than or equal zero
  if (diffTime <= 0) {
    clearInterval(counterInterval);
    // In Case, user reloads the page, show him Zeros
    daysField.innerHTML = "00";
    hoursField.innerHTML = "00";
    minutesField.innerHTML = "00";
    secondsField.innerHTML = "00";
  }
}

// Run Function downCounter every 0.5s to update counter
const counterInterval = setInterval(downCounter, 500);




const skillsSection = document.querySelector(".skills");
const progSpans = document.querySelectorAll(".skills .progress");
const statsSection = document.querySelector(".stats");
const nums = document.querySelectorAll(".stats .number");

window.onscroll = function () {
  /** Create Animated Width on Scrolling */
  if (skillsSection.getBoundingClientRect().top <= 10) { // Check if this section is in viewport
    progSpans.forEach(span => {
      span.style.width = span.dataset.percentage; // get width of span from its data-percentage
    });
  } else {
    progSpans.forEach(span => {
      span.style.width = 0; // reset width with zero
    });
  }

  /** Increase Numbers on Scrolling */
  if (window.scrollY > statsSection.offsetTop - 10) { // Check if this section reached viewport
    // Loop over nums to make counting
    nums.forEach(num => {
      let storage = 0;
      // Calculate count one step in Precentage Scale depends on value of data-goal
      let calc = Math.floor(num.dataset.goal / 100);
      let step = calc > 0 ? calc : 1; // if step <= 0, set 1
      if (num.innerHTML == 0) { // Do it once time if counters are zero
        // For every num, Add interval Time for every step counting
        const counter = setInterval(() => {
          storage += step;
          num.innerHTML = storage;
          if (storage >= num.dataset.goal) {
            clearInterval(counter);
          }
        }, 10);
      }
    });
  }
};
