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

function resetCalculator() {
  operand1 = 0;
  operand2 = 0;
  operator = "";
  display.textContent = 0;
  reset = false;
}

function operate(a, b) {
  if (operator === "+") display.textContent = a + b;
  else if (operator === "-") display.textContent = a - b;
  else if (operator === "*") display.textContent = a * b;
  else if (operator === "/") {
    display.textContent = b === 0 ? "ERROR" : a / b;
  }
}

function addFlashEffect(button) {
  button.classList.add("flash");
  setTimeout(() => button.classList.remove("flash"), 200);
}

function resetOperatorHighlight() {
  operators.forEach((operator) => operator.classList.remove("operator-active"));
}

function setOperatorHighlight(value) {
  resetOperatorHighlight();
  const currentOperator = document.querySelector(
    `.operator[data-key="${value}"]`
  );
  if (currentOperator) currentOperator.classList.add("operator-active");
}

function handleOperandClick(value) {
  if (reset) {
    display.textContent = "";
    reset = false;
  }
  display.textContent =
    display.textContent === "0"
      ? value.trim()
      : display.textContent + value.trim();
  resetOperatorHighlight();
}

function handleOperatorClick(value) {
  operand1 = parseFloat(display.textContent);
  operator = value;
  reset = true;
  setOperatorHighlight(value);
}

function handleDecimalClick() {
  if (!display.textContent.includes(".")) {
    display.textContent += decimal.textContent;
    addFlashEffect(decimal);
  }
}

function handleEqualsClick() {
  operand2 = parseFloat(display.textContent);
  operate(operand1, operand2);
  reset = true;
  addFlashEffect(equals);
}

function handleSignClick() {
  display.textContent = -parseFloat(display.textContent);
}

function handlePercentClick() {
  display.textContent = parseFloat(display.textContent) / 100;
}

function handleDeleteClick() {
  display.textContent =
    display.textContent.length === 1 ? "0" : display.textContent.slice(0, -1);
}

operands.forEach((operand) =>
  operand.addEventListener("click", () => {
    handleOperandClick(operand.textContent);
    addFlashEffect(operand);
  })
);

operators.forEach((operator) =>
  operator.addEventListener("click", () => {
    handleOperatorClick(operator.textContent);
  })
);

decimal.addEventListener("click", handleDecimalClick);

equals.addEventListener("click", handleEqualsClick);

sign.addEventListener("click", handleSignClick);

percent.addEventListener("click", handlePercentClick);

del.addEventListener("click", handleDeleteClick);

clear.addEventListener("click", resetCalculator);

document.addEventListener("keydown", (e) => {
  const key = e.key;
});
