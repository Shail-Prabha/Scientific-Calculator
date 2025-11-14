const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');
const modeSwitch = document.getElementById('modeSwitch');
const toggleSci = document.getElementById('toggleSci');
const toggleHistory = document.getElementById('toggleHistory');
const sciButtons = document.querySelector('.scientific');
const historyBox = document.getElementById('historyBox');
const historyList = document.getElementById('historyList');
const body = document.body;

let history = [];

// Button click handling
buttons.forEach(btn => {
  btn.addEventListener('click', () => handleInput(btn.textContent));
});

// Keyboard input
document.addEventListener('keydown', e => {
  if ((e.key >= '0' && e.key <= '9') || ['+', '-', '*', '/', '.', '(', ')'].includes(e.key)) {
    display.value += e.key;
  } else if (e.key === 'Enter') {
    calculate();
  } else if (e.key === 'Backspace') {
    display.value = display.value.slice(0, -1);
  } else if (e.key.toLowerCase() === 'c') {
    display.value = '';
  }
});

function handleInput(value) {
  if (value === 'C') {
    display.value = '';
  } else if (value === '←') {
    display.value = display.value.slice(0, -1);
  } else if (value === '=') {
    calculate();
  } else {
    display.value += value;
  }
}

function calculate() {
  try {
    let expression = display.value
      .replace(/√/g, 'Math.sqrt')
      .replace(/sin/g, 'Math.sin')
      .replace(/cos/g, 'Math.cos')
      .replace(/tan/g, 'Math.tan')
      .replace(/\^/g, '**');

    let result = eval(expression);
    if (result !== undefined) {
      history.unshift(`${display.value} = ${result}`);
      updateHistory();
      display.value = result;
    }
  } catch {
    display.value = 'Error';
  }
}

function updateHistory() {
  historyList.innerHTML = history.map(item => `<li>${item}</li>`).join('');
}

// Toggle scientific mode
toggleSci.addEventListener('click', () => {
  sciButtons.classList.toggle('hidden');
});

// Toggle history
toggleHistory.addEventListener('click', () => {
  historyBox.classList.toggle('hidden');
});

// Dark/Light mode
modeSwitch.addEventListener('change', () => {
  body.classList.toggle('light-mode');
});
