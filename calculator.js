main(0)
function main() {
    const elements = Array.from(document.querySelectorAll("td.active"));
    elements.forEach(el => {
        el.addEventListener("click",function () {
            let element = el.querySelector("span"),
                type = element.getAttribute("type");
            
            insertIntoDisplay(type, element.getAttribute("val"));
        })
    })
}

let lastType = '';
function insertIntoDisplay(type, val) {
    let display = document.getElementById("display");
    if (type === "number") {
        display.innerText +=  lastType != "number" ? ` ${val}`: val;
        lastType = type;

    } else if (type === "operator" && lastType != "operator") {
        display.innerText += ` ${val}`;
        lastType = type;

    } else if (type === "clean") {
        cleanDisplay()

    }
}

function cleanDisplay() {
    const display = document.getElementById("display");
    display.innerText = '';
}