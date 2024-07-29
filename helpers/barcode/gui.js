export function loadGui() {
    initTRS();
    initGUI();
}

let trs;

let articulColumnNum;
function initTRS() {
    trs = [];
    let tableMainLine = document.querySelector("tr" +
        ".table-row-module_row_JSSv0");
    articulColumnNum = 0;
    for (let td of tableMainLine.children) {
        if (td.textContent.startsWith("Артикул, количество")) break;
        articulColumnNum++;
    }
    console.log("articuls column: " + articulColumnNum);

    let trsElements = document.querySelectorAll("tr" +
        ".table-row-module_row_JSSv0" +
        ".table-row-module_hoverable_TM5IW");
    for (let trBlock of trsElements){
        trs.push(new TrData(trBlock));
    }
}
class TrData{
    constructor(trBlock) {
        if (trBlock==null) return;
        this.trBlock = trBlock;
        this.articuls = [];
        this.links = [];
        let articulsTextBlocks = trBlock.children[articulColumnNum].children[0].children;

        if (articulsTextBlocks !== null) {
            for (let textBlock of articulsTextBlocks) {
                let a = textBlock.children[0].children[0].children[0];
                if (!isElement(a)) break;
                this.articuls.push(a.textContent);
                this.links.push(a.getAttribute("href")+"&ozonhelper=barcode");

            }
            console.log(this.articuls);
            console.log(this.links);
        }
    }
}
function initGUI() {
    let tdBlock = gen("td",["table-cell-module_cell_MThHP " ,
        "table-cell-module_td_p43QB " , "typography-module_table-500_N-tJ7 " ,
        "table-cell-module_size-500_W6Tci " , "table-cell-module_vertical-align-top_-tPkp " ,
        "table-cell-module_horizontal-align-left_2swIf " , "table-cell-module_leftBorder_fPexc " ,
        "table-cell-module_bottomBorder_MkTkL " , "table-cell-module_fixed_bC1cY " ,
        "cells_bodyCell_3QMlH " , "cells_actionsCell_3SyT6"
    ]);
    tdBlock.setAttribute("data-widget","fbs-table-column-actions-0");

    let buttonOfTdBlock = gen("button",[
        "button-module_button_g4tks " + "button-module_size-400_K+ozR " +
        "typography-module_body-500-true_+b9qw " + "button-module_secondary_BZ2cY " +
        "button-module_fill_PtW3Z " + "button-module_light_DPbxA"
    ])
    buttonOfTdBlock.setAttribute("type","submit");

    let divOfButtonBlock = gen("div",["button-module_content_1i8Cs"])

    let spanOfDivBlock = gen("span",[]);
    spanOfDivBlock.textContent = "Штрих код";
    divOfButtonBlock.appendChild(spanOfDivBlock);
    buttonOfTdBlock.appendChild(divOfButtonBlock);
    tdBlock.appendChild(buttonOfTdBlock);

    for (let tr of trs){
        let td = tdBlock.cloneNode(true);
        td.addEventListener("click",() => {
            barcodeLogic(tr);
        });
        tr.trBlock.appendChild(td);
    }


    let btnLine = document.querySelector("div.heading-builder-module_slotContainer_asOZc");
    if (btnLine.children.length<3){
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
        span.textContent = "Штрих коды";
        divOfBtn.appendChild(span);
        btn.appendChild(divOfBtn);
        div2.appendChild(btn);
        div.appendChild(div2);

        btn.addEventListener("click",()=>{
            barcodesLogic();
        });
        btnLine.appendChild(div);
    }
}

function barcodeLogic(tr) {
    let i = 0;
    let interval = setInterval(()=>{
        let link = tr.links[i];
        console.log(link);
        window.open(link);
        i++;
        if (i>=tr.links.length) {
            clearInterval(interval);
            console.log("STOP" + tr.links.length);
        }
    },5);
}
function barcodesLogic() {
    for (let tr of trs){
        barcodeLogic(tr);
    }
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
function isElement(obj) {
    try {
        //Using W3 DOM2 (works for FF, Opera and Chrome)
        return obj instanceof HTMLElement;
    }
    catch(e){
        return false;
    }
}
