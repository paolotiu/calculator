function add (a,b){
    return a + b;
}

function subtract (a,b){
    return a - b;
}

function multiply (a,b){
    return a * b;
}

function divide (a,b){
    return a / b;
}

function operate (operator, a, b){
    return (operator == '+') ? add(a,b) :
    (operator == '-') ? subtract(a,b) :
    (operator == '*') ? multiply(a,b) :
    divide(a,b)  
}

let display = document.querySelector('#result');
let digits = document.querySelectorAll('.digits');
digits = Array.from(digits);

// adds text to display
digits.forEach((button) => button.addEventListener('click', () => display.innerText += button.innerText))

const clear = document.getElementById('clear');
clear.onclick = () => display.innerText = '';