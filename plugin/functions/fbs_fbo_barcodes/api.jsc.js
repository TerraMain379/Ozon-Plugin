//JSC:::import api/request.js

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