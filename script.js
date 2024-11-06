"use strict";

const display = document.querySelector(".display-content");
const clear = document.querySelector(".clear");
const operands = document.querySelectorAll(".operand");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const sign = document.querySelector(".sign");
const percent = document.querySelector(".percent");
const decimal = document.querySelector(".decimal");
const del = document.querySelector(".bckspace");
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
  let result;

  if (operator === "+") result = a + b;
  else if (operator === "-") result = a - b;
  else if (operator === "*") result = a * b;
  else if (operator === "/") {
    result = b === 0 ? "ERROR" : a / b;
  }

  if (typeof result === "number" && !isNaN(result)) {
    result = parseFloat(result.toFixed(4));
  }

  display.textContent = result;
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
  if (display.textContent.length >= 9) return;
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
  if (display.textContent.length >= 9) return;
  if (!display.textContent.includes(".")) {
    display.textContent += decimal.textContent;
    addFlashEffect(decimal);
  }
}

function handleEqualsClick() {
  if (display.textContent === "0") return;
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
    operand.blur();
  })
);

operators.forEach((operator) =>
  operator.addEventListener("click", () => {
    handleOperatorClick(operator.textContent);
    operator.blur();
  })
);

decimal.addEventListener("click", () => {
  handleDecimalClick();
  decimal.blur();
});

equals.addEventListener("click", () => {
  handleEqualsClick();
  equals.blur();
});

sign.addEventListener("click", () => {
  handleSignClick();
  sign.blur();
});

percent.addEventListener("click", () => {
  handlePercentClick();
  percent.blur();
});

del.addEventListener("click", () => {
  handleDeleteClick();
  del.blur();
});

clear.addEventListener("click", () => {
  resetCalculator();
  clear.blur();
});

document.addEventListener("keydown", (e) => {
  const key = e.key;
  const operandButton = document.querySelector(`.operand[data-key="${key}"]`);
  const operatorButton = document.querySelector(`.operator[data-key="${key}"]`);
  const equalsButton = document.querySelector(`.equals[data-key="${key}"]`);
  const resetButton = document.querySelector(`.clear[data-key="${key}"]`);
  const deleteButton = document.querySelector(`.bckspace[data-key="${key}"]`);
  const signButton = document.querySelector(`.sign[data-key="${key}"]`);
  const percentButton = document.querySelector(`.percent[data-key="${key}"]`);
  const decimalButton = document.querySelector(`.decimal[data-key="${key}"]`);

  if (operandButton) handleOperandClick(operandButton.textContent);
  else if (operatorButton) handleOperatorClick(operatorButton.textContent);
  else if (equalsButton) handleEqualsClick();
  else if (resetButton) resetCalculator();
  else if (deleteButton) handleDeleteClick();
  else if (signButton) handleSignClick();
  else if (percentButton) handlePercentClick();
  else if (decimalButton) handleDecimalClick();
});
