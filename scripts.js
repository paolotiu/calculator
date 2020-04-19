function add (a,b){
    return parseFloat(a) + parseFloat(b);
}

function subtract (a,b){
    return parseFloat(a) - parseFloat(b);
}

function multiply (a,b){
    return parseFloat(a) * parseFloat(b);
}

function divide (a,b){
    return parseFloat(a) /parseFloat(b);
}

function operate (){
    
    const text = display.innerText;
    let total =0;
    let j = 0;
    let count = 0;
    let len = operatorArray.length;
    
    for(let i = 0; i < len; i++){
        console.log(Numbers, operatorArray)
        let index = checkOperators(operatorArray);
        let operator = operatorArray[index];
        let a = Numbers[index];
        let b = Numbers[index+1];

        total = (operator == '+') ? add(a,b) :
                (operator == '-') ? subtract(a,b) :
                (operator == 'x') ? multiply(a,b) :
                divide(a,b);

        Numbers.splice(index, 2, total);
        operatorArray.splice(index, 1)
    }
        
   
    Numbers = [total];
    operatorArray = [];
    counter = 0;
    display.innerText = total;      
}

function checkOperators (text){

    let index = text.findIndex((a) => (a == 'x' || a=='/'))
    if(index != -1){
        return index
    }

    index = text.findIndex((a) => (a == '+' || a=='-'))
    return index;
}

let display = document.querySelector('#result');
let digits = document.querySelectorAll('.digits');
const operators = document.querySelectorAll('.operators')
digits = Array.from(digits);
let Numbers = [];
let operatorArray = [];
let counter = 0;

// adds text to display
digits.forEach((button) => button.addEventListener('click', () => {
    display.innerText += button.innerText;
    if(Numbers[counter]){
        Numbers[counter] += button.innerText;
    } 
    else{
        Numbers[counter] = button.innerText;
    }

}))

operators.forEach((button) => button.addEventListener('click', () => {
    Numbers[counter] = Numbers[counter].slice(0,Numbers[counter].length - 1);
    operatorArray[counter] = button.innerText;
    
    counter++;
}))

const clear = document.getElementById('clear');
clear.onclick = () =>{
    display.innerText = '';
    Numbers = [];
    operatorArray = [];
    counter = 0;

}

const equals = document.getElementById('equals');
equals.addEventListener('click', operate);
