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
  button.classList.add(".flash");
  setTimeout(() => button.classList.remove(".flash"), 200);
}

function resetOperatorHighlight() {
  operators.forEach((operator) => operator.classList.remove("operator-active"));
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

operands.forEach((operand) =>
  operand.addEventListener("click", () => {
    handleOperandClick(operand.textContent);
  })
);

operands.forEach((operand) =>
  operand.addEventListener("click", () => {
    operand.classList.add("flash");
    setTimeout(() => operand.classList.remove("flash"), 200);
  })
);

decimal.addEventListener("click", () => {
  if (!display.textContent.includes("."))
    display.textContent += decimal.textContent;
});

operators.forEach((operat) =>
  operat.addEventListener("click", function () {
    operand1 = parseFloat(display.textContent);
    operator = this.textContent;
    operat.classList.add("operator-active");
    reset = true;
  })
);

equals.addEventListener("click", function () {
  operand2 = parseFloat(display.textContent);
  operate(operand1, operand2);
  equals.style.backgroundColor = "rgb(107, 107, 255)";
  setTimeout(() => (equals.style.backgroundColor = ""), 200);
  reset = true;
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

clear.addEventListener("click", resetCalculator);
