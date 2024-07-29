export async function getTab() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab;
}
export async function getTabData(dataType){
    const tab = await getTab();
    return tab[dataType];
}
export async function sendJS(params) {
    if (typeof params === "string") params = {jsFile: params}
    if (params.tabId === undefined) params.tabId = await getTabData("id");
    try {
        chrome.scripting.executeScript({
            target: {tabId: params.tabId, allFrames: true},
            files: [params.jsFile]
        });
    } catch (error){
        return false;
    }
    return true;
}









/**
 * @deprecated This function is deprecated and will be removed in future releases.
 * Use getTabData("id") instead.
 */
export async function getCurrentTabId() {
    try {
        const currentTab = await getTab();
        return currentTab.id;
    } catch (error) {
        throw new Error(`Unable to get current tab ID: ${error.message}`);
    }
}