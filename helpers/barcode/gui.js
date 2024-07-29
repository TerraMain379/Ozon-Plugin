function start() {
    mainGui();
}
function mainGui() {
    function updateButton() {
        genBtn("Штрих коды", () => {
            alert("лол кек шпек");
        }, 3);
    }
    function guiButton() {
        genBtn("Интрефейс", () => {
            listGui();
        }, 4);
    }
    function genBtn(text, action, number) {
        let btnLine = document.querySelector("div.fbs_headerControls_1p3NI");
        if (btnLine==null) return false;
        if (btnLine.children.length<number){
            let div = gen("div",["fbs_headerControls_1p3NI"]);
            let div2 = gen("div",["popover-module_fixReferenceSize_xSMpU"]);
            let btn = gen("button",[
                "button-module_button_g4tks" ,
                "button-module_size-500_21fVN" ,
                "typography-module_body-500-true_,b9qw" ,
                "button-module_primary_JlYlU" ,
                "button-module_hug_RuZja" ,
                "button-module_light_DPbxA"
            ]);
            btn.setAttribute("type","submit");
            let divOfBtn = gen("div",["button-module_content_1i8Cs"]);
            let span = gen("span",["button-module_text_Sj3v5"]);
            span.textContent = text;
            divOfBtn.appendChild(span);
            btn.appendChild(divOfBtn);
            div2.appendChild(btn);
            div.appendChild(div2);

            btn.addEventListener("click",action);
            btnLine.appendChild(div);
        }
        return true;
    }
    function gen(name,classes) {
        let el = document.createElement(name);
        let classesText = "";
        for (let clazz of classes){
            classesText+=clazz+" ";
        }
        el.setAttribute("class",classesText);
        return el;
    }
    setInterval(() => {
        updateButton();
        guiButton();
    },300);
}
function listGui() {
    let trsElements = document.querySelectorAll("tr" +
        ".table-row-module_row_JSSv0" +
        ".table-row-module_hoverable_TM5IW");
    console.log(trsElements);
}

start()