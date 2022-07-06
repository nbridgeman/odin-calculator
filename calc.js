function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  switch(operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      return divide(a, b);
    default:
      return "ERROR";
  }
}

function setText(display, update) {
  display.textContent = update;
  return update;
}

function addText(display, current, add) {
  current += add;
  display.textContent = current;
  return current;
}

function clearText(display) {
  display.textContent = '';
  return '';
}

const display = document.getElementById('display');

const keys = document.querySelectorAll('.num');
current_text = display.textContent;
keys.forEach(key => {
  key.addEventListener('click', () => {
    current_text = addText(display, current_text, key.getAttribute('data-num'));
  });
});

document.getElementById('clear').addEventListener('click', () => {
  current_text = clearText(display);
});

const eq_pattern = /[0-9]+[-+*/][0-9]+/
const op_pattern = /[-+*/]/;
const num_pattern = /[0-9]+/
document.getElementById('=').addEventListener('click', () => {
  while (current_text.search(eq_pattern) != -1) {
    var operator_loc = current_text.search(op_pattern);
    var a = parseInt(current_text.slice(0, operator_loc));
    var op = current_text.slice(operator_loc, operator_loc + 1);
    current_text = current_text.slice(operator_loc + 1);
    if (current_text.search(op_pattern) == -1) {
      var b = parseInt(current_text);
      var sol = operate(op, a, b);
      current_text = sol.toString();
    } else {
      var b = parseInt(current_text.slice(0, current_text.search(op_pattern)));
      var sol = operate(op, a, b);
      current_text = sol.toString() + current_text.slice(current_text.search(op_pattern));
    }
  }
  display.textContent = current_text;
});
