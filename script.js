const CALC_DISPLAY = document.querySelector('h1');
const INPUT_BTNS = document.querySelectorAll('button');
const CLEAR_BTN = document.getElementById('clearBtn');

let firstVal = 0;
let opVal = '';
let awaitNextVal = false;


const calculationObj = {
    '/': (firstNum, secondNum) => firstNum / secondNum,
    '*': (firstNum, secondNum) => firstNum * secondNum,
    '+': (firstNum, secondNum) => firstNum + secondNum,
    '-': (firstNum, secondNum) => firstNum - secondNum,
    '=': (firstNum, secondNum) => secondNum,
}

function sendNumberValue(num){
    if(awaitNextVal){
        CALC_DISPLAY.textContent = num;
        awaitNextVal = false;
    } else{ 
        const displayValue = CALC_DISPLAY.textContent;
        CALC_DISPLAY.textContent = displayValue === '0' ? num : displayValue + num;
    }
}

function resetValues() {
    let firstVal = 0;
    let opVal = '';
    let awaitNextVal = false;
    CALC_DISPLAY.textContent = '0';
}

function addDecimal(){
    if(awaitNextVal){
        return;
    }
    if(!CALC_DISPLAY.textContent.includes('.')){
        CALC_DISPLAY.textContent = `${CALC_DISPLAY.textContent}.`;
    }
}

function useOperator(op){
    const currentVal = Number(CALC_DISPLAY.textContent);

    if(opVal && awaitNextVal){
        opVal = op;
        return;
    }

    if(!firstVal){
        firstVal = currentVal;
    } else {
        const calc = calculationObj[opVal](firstVal, currentVal);
        CALC_DISPLAY.textContent = +parseFloat((calc).toFixed(5));
        firstVal = calc;
    }
    awaitNextVal = true;
    opVal = op;
}


//Event L for num, op and decimal
INPUT_BTNS.forEach(input => {
    if(input.classList.length === 0){
        input.addEventListener('click', () => sendNumberValue(input.value));
    } else if (input.classList.contains('operator')){
        input.addEventListener('click', () => useOperator(input.value));
    } else if (input.classList.contains('decimal')){
        input.addEventListener('click', () => addDecimal());
    }
})

CLEAR_BTN.addEventListener('click', resetValues);