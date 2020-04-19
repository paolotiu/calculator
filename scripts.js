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
    if(!operatorArray.length) {
        clear.click();
        return;    
    }
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
        console.log(total)
        if (total == 'undefined' || total == 'Infinity' || isNaN(total)){
            total = 'ERROR'
            break;
        }
        
        let decimalCount = total.countDecimals();
        if (decimalCount >= 5){
            total = total.toFixed(5);
        }
        

        Numbers.splice(index, 2, total);
        operatorArray.splice(index, 1)
    }   
    operatorArray = [];
    counter = 0;
    Numbers - []
    if(total == 'ERROR'){
        alert('ERROR');
        display.innerText = '';
        total = 0;
    }
    else{
        Numbers = [total];
        display.innerText = total;  
        clicked = true;
    }     
}

//decimal counter
Number.prototype.countDecimals = function () {
    if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
    return this.toString().split(".")[1].length || 0;}

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
const dot = document.getElementById('dot');
const operators = document.querySelectorAll('.operators')
const clear = document.getElementById('clear');
const equals = document.getElementById('equals');
const back = document.getElementById('backspace');
equals.addEventListener('click', operate);

digits = Array.from(digits);
let Numbers = [];
let operatorArray = [];
let counter = 0;
let clicked = false;

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

// function displayDigit(e){
//     display.innerText += e.innerText;
//     if(Numbers[counter]){
//         Numbers[counter] += e.innerText;
//     } 
//     else{
//         Numbers[counter] = e.innerText;
//     }

// }
// adds text to display
//digits.forEach((button) => button.addEventListener('keypress', displayDigit))

// for diving the arrays into parts
operators.forEach((button) => button.addEventListener('click', () => {  
    display.innerText += button.innerText;
    operatorArray.push(button.innerText);
    clicked = false;
    counter++;
}))

//clear function
clear.onclick = () =>{
    display.innerText = '';
    Numbers = [];
    operatorArray = [];
    counter = 0;
    clicked = false;
}

// prevents user to click dot more than once
dot.onclick = () => {
    if (!clicked){
        display.innerText += dot.innerText;
    if(Numbers[counter]){
        Numbers[counter] += dot.innerText;
    } 
    else{
        Numbers[counter] = dot.innerText;
    }
    clicked = true;
    }
}


//backspace function
back.onclick = () => {
    let text = display.innerText;

    while(!Numbers[counter]){
        if(counter == 0){
            break;
        }
        counter--;
    }
    if(text.endsWith('+') || text.endsWith('-') || text.endsWith('x') || text.endsWith('/')){
        if (operatorArray.length == 1){
            operatorArray = [];
        }
        else{
        operatorArray.pop();}      
    }
    else{
        Numbers[counter] = Numbers[counter].slice(0,Numbers[counter].length -1)
        if(!Numbers[counter]){
            Numbers.pop();
            counter--;
        }
    }

    if (counter < 0) counter = 0;
    

    display.innerText = text.slice(0, text.length -1);   
}



document.onkeydown = function (e){
        if(e.key == 'c' || e.key == 'C'){
            clear.click();
            return;
        }

        if(e.key == 'Backspace' || e.key == 'Delter'){
            back.click();
            return
        }

        if (equals.innerText == e.key  || e.key == 'Enter'){
            equals.click();
            return
        }

        if(e.key == '.'){
            dot.click();
            return;
        }

        
        digits.forEach((button) => {
            if(button.innerText == e.key){
                button.click()
                return
            }
        })

        operators.forEach((button) => {
            if(button.innerText == e.key  || button.dataset.val == e.key){
                button.click()
                return
            }
        })

        
}