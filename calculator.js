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
let returnBeforeResult = {
    "text": display.innerText, 
    "beforeEqual": false, 
    "lastType": lastType, 
    "qttOperators": quantityOperators
};
function insertIntoDisplay(type, val) {
    

    if (type === "number") {
        if (display.innerText.trim() == "0") {
            display.innerText = '';
        }
        if (verifyNumberLength()) {
            display.innerText +=  lastType != "number" && lastType != '' && lastType != "dot" && lastType != "clean" ? ` ${val}`: val;
            lastType = type;
        }

    } else if (type === "dot" && lastType === "number") {
        display.innerText += val;
        lastType = type;

    } else if (type === "operator" && lastType != "operator" && lastType != '') {
        display.innerText += ` ${val}`;
        lastType = type;
        quantityOperators++;
    } else if (type === "clean") {
        if (returnBeforeResult.beforeEqual === true) {
            console.log(returnBeforeResult)
            display.innerText = returnBeforeResult.text;
            lastType = returnBeforeResult.lastType
            quantityOperators = returnBeforeResult.qttOperators;
            returnBeforeResult.beforeEqual = false;
        } else {
            const lastOperator = returnToLastVal();
            if (lastOperator === 'operator') {
                quantityOperators--;
            }
            lastType = 'clean';
        } 
        
    } else if (type === "clean-all") {
        cleanAllInDisplay();
        lastType = 'clean-all';
        quantityOperators = 0;

    } else if (type === "equal") {
        returnBeforeResult.beforeEqual = true;
        returnBeforeResult.text = display.innerText;
        returnBeforeResult.lastType = lastType;
        returnBeforeResult.qttOperators = quantityOperators;
        
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

function returnToLastVal() {
    const operators = ['+','-','*','/'];
    let text = display.innerText;
    let arrText = text.split(" ");
    let lastVal = text.replace(` ${arrText[arrText.length -1]}`, "")
    display.innerText = lastVal.trim();
    if (operators.includes(arrText[arrText.length -1])) {
        return "operator"
    } else if (arrText.length === 1) {
        console.log("ad")
        display.innerText = 0;
    }
    return "number";
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
    let result;
    if (operator == "*") {
        result = firstVal * secondVal;        
        result = String(result).length > 8 ? "ERR" : result;
    } else if (operator == "/") {
        result = firstVal / secondVal;
        result = String(result).length > 8 ? "ERR" : result;
    } else if (operator == "+") {
        result = firstVal + secondVal;
        result = String(result).length > 8 ? "ERR" : result;
    } else if (operator == "-") {
        result = firstVal - secondVal;
        result = String(result).length > 8 ? "ERR" : result;
    }
    return result
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