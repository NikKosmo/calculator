let memoryValue = null;
let actionValue = null;
let displayValue = 0;

addButtonsListener();
addKeysListener();

function addKeysListener() {
    window.addEventListener("keydown", applyInput);
}

function addButtonsListener() {
    document.querySelectorAll(".button")
        .forEach(button => button.addEventListener("mousedown", handeButtonEvent));
}

function applyInput(event) {
    applyKey(event.key)
}

function handeButtonEvent(event) {
    const buttonId = event.currentTarget.id;
    if (isNaN(buttonId)) {
        switch (buttonId) {
            case "divide":
                applyKey("/");
                break;
            case "multiply":
                applyKey("*");
                break;
            case "subtract":
                applyKey("-");
                break;
            case "dot":
                applyKey(".");
                break;
            case "equals":
                applyKey("=");
                break;
            case "plus":
                applyKey("+");
                break;
        }
    } else {
        applyKey(buttonId);
    }
}

function applyKey(key) {
    if (isNaN(key)) {
        switch (key) {
            case "+":
            case "-":
            case "/":
            case "*":
                processAction(key);
                break;
            case "=":
                processEquals();
                break
            case ".":
                processDot();
                break;
        }
    } else {
        processDigit(key);
    }
}

function processAction(action) {
    if (!isNaN(displayValue)) {
        processEquals();
        memoryValue = displayValue;
        updateInMemory(memoryValue);
    } else {
        processEquals();
    }
    displayValue = action;
    updateDisplay(displayValue);
}

function processEquals() {
    if (displayValue.charAt(displayValue.lengh - 1) == ".") {
        displayValue = displayValue.slice(0, -1);
    }
    if (!isNaN(displayValue) && memoryValue != null) {
        displayValue = operate(actionValue, memoryValue, displayValue);
        memoryValue = null;
        actionValue = null;
        updateDisplay(displayValue);
        updateInMemory("");
    }
}

function processDot() {
    if (isNaN(displayValue)) {
        actionValue = displayValue;
        displayValue = "0.";
        updateInMemory(`${memoryValue} ${actionValue}`);
    } else if (!displayValue.toString().includes(".")) {
        displayValue += "."
    }
    updateDisplay(displayValue);
}

function processDigit(digit) {
    if (isNaN(displayValue)) {
        actionValue = displayValue;
        displayValue = digit;
        updateInMemory(`${memoryValue} ${actionValue}`);
    } else if (displayValue == 0) {
        displayValue = digit
    } else {
        displayValue += digit;
    }
    updateDisplay(displayValue);
}

function updateInMemory(newValue) {
    document.getElementById("in-memory").textContent = newValue;
}

function updateDisplay(newValue) {
    document.getElementById("current-value").textContent = newValue;
}

function operate(action, numA, numB) {
    switch (action) {
        case "+":
            return sum(numA, numB);
        case "-":
            return subtract(numA, numB);
        case "/":
            return divide(numA, numB);
        case "*":
            return multiply(numA, numB);
    }
}

function sum(numA, numB) {
    return +numA + +numB;
}

function subtract(numA, numB) {
    return numA - numB;
}

function divide(numA, numB) {
    return numA / numB;
}

function multiply(numA, numB) {
    return numA * numB;
}