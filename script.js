"use strict";

const display = document.querySelector(".display-content");
const clear = document.querySelector(".clear");
const operands = document.querySelectorAll(".operand");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
let operand1 = 0;
let operand2 = 0;
let operator;
let reset = false;

clear.addEventListener("click", function () {
  operand1 = 0;
  operand2 = 0;
  operator = "";
  display.textContent = 0;
  reset = false;
});

operands.forEach((operand) =>
  operand.addEventListener("click", function () {
    if (reset) {
      display.textContent = "";
      reset = false;
    }
    if (display.textContent === "0") {
      display.textContent = this.textContent;
    } else display.textContent += this.textContent;
  })
);

function operate(a, b) {
  if (operator == "+") display.textContent = a + b;
  else if (operator == "-") display.textContent = a - b;
  else if (operator == "*") display.textContent = a * b;
  else display.textContent = a / b;
}

operators.forEach((operat) =>
  operat.addEventListener("click", function () {
    operand1 = Number(display.textContent);
    operator = this.textContent;
    reset = true;
  })
);

equals.addEventListener("click", function () {
  operand2 = Number(display.textContent);
  operate(operand1, operand2);
  reset = true;
});
