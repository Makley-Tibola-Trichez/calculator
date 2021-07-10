let values = new Array();

main()
function main() {
    let actBtn = document.getElementsByClassName("active");
    actBtn = Array.from(actBtn);

    actBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            getVal(btn);
        })
    })
}
function getVal(btn) {
    let val = btn.querySelector("span").getAttribute("value");
    if (val == "=") {
        resolveSum();
        return;
    }
    values.push(val);
    concatNumber(values);
}

function concatNumber(values) {
    let originalNumbers = new Array();
    let concatToNumber = '';
    values.forEach((val) => {
        if (Number.isInteger(parseInt(val)) || val == ".") {
            concatToNumber += val;
        } else {
            concatToNumber = checkIfHasADotInTheEnd(concatToNumber)
            originalNumbers.push(concatToNumber,val);
            concatToNumber = '';
        }
    });
    console.log(originalNumbers)
}

function checkIfHasADotInTheEnd(number) {
    const num = number.length;
    if (number.charAt(num - 1) === ".") {
        number = number.substr(0,number.length-1);
    }
    return number;
}
