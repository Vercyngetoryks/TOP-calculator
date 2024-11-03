"use strict";

const display = document.querySelector(".display-content");
const clear = document.querySelector(".clear");
const operands = document.querySelectorAll(".operand");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const sign = document.querySelector(".sign");
const percent = document.querySelector(".percent");
const decimal = document.querySelector(".decimal");
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

function operate(a, b) {
  if (operator == "+") display.textContent = a + b;
  else if (operator == "-") display.textContent = a - b;
  else if (operator == "*") display.textContent = a * b;
  else if (operator == "/") {
    if (operand1 === 0 || operand2 === 0) display.textContent = "ERROR";
    else display.textContent = a / b;
  }
}

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

operands.forEach((operand) =>
  operand.addEventListener("click", () => {
    operand.classList.add("flash");
    setTimeout(() => operand.classList.remove("flash"), 200);
    operators.forEach((operator) =>
      operator.classList.remove("operator-active")
    );
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
  reset = true;
});

sign.addEventListener("click", function () {
  display.textContent = -parseFloat(display.textContent);
});

percent.addEventListener("click", () => {
  display.textContent = parseFloat(display.textContent) / 100;
});
