const display = document.getElementById("display");
const numberButtons = document.querySelectorAll(".btn");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector(".clear");
const equalsButton = document.querySelector(".equals");

let firstNumber = null;
let operator = null;
let waitingForSecond = false;

// Add number (including .) click handling
numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (waitingForSecond) {
      display.textContent = value === "." ? "0." : value;
      waitingForSecond = false;
    } else {
      if (value === "." && display.textContent.includes(".")) return;
      display.textContent = display.textContent === "0" && value !== "." 
        ? value 
        : display.textContent + value;
    }
  });
});

// Add operator buttons
operatorButtons.forEach(button => {
  button.addEventListener("click", () => {
    firstNumber = parseFloat(display.textContent);
    operator = button.getAttribute("data-op");
    waitingForSecond = true;
  });
});

// Equals (=)
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
    case "%":
      result = firstNumber % secondNumber;
      break;
    case "^":
      result = Math.pow(firstNumber, secondNumber);
      break;
    default:
      return;
  }

  display.textContent = result.toString();
  firstNumber = null;
  operator = null;
  waitingForSecond = false;
});

// Clear
clearButton.addEventListener("click", () => {
  display.textContent = "0";
  firstNumber = null;
  operator = null;
  waitingForSecond = false;
});

// 🔑 Keyboard support
document.addEventListener("keydown", e => {
  const key = e.key;

  if (!isNaN(key) || key === ".") {
    document.querySelector(`.btn:contains('${key}')`)?.click();
  } else if (["+", "-", "*", "/", "%", "^"].includes(key)) {
    document.querySelector(`.operator[data-op='${key}']`)?.click();
  } else if (key === "Enter" || key === "=") {
    equalsButton.click();
  } else if (key === "c" || key === "C") {
    clearButton.click();
  }
});
// Prevent default for Enter key to avoid form submission
document.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();
  }
});
