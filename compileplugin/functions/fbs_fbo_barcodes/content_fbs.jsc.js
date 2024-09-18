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

//JSC::: import api/gui.js

function genTag(tagName, classParamValue) {
    let tag = document.createElement(tagName);
    tag.setAttribute("class",classParamValue);
    return tag;
}
function genTagFromTag(parentTag, tagName, classParamValue) {
    let tag = genTag(tagName,classParamValue);
    parentTag.appendChild(tag);
    return tag;
}
function genClickActionTag(tagName, classParamValue, action) {
    let tag = genTag(tagName, classParamValue);
    tag.addEventListener("click", action);
    return tag;
}


let int = setInterval(() => {
    let list = document.querySelector(".bulk-actions-laputa_bulkLaputaControls_1i7dq div .dropdown-wrapper-module_dropdownWrapper_RZZR3 div div div div div div");
    if (list!=null){
        let btn = document.querySelector(".OZONHELPER-dropbtn");
        if (btn == null){
            btn = genTagFromTag(list,"div","OZONHELPER-dropbtn data-cell-module_dataCell_z0Yiq dropdown-item-module_dropdownItem_99nD2 dropdown-item-module_size-500_pB5xD")
            btn.setAttribute("style","--columns: 1fr; --level-scale: 0;");
            let div = genTagFromTag(
                genTagFromTag(
                    btn,"div","data-cell-module_content_aVq4j"
                ),
                "div",
                "data-content-module_dataContent_WW8ES data-content-module_size-500_IV0sv data-content-module_light_MSazM dropdown-item-module_dataContent_H0JSS"
            );
            let div2 = genClickActionTag(
                "div",
                "data-content-module_label_fGS+z data-content-module_label-size-500_Cc6l0 typography-module_table-500_N-tJ7",
                () => {
                    barcodesLogic();
                }
            );
            div2.textContent = "штрихкоды";
            div.appendChild(div2);
        }
    }
},50);

function barcodesLogic() {
    let trs = document.querySelector("tbody").children;
    let articuls = [];
    for (let tr of trs){
        if (tr.querySelector(".checkbox-module_checkbox_PWZqO").checked) {
            for (let el of tr.querySelectorAll(".two-line-cell_primary_10JdL")) {
                let number = Number(
                    el.children[0].children[2].textContent.match(
                        /\d+/
                    )[0]
                );
                console.log(number);
                for (let i = 0; i < number; i++) {
                    articuls.push(el.querySelector("a").textContent);
                }
            }
        }
    }
    generate(articuls);
}
