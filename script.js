class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.clear();
    }

    clear() {
        this.currentOperation = '';
        this.previousOperation = '';
        this.operation = undefined;
    }

    deleteNumber() {
        this.currentOperation = this.currentOperation.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperation.includes('.')) return;
        this.currentOperation += number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperation === '') return;
        if (this.previousOperation !== '') {
            this.computation();
        }
        this.operation = operation;
        this.previousOperation = this.currentOperation;
        this.currentOperation = '';
    }

    computation() {
        let computationValue;
        const prev = parseFloat(this.previousOperation);
        const current = parseFloat(this.currentOperation);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computationValue = prev + current;
                break;
            case '-':
                computationValue = prev - current;
                break;
            case '*':
                computationValue = prev * current;
                break;
            case '/':
                computationValue = prev / current;
                break;
            default:
                return;
        }
        this.currentOperation = computationValue;
        this.operation = undefined;
        this.previousOperation = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const intergerDigits = parseFloat(stringNumber.split('.')[0]);
        let intergerDisplay;

        if (isNaN(intergerDigits)) {
            intergerDisplay = '';
        } else {
            intergerDisplay = intergerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }

        const decimalDigits = stringNumber.split('.')[1];
        if (decimalDigits != null) {
            return `${intergerDisplay}.${decimalDigits}`;
        } else {
            return intergerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperationText.innerText = this.getDisplayNumber(this.currentOperation);
        if (this.operation != null) {
            this.previousOperationText.innerText = `${this.getDisplayNumber(this.previousOperation)} ${this.operation}`;
        } else {
            this.previousOperationText.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('[solve-number]');
const operationButtons = document.querySelectorAll('[solve-operation]');
const equalButton = document.querySelector('[solve-equals]');
const deleteButton = document.querySelector('[solve-delete]');
const allClearButton = document.querySelector('[solve-all-clear]');
const previousOperationText = document.querySelector('[solve-previous-operation]');
const currentOperationText = document.querySelector('[solve-current-operation]');

const calculator = new Calculator(previousOperationText, currentOperationText);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalButton.addEventListener('click', () => {
    calculator.computation();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.deleteNumber();
    calculator.updateDisplay();
});
