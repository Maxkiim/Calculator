const buttons = Array.from(document.querySelectorAll("button"));
const numbers = Array.from(document.querySelectorAll(".number"));
const operators = Array.from(document.querySelectorAll(".operator"));
const display = document.querySelector("span");
const equal = document.querySelector("#equal");
const reset = document.querySelector("#reset");
const backspace = document.querySelector("#backspace");
const dot = document.querySelector("#dot");

let firstNum = "";
let secondNum = "";
let currentOperator = null;
let shouldResetDisplay = false;

dot.addEventListener("click", () => {
    if (!display.innerHTML.includes(".")){
        display.innerHTML += ".";
    }
});
numbers.forEach(num => {
    num.addEventListener("click", () =>{
        if (shouldResetDisplay) {
            display.innerHTML = "";
            shouldResetDisplay = false;
        }
        if (display.innerHTML === "0"){
            display.innerHTML = "";
        }
        display.innerHTML += num.innerHTML;
        console.log(num.innerHTML);
    });
});


operators.forEach(op => {
    op.addEventListener("click", () =>{
        if (currentOperator === "="){
            currentOperator = null;
            shouldResetDisplay = true;
            return;
        };
        if (currentOperator !== null){
            calculate()
        }
        firstNum = display.innerHTML;
        currentOperator = op.innerHTML;
        shouldResetDisplay = true;
    });
});

equal.addEventListener("click", () => {
    if (currentOperator === null || shouldResetDisplay) return;
    secondNum = display.innerHTML;
    display.innerHTML = operate(firstNum, secondNum, currentOperator);
    currentOperator = null;
});

reset.addEventListener("click", () => {
    display.innerHTML = "0";
    firstNum = "";
    secondNum = "";
    currentOperator = null;
    shouldResetDisplay = false;
});

backspace.addEventListener("click", () => {
    if (shouldResetDisplay) return;
    display.innerHTML = display.innerHTML.slice(0, -1);
    console.log("backspace clicked")
    if (display.innerHTML === "") {
        display.innerHTML = "0";
    }
});

function handleKeyPress(e) {
    const key = e.key;
    if (!isNaN(key)) {
        clickNumber(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
        clickOperator(key);
    } else if (key === 'Enter' || key === '=') {
        equal.click();
    } else if (key === 'Backspace') {
        backspace.click();
    } else if (key === 'Escape' || key.toLowerCase() === 'c') {
        reset.click();
    } else if (key === '.') {
        clickNumber(key);
    }
}

function addNums(a, b){
    return Number(a) + Number(b);
}
function subtractNums(a, b){
    return Number(a) - Number(b);
}
function multiplyNums(a, b){
    return Number(a) * Number(b);
}
function divideNums(a, b){
    return Number(a) / Number(b);
}
function remainNums(a, b){
    return Number(a) % Number(b);
}

function operate(a, b, c){
    switch (c){
        case '+':
            return addNums(a, b);
        case '-':
            return subtractNums(a, b);
        case '*':
            return multiplyNums(a, b);
        case '/':
            return divideNums(a, b);
        case '%':
            return remainNums(a, b);
        default:
            console.log(c);
            return "unknown operator";
    }
}

function calculate(){
    if (currentOperator === null || shouldResetDisplay) return;
    secondNum = display.innerHTML;
    display.innerHTML = operate(firstNum, secondNum, currentOperator);
    firstNum = display.innerHTML;
    currentOperator = null;
}
function clickNumber(val) {
    if (val === "." && display.innerHTML.includes(".")) return;
    if (shouldResetDisplay) {
        display.innerHTML = "";
        shouldResetDisplay = false;
    }
    if (display.innerHTML === "0"){
        display.innerHTML = "";
    }
    if (val === ".") {
        display.innerHTML = "0";
    }
    display.innerHTML += val;
}

function clickOperator(op) {
    if (currentOperator !== null) {
        calculate();
    }
    firstNum = display.innerHTML;
    currentOperator = op;
    shouldResetDisplay = true;
}

document.addEventListener("keydown", handleKeyPress);