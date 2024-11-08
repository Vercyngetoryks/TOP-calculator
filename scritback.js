"use strict";

const display = document.querySelector(".display-content");
const clear = document.querySelector(".clear");
const operands = document.querySelectorAll(".operand");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const sign = document.querySelector(".sign");
const percent = document.querySelector(".percent");
const decimal = document.querySelector(".decimal");
const del = document.querySelector(".delete");
let operand1 = 0;
let operand2 = 0;
let operator;
let reset = false;

clear.addEventListener("click", resetCalculator);
function resetCalculator() {
  operand1 = 0;
  operand2 = 0;
  operator = "";
  display.textContent = 0;
  reset = false;
}

function operate(a, b) {
  if (operator == "+") {
    display.textContent = a + b;
    console.log(a + b);
  } else if (operator == "-") display.textContent = a - b;
  else if (operator == "*") display.textContent = a * b;
  else if (operator == "/") {
    display.textContent = b === 0 ? "ERROR" : a / b;
  }
}

function resetOperatorHighlight() {
  operators.forEach((operator) => operator.classList.remove("operator-active"));
}

function addFlashEffect(button) {
  button.classList.add("flash");
  setTimeout(() => button.classList.remove("flash"), 300);
}

function setOperatorHighlight(value) {
  resetOperatorHighlight();
  const button = document.querySelector(`.operator[data-key="${value}"]`);
  if (button) button.classList.add("operator-active");
}

function handleOperandClick(value) {
  if (reset) {
    display.textContent = value;
    reset = false;
  } else {
    display.textContent =
      display.textContent === "0"
        ? (display.textContent = value)
        : display.textContent + value;
  }
  resetOperatorHighlight();
}

function handleOperatorClick(value) {
  operand1 = parseFloat(display.textContent);
  operator = value;
  reset = true;
  setOperatorHighlight(value);
}

function handleEqualsClick() {
  operand2 = parseFloat(display.textContent);
  operate(operand1, operand2);
  addFlashEffect(equals);
  reset = true;
}

operands.forEach((operand) =>
  operand.addEventListener("click", () => {
    handleOperandClick(operand.textContent);
    addFlashEffect(operand);
  })
);

decimal.addEventListener("click", () => {
  if (!display.textContent.includes("."))
    display.textContent += decimal.textContent;
});

operators.forEach((operat) =>
  operat.addEventListener("click", () => {
    handleOperatorClick(operat.textContent);
  })
);

equals.addEventListener("click", function () {
  handleEqualsClick();
});

sign.addEventListener("click", function () {
  display.textContent = -parseFloat(display.textContent);
});

percent.addEventListener("click", () => {
  display.textContent = parseFloat(display.textContent) / 100;
});

del.addEventListener("click", () => {
  display.textContent =
    display.textContent.length === 1 ? "0" : display.textContent.slice(0, -1);
});

document.addEventListener("keydown", (e) => {
  const key = e.key;
  const operandButton = document.querySelector(`.operand[data-key="${key}"]`);
  const operatorButton = document.querySelector(`.operator[data-key="${key}"]`);

  if (operandButton) {
    handleOperandClick(key);
    addFlashEffect(operandButton);
  } else if (operatorButton) {
    handleOperatorClick(key);
  } else if (key === "Enter") handleEqualsClick();
});
