import {sendJS,getTabData} from "./api/chrome.js";

let list = document.querySelector("#list");

function addBlock() {
    return list.appendChild(genBlock());
}
function removeBlock(block){
    list.removeChild(block);
}
function setBlock(block, value) {
    block.children[0].value = value;
}

function getArticuls() {
    let articuls = JSON.parse(localStorage.getItem("articuls"));
    if (typeof articuls === typeof ["1"]) return articuls;
}
function saveData() {
    let articuls = [];
    for (let block of list.children){
        articuls.push(block.children[0].value);
    }
    localStorage.setItem("articuls",JSON.stringify(articuls));
}
function loadData() {
    let articuls = getArticuls();
    for (let articul of articuls){
        setBlock(addBlock(), articul);
    }
}

function genBlock() {
    let div = document.createElement("div");
    let input = document.createElement("input");
    input.type = "text";
    input.addEventListener("input", () => {
        saveData();
    });
    div.appendChild(input);
    let removeBtn = document.createElement("input");
    removeBtn.type = "button";
    removeBtn.value = "-";
    removeBtn.addEventListener("click", () => {
        removeBlock(div);
        saveData();
    });
    div.appendChild(removeBtn);
    return div;
}

document.querySelector("#addbtn").addEventListener("click", () => {
    addBlock();
    saveData();
});
document.querySelector("#clear").addEventListener("click", () => {
    for (let child of list.children){
        setTimeout(()=>{
            child.remove();
        },0);
    }
    setTimeout(()=>{
        addBlock();
        saveData();
    },0);
});
document.querySelector("#gen").addEventListener("click", () => {
    generate();
})
function generate() {
    let arts = getArticuls();
    let body = "{\"articuls\":[";
    for (let i = 0; i < arts.length; i++) {
        body+='"'+arts[i]+'"';
        if (i===arts.length-1) break;
        body+=",";
    }
    body+="]}";
    fetch('http://localhost:8080/barcode/generatelist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            alert("Успешно сохранено!\n"+data);
        })
        .catch(error => {
            alert("Произошла какая то ошибка...\n"+error);
        });
}

loadData();