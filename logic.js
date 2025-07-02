const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const clearButtons = document.querySelectorAll(".clear");

const addButton = document.getElementById("add");
const subtractButton = document.getElementById("subtract");
const multiplyButton = document.getElementById("multiply");
const divideButton = document.getElementById("divide");
const equalsButton = document.getElementById("do");
const sqrtButton = document.getElementById("sqrt");
const exponentButton = document.getElementById("exponent");

let firstNumber = null;
let operator = null;

// Handle number button clicks
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const number = button.textContent;
    if (display.textContent === "0") {
      display.textContent = number + "";
    } else {
      display.textContent += number;
    }
  });
});


// Handle operator buttons
addButton.addEventListener("click", () => {
  firstNumber = parseFloat(display.textContent);
  operator = "+";
  display.textContent = "0";
});

subtractButton.addEventListener("click", () => {
  firstNumber = parseFloat(display.textContent);
  operator = "-";
  display.textContent = "0";
});

multiplyButton.addEventListener("click", () => {
  firstNumber = parseFloat(display.textContent);
  operator = "*";
  display.textContent = "0";
});

divideButton.addEventListener("click", () => {
  firstNumber = parseFloat(display.textContent);
  operator = "/";
  display.textContent = "0";
});

sqrtButton.addEventListener("click", () => {
  firstNumber = parseFloat(display.textContent);
  operator = "√";
  display.textContent = "0";
}); 

exponentButton.addEventListener("click", () => {
  firstNumber = parseFloat(display.textContent);
  operator = "^";
  display.textContent = "0";
});
// Handle decimal point
const decimalButton = document.querySelector(".decimal");
decimalButton.addEventListener("click", () => {
  if (!display.textContent.includes(".")) {
    display.textContent += ".";
  }
}
);

//Handle clear button
clearButtons.forEach(button => {
  button.addEventListener("click", () => {
    display.textContent = "0";
    firstNumber = null;
    operator = null;
  });
});

// Handle delete button
const deleteButton = document.getElementById("delete");
deleteButton.addEventListener("click", () => {
  if (display.textContent.length > 1) {
    display.textContent = display.textContent.slice(0, -1);
  } else {
    display.textContent = "0";
  }
});

// Handle equals
equalsButton.addEventListener("click", () => {
  const secondNumber = parseFloat(display.textContent);
  let result;

  switch (operator) {
    case "+":
      result = firstNumber + secondNumber;
      break;
    case "-":
      result = firstNumber - secondNumber;
      break;
    case "*":
      result = firstNumber * secondNumber;
      break;
    case "/":
      if (secondNumber === 0) {
        alert("Cannot divide by zero");
        return;
      }
      result = firstNumber / secondNumber;
      break;
    case "^":
        result = Math.pow(firstNumber, secondNumber);
        break;
    case "√":
        if (firstNumber < 0) {
            alert("Cannot calculate square root of a negative number");
            return;
        }
        result = Math.sqrt(firstNumber);
        break;
    default:
      return;
  
  }
    if (firstNumber === null || operator === null) {
      alert("Error");
      return;
    }   
    if (isNaN(result) || !isFinite(result)) {
        alert("Error: Invalid calculation");
        return;
        }


  display.textContent = result.toString();
  firstNumber = firstNumber;
  operator = operator;
});

