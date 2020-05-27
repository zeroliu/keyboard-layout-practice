const commandEl = document.querySelector('.command');
const minusBtn = document.querySelector('.minus');
const plusBtn = document.querySelector('.plus');
const timeoutEl = document.querySelector('.timeout');

const notes = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const hands = ['LEFT', 'RIGHT'];
const fingers = ['1', '2', '3', '4', '5'];

let timeout = 2;
let intervalId = -1;

function updateTimeout(offset) {
  const next = timeout + offset;
  timeout = Math.min(Math.max(1, next), 9);
  timeoutEl.textContent = `${timeout} sec`;
  restartCommand();
}

function restartCommand() {
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    showCommand();
  }, timeout * 1000);
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

function showCommand() {
  const note = pick(notes);
  renderCommand(note, pick(hands), pick(fingers));
  const audio = document.querySelector(`audio[data-key="${note}"]`);
  audio.currentTime = 0;
  audio.play();
}

function run() {
  restartCommand();

  const context = new AudioContext();
}

minusBtn.addEventListener('click', () => updateTimeout(-1));
plusBtn.addEventListener('click', () => updateTimeout(1));

run();
