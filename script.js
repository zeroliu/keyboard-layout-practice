const commandEl = document.querySelector('.command');
const minusBtn = document.querySelector('.minus');
const plusBtn = document.querySelector('.plus');
const timeoutEl = document.querySelector('.timeout');
const progressBarEl = document.querySelector('.progress-bar');

const notes = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const hands = ['LEFT', 'RIGHT'];
const fingers = ['1', '2', '3', '4', '5'];

let timeoutSec = 2;
let intervalId = -1;
let startTime = -1;

function updateTimeout(offset) {
  const next = timeoutSec + offset;
  timeoutSec = Math.min(Math.max(1, next), 9);
  timeoutEl.textContent = `${timeoutSec} sec`;
  restartCommand();
}

function restartCommand() {
  clearInterval(intervalId);
  showCommand();
  intervalId = setInterval(() => {
    showCommand();
  }, timeoutSec * 1000);
}

function renderCommand(note, hand, finger) {
  commandEl.innerHTML = `
    Play <b class="note">${note}</b> with <b class="hand">${hand}</b> hand finger <b class="finger">${finger}</b>
  `;
}

function pick(list) {
  const index = Math.floor(Math.random(list.length) * list.length);
  return list[index];
}

function renderProgressBar() {
  if (startTime === -1) {
    return;
  }
  const diff = Math.max(
    Math.min(timeoutSec * 1000, performance.now() - startTime),
    0,
  );
  const percent = 1 - diff / (timeoutSec * 1000);
  progressBarEl.style.width = `${percent * 100}%`;
}

function animateProgressBar() {
  requestAnimationFrame(() => {
    renderProgressBar();
    animateProgressBar();
  });
}

function showCommand() {
  const note = pick(notes);
  renderCommand(note, pick(hands), pick(fingers));
  const audio = document.querySelector(`audio[data-key="${note}"]`);
  audio.currentTime = 0;
  audio.play();
  startTime = performance.now();
}

function run() {
  restartCommand();
  animateProgressBar();
}

minusBtn.addEventListener('click', () => updateTimeout(-1));
plusBtn.addEventListener('click', () => updateTimeout(1));

run();
