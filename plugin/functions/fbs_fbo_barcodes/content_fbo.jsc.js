//JSC:::import api/gui.js
//JSC:::import api/request.js

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
            document.querySelector(".order-composition-module_footer_04K8j").appendChild(btn);
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