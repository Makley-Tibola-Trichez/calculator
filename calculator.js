// start
main()

function main() {
    const elements = Array.from(document.querySelectorAll("td.active"));
    elements.forEach(el => {
        el.addEventListener("click",function () {
            let element = el.querySelector("span"),
                type = element.getAttribute("type");
            
            insertIntoDisplay(type, element.getAttribute("val"));
        });
    });
}

let lastType = '';
let quantityOperators = 0;
function insertIntoDisplay(type, val) {
    let display = document.getElementById("display");
    if (type === "number") {
        display.innerText +=  lastType != "number" && lastType != '' ? ` ${val}`: val;
        lastType = type;

    } else if (type === "dot" && lastType === "number") {
        display.innerText += val;
        lastType = type;
    } else if (type === "operator" && lastType != "operator" && lastType != '') {
        display.innerText += ` ${val}`;
        lastType = type;
        quantityOperators++;

    } else if (type === "clean") {
        cleanDisplay();
        lastType = 'clean';
        quantityOperators = 0;

    } else if (type === "equal") {
        checkOperators(display);
        lastType = 'number'; // needs to be a number because the first if of that function will not work in some cases, it's not wrong the way that was done
        quantityOperators = 0;
        
    }
}

function cleanDisplay() {
    const display = document.getElementById("display");
    display.innerText = '';
}

function checkOperators(display) {
    let vals = display.innerText.split(" "),
        indexOperator,
        result;
    for (let i = 0; i < quantityOperators; i++) {

        if (vals.includes("*")) {
            indexOperator = vals.indexOf("*");
           
        } else if (vals.includes("/")) {
            indexOperator = vals.indexOf("/");
            
        } else if (vals.includes("+") && vals.includes("-")) { 
            indexOperatorPlus = vals.indexOf("+");
            indexOperatorMinus = vals.indexOf("-");

            indexOperator = indexOperatorPlus > indexOperatorMinus 
                            ? indexOperatorMinus : indexOperatorPlus;

        } else if (vals.includes("+")) { 
            indexOperator = vals.indexOf("+");

        } else if (vals.includes("-")) {
            indexOperator = vals.indexOf("-");
        }
        result = calculateValues(vals, indexOperator);
        vals = subsOperatorByValue(vals, indexOperator, result);
    }

    showResult(display, vals);
}

function calculateValues(arr, index) {
    const firstVal = parseFloat(arr[index-1]);
    const secondVal = parseFloat(arr[index+1]);
    let operator = arr[index];

    if (operator == "*") {
        return firstVal * secondVal;        
    } else if (operator == "/") {
        return firstVal / secondVal;
    } else if (operator == "+") {
        return firstVal + secondVal;
    } else if (operator == "-") {
        return firstVal - secondVal;
    }
  
}

function subsOperatorByValue(arr, index, result) {
    arr.splice(index, 1, result);
    arr.splice(index+1, 1);
    arr.splice(index-1, 1);
    return arr;
}

function showResult(display, arr) {
    display.innerText = arr[0];
}