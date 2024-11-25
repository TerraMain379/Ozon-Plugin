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

async function request(url, method, body, headerParams, okAction, errAction, conErrAction) {
    console.log("body: " + JSON.stringify(body));
    try {
        // Отправка запроса с помощью fetch
        const response = await fetch(url, {
            method: method,
            headers: headerParams,
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            conErrAction(response);
        }
        else {
            let data = await response.json();
            okAction(data);
        }
    } catch (error) {
        errAction(error);
    }
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


let int = setInterval(() => {
    let menu = document.querySelector("#ods-window-target-container .vue-portal-target");
    if (menu!=null) {
        let btn = document.querySelector(".OZONHELPER-dropbtn");
        if (btn==null){
            let btn = genClickActionTag(
                "button",
                "OZONHELPER-dropbtn button-module_button_g4tks button-module_size-500_21fVN typography-module_body-500-true_+b9qw button-module_primary_JlYlU button-module_hug_RuZja button-module_light_DPbxA",
                () => {
                    barcodesLogic();
                }
            );
            let span = genTagFromTag(
                genTagFromTag(btn,"div","button-module_content_1i8Cs"),
                "span",
                "button-module_text_Sj3v5"
            );
            span.textContent = "штрихкоды";
            document.querySelector(".order-composition-module_footer_2TRSt").appendChild(btn);
        }
    }
}, 50);


function barcodesLogic() {
    let url = window.location.href.split("/");
    let supply_order_id = url[url.length-1];
    request(
        "http://localhost:8080/barcode/fbolist",
        "POST",
        {
            "supply_order_id": supply_order_id
        },
        {},
        (data) => {
            alert("успешно сохранено!");
        }, (err) => {
            alert("произошла ошибка на сервере");
            console.log("server error: " + err);
        }, (status) => {
            alert("не удалось соединиться с сервером!");
            console.log("connection error: " + status);
        }
    )
}
