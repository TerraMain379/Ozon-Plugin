let int = setInterval(() => {
    let list = document.querySelector(".dropdown-module_wrapper_w9ET7");
    if (list!=null){
        let btn = document.querySelector(".OZONHELPER-dropbtn");
        if (btn == null){
            let div1 = document.createElement("div");
            div1.setAttribute("class","OZONHELPER-dropbtn data-cell-module_dataCell_z0Yiq dropdown-item-module_dropdownItem_99nD2 dropdown-item-module_size-500_pB5xD");
            div1.setAttribute("style","--columns: 1fr; --level-scale: 0;");
            let div2 = document.createElement("div");
            div2.setAttribute("class","data-cell-module_content_aVq4j");
            let div3 = document.createElement("div");
            div3.setAttribute("class","data-content-module_dataContent_WW8ES data-content-module_size-500_IV0sv data-content-module_light_MSazM dropdown-item-module_dataContent_H0JSS");
            let div4 = document.createElement("div");
            div4.setAttribute("class","data-content-module_label_fGS+z data-content-module_label-size-500_Cc6l0 typography-module_table-500_N-tJ7");
            div4.textContent = "штрихкоды";
            div1.addEventListener("click",() => {
                barcodesLogic();
            });
            div3.appendChild(div4);
            div2.appendChild(div3);
            div1.appendChild(div2);
            list.appendChild(div1);
        }
    }
},500);

function barcodesLogic() {
    let trs = document.querySelector("tbody").children;
    let articuls = [];
    for (let tr of trs){
        let cheked = tr.querySelector(".checkbox-module_checkbox_PWZqO").checked;
        if (cheked) {
            for (let el of tr.querySelectorAll(".two-line-cell_primary_10JdL")) {
                articuls.push(el.querySelector("a").textContent);
            }
        }
    }
    generate(articuls);
}
function generate(arts) {
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