import {loadGui} from "./gui.js";

function main() {
    function test() {
        let trsElements = document.querySelectorAll("tr" +
            ".table-row-module_row_JSSv0" +
            ".table-row-module_hoverable_TM5IW");
        return trsElements.length !== 0;
    }
    let interval = setInterval(() => {
        if (test()){
            clearInterval(interval);
            loadGui();
        }
    }, 100);
}

main();