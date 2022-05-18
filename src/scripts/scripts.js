const numberBtns = document.querySelectorAll("[data-number]");
const operationBtns = document.querySelectorAll("[data-operator]");
const equalsBtn = document.querySelector("[data-equal]");
const deleteBtn = document.querySelector("[data-delete]");
const allClearBtn = document.querySelector("[data-all-clear]");
const previousOperandText = document.querySelector("[data-previous-operand]");
const currentOperandText = document.querySelector("[data-current-operand]");

class Calculator {
  constructor(previousOperandText, currentOperandText) {
    this.previousOperandText = previousOperandText;
    this.currentOperandText = currentOperandText;
    this.clear();
  }

  formatDisplayNumber(number) {
    const stringNumber = number.toString();

    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];

    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if(decimalDigits != null){
        return `${integerDisplay}.${decimalDigits}`
    }else{
        return integerDisplay
    }
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  calculate() {
    let result;

    const _previousOperand = parseFloat(this.previousOperand);
    const _currentOperand = parseFloat(this.currentOperand);

    if (isNaN(_previousOperand) || isNaN(_currentOperand)) return;

    switch (this.operation) {
      case "+":
        result = _previousOperand + _currentOperand;
        break;
      case "-":
        result = _previousOperand - _currentOperand;
        break;
      case "*":
        result = _previousOperand * _currentOperand;
        break;
      case "÷":
        result = _previousOperand / _currentOperand;
        break;
      default:
        return;
    }

    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = "";
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.calculate();
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  appendNumber(number) {
    if (this.currentOperand.includes(".") && number === ".") return;
    this.currentOperand = `${this.currentOperand}${number.toString()}`;
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  updateDisplay() {
    this.previousOperandText.innerText = `${this.formatDisplayNumber(this.previousOperand)} ${
      this.operation || ""
    }`;
    this.currentOperandText.innerText = this.formatDisplayNumber(this.currentOperand);
  }
}

const calculator = new Calculator(previousOperandText, currentOperandText);

for (const numberBtn of numberBtns) {
  numberBtn.addEventListener("click", () => {
    calculator.appendNumber(numberBtn.innerText);
    calculator.updateDisplay();
  });
}

for (const operationBtn of operationBtns) {
  operationBtn.addEventListener("click", () => {
    calculator.chooseOperation(operationBtn.innerText);
    calculator.updateDisplay();
  });
}

allClearBtn.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

equalsBtn.addEventListener("click", () => {
  calculator.calculate();
  calculator.updateDisplay();
});

deleteBtn.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});