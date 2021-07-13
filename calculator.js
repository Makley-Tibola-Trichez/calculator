// start
const display = document.getElementById("display");

window.onload = () => {
    document.addEventListener("keydown", (ev) => {
        const isInt = Number.isInteger(Number(ev.key))
        if (isInt || ev.key === ".") {
            const type = isInt ? "number" : "dot";
            insertIntoDisplay(type, ev.key);
        } else if (checkNumpadOperators(ev.key)) {
            insertIntoDisplay("operator", ev.key);
        }
    });
    main()
}


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
    if (type === "number") {
        if (display.innerText.trim() == "0") {
            display.innerText = '';
        }
        if (verifyNumberLength()) {
            display.innerText +=  lastType != "number" && lastType != '' && lastType != "dot" ? ` ${val}`: val;
            lastType = type;
        }

    } else if (type === "dot" && lastType === "number") {
        display.innerText += val;
        lastType = type;

    } else if (type === "operator" && lastType != "operator" && lastType != '') {
        display.innerText += ` ${val}`;
        lastType = type;
        quantityOperators++;

    } else if (type === "clean-all") {
        cleanAllInDisplay();
        lastType = 'clean-all';
        quantityOperators = 0;

    } else if (type === "equal") {
        checkOperators();
        lastType = 'number'; // needs to be a number because the first if of that function will not work in some cases, it's not wrong the way that was done
        quantityOperators = 0;
        
    }
}

function verifyNumberLength() {
    const text = display.innerText;
    let arrText = text.split(" ");
    let lastNumber = arrText[arrText.length - 1];
    if (lastNumber.length < 8) {
        return true;
    }
    return false;
}


function cleanAllInDisplay() {
    display.innerText = 0;
}

function cleanLastAction() {
    display;

}

function checkOperators() {
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

    showResult(vals);
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

function showResult(arr) {
    display.innerText = arr[0];
}

function checkNumpadOperators(key) {
    return ["*", "/", "+", "-"].includes(key);
}