export function kalkulator(a, b, operator) {
    validateInput(a, b, operator);
    
    // With Switch Case
    switch (operator) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            return a / b;
        default:
            return "Invalid operator";
    }
}

function validateInput(a, b, operator) {
    if (typeof a !== "number" || typeof b !== "number") {
        throw new Error("Both a and b must be numbers");
    }

    if (typeof operator !== "string") {
        throw new Error("Operator must be a string");
    }

    if (!["+", "-", "*", "/"].includes(operator)) {
        throw new Error("Invalid operator. Use +, -, *, or /");
    }

    if (operator === "/" && b === 0) {
        throw new Error("Division by zero is not allowed");
    }

    if (a < 0 || b < 0) {
        throw new Error("Both a and b must be non-negative numbers");
    }
}