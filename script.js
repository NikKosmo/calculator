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
    return numA + numB;
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