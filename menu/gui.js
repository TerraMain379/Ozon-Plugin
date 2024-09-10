const timeoutFromBarcodesLogic = 4000;
const form_input = "form-input-4";

export function mainGui() {
    function barcodesButton() {
        genBtn("Штрих-коды", () => {
            barcodesLogic();
        }, 3);
    }
    function guiButton() {
        genBtn("Интерфейс", () => {
            listGui();
        }, 4);
    }

    function genBtn(text, action, number) {
        let btnLine = document.querySelector("div.fbs_headerControls_1p3NI");
        if (btnLine==null) return;
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
    }
    function testGenBtn() {
        let btnLine = document.querySelector("div.fbs_headerControls_1p3NI");
        if (btnLine!=null){
            return btnLine.children.length < 4;
        }
        return false;
    }

    let int = setInterval(() => {
        if (testGenBtn()) {
            barcodesButton();
            guiButton();
            //clearInterval(int);
        }
    },300);
}
function listGui() {
    for (let el of document.querySelectorAll(".OZON-HELPER-CLASS")){
        el.remove();
    }
    function genBtn(tr) {
        let td = gen("td",["OZON-HELPER-CLASS",
            "table-cell-module_cell_MThHP","table-cell-module_td_p43QB",
            "typography-module_table-500_N-tJ7","table-cell-module_size-500_W6Tci",
            "table-cell-module_vertical-align-top_-tPkp","table-cell-module_horizontal-align-left_2swIf",
            "table-cell-module_leftBorder_fPexc","table-cell-module_bottomBorder_MkTkL",
            "table-cell-module_fixed_bC1cY","cells_bodyCell_3QMlH","cells_actionsCell_3SyT6"
        ]);
        let btn = gen("btn",[
            "button-module_button_g4tks","button-module_size-400_K+ozR",
            "typography-module_body-500-true_+b9qw","button-module_secondary_BZ2cY",
            "button-module_fill_PtW3Z","button-module_light_DPbxA"
        ]);
        let span = gen("span",["button-module_text_Sj3v5"]);
        span.textContent = "Штрих-код";
        btn.appendChild(span);
        td.appendChild(btn);
        btn.addEventListener("click",()=>{
            barcodeLogic(tr);
        });
        return td;
    }
    parseTrs();
    for (let tr of trs){
        tr.trBlock.appendChild(genBtn(tr));
    }
}

function barcodesLogic() {
    parseTrs();
    for (let tri in trs){
        setTimeout(()=>{
            barcodeLogic(trs[tri]);
        },timeoutFromBarcodesLogic*tri);
    }
}
function barcodeLogic(tr) {
    function getArticulData(articul) {
        console.log("GET DATA FROM: " + articul);
        let path = "https://localhost:8080/info/name/"+articul;
        path = "http://localhost:8080/info/all/21230-1701138-10";
        console.log("path: "+path);
        fetch(path)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    }
    for (let articul of tr.articuls){
        let data = getArticulData(articul);
    }
}

let trs;
class TrData{
    constructor(trBlock, articulColumn) {
        if (trBlock==null) return;
        this.trBlock = trBlock;
        this.articuls = [];
        this.links = [];
        let articulBlock = trBlock.children[articulColumn];

        let openBtn = articulBlock.querySelector(".button-module_text_Sj3v5");
        if (openBtn!==null) openBtn.click();

        setTimeout(()=>{
            let articulsTextBlocks = articulBlock.children[0].children;

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
        },0);
    }
}
function parseTrs() {
    trs = [];
    function getArticulColumn() {
        let tableMainLine = document.querySelector("tr" +
            ".table-row-module_row_JSSv0");
        let articulColumnNum = 0;
        for (let td of tableMainLine.children) {
            if (td.textContent.startsWith("Артикул, количество")) break;
            articulColumnNum++;
        }
        return articulColumnNum;
    }
    function read(articulColumn) {
        let trElements = document.querySelectorAll("tr" +
            ".table-row-module_row_JSSv0" +
            ".table-row-module_hoverable_TM5IW");
        for (let trBlock of trElements){
            trs.push(new TrData(trBlock, articulColumn));
        }
    }
    read(getArticulColumn());
}

function isElement(obj) {
    try {
        return obj instanceof HTMLElement;
    }
    catch(e){
        return false;
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

//mainGui();