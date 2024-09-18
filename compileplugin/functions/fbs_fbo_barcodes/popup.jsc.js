async function request(url, method, body, headerParams, okAction, errAction, conErrAction) {
    console.log("body: " + JSON.stringify(body));
    fetch(url, {
        method: method,
        headers: headerParams,
        body: JSON.stringify(body)
    })
        .then(response => {
            if (!response.ok) {
                conErrAction(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            okAction(data);
        })
        .catch(error => {
            errAction(error);
        });
}
async function ozonRequest(url, method, body, clientId, apiKey, okAction, errAction){
    if (url.startsWith("/")){
        url = "https://api-seller.ozon.ru" + url;
    }
    let headerParams = {
        "Client-Id": clientId,
        "Api-Key": apiKey
    };
    await request(url, method, body, headerParams, okAction, errAction);
}


function generate(arts) {
    request("http://localhost:8080/barcode/generatelist","POST",{
        "articuls": arts
    },{},(data) => {
        alert("Успешно сохранено!");
    },(err) => {
        alert("Произошла ошибка на сервере");
        console.log("server error: " + err);
    },(status) => {
        alert("не удалось соединиться с сервером!");
        console.log("connection error: " + status);
    })
}


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
    generate(getArticuls());
});

loadData();
