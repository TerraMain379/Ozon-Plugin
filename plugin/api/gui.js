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