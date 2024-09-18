loadSettings();
function saveSettings() {
    console.log(localStorage.getItem("setting1"));
    localStorage.setItem("setting1", JSON.stringify(document.querySelector("#s1").checked));
    localStorage.setItem("setting2", JSON.stringify(document.querySelector("#s2").checked));
}
function loadSettings() {
    document.querySelector("#s1").checked = JSON.parse(localStorage.getItem("setting1"));
    document.querySelector("#s2").checked = JSON.parse(localStorage.getItem("setting2"));
}
//loadSettings();
document.querySelector("#s1").addEventListener("change",() => {
    saveSettings();
});
document.querySelector("#s2").addEventListener("change",() => {
    saveSettings();
});