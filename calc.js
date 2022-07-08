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
  return (Math.round((a / b) * 1000) / 1000);
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

const display = document.getElementById('display-text');
var equation = "";
var eq_pressed = false;

const keys = document.querySelectorAll('.num');
current_text = display.textContent;
keys.forEach(key => {
  key.addEventListener('click', () => {
    if (!(((current_text.length * (screen.width * .025)) > (screen.width * .23)))) {
      if (eq_pressed) {
        current_text = setText(display, key.getAttribute('data-num'));
        equation = key.getAttribute('data-num');
        eq_pressed = false;
      } else if (equation.search(/[-+*/]$/) != -1) {
        current_text = setText(display, key.getAttribute('data-num'));
        equation += key.getAttribute('data-num');
      } else {
        current_text = addText(display, current_text, key.getAttribute('data-num'));
        equation += key.getAttribute('data-num');
      }
    }
  });
});

document.getElementById('clear').addEventListener('click', () => {
  current_text = clearText(display);
  equation = "";
});

const eq_pattern = /[0-9]+[-+*/][0-9]+/;
const op_pattern = /[-+*/]/;

const equals = document.getElementById('eq');
equals.addEventListener('click', () => {
  if (equation.search(eq_pattern) != -1) {
    var op_loc = equation.search(op_pattern);
    var op = equation.slice(op_loc, op_loc + 1);
    var a = parseFloat(equation.slice(0, op_loc));
    var b = parseFloat(equation.slice(op_loc + 1));
    equation = operate(op, a, b).toString();
    if ((((equation.length * (screen.width * .025)) > (screen.width * .23)))) {
      equation = (parseInt(equation).toExponential(3)).toString()
    }
    current_text = setText(display, equation);
    eq_pressed = true;
  }
})

const operators = document.querySelectorAll('.op');
operators.forEach(operator => {
  operator.addEventListener('click', () => {
    eq_pressed = false;
    if (equation.search(/[-+*/]$/) != -1) {
      equation = equation.slice(0, -1) + operator.getAttribute('data-op');
    } else if (equation.search(eq_pattern) == -1) {
      equation += operator.getAttribute('data-op');
      current_text = '';
    } else {
      var op_loc = equation.search(op_pattern);
      var op = equation.slice(op_loc, op_loc + 1);
      var a = parseFloat(equation.slice(0, op_loc));
      var b = parseFloat(equation.slice(op_loc + 1));
      equation = operate(op, a, b).toString();
      if ((((equation.length * (screen.width * .025)) > (screen.width * .23)))) {
        equation = (parseInt(equation).toExponential(3)).toString()
      }
      equation += operator.getAttribute('data-op');
      current_text = setText(display, operate(op, a, b));
    }
  });
});
