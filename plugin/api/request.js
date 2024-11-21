async function request(url, method, body, headerParams, okAction, errAction, conErrAction) {
    console.log("body: " + JSON.stringify(body));
    try {
        // Отправка запроса с помощью fetch
        const response = await fetch(url, {
            method: method,
            headers: headerParams,
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            conErrAction(response);
        }
        else {
            let data = await response.json();
            okAction(data);
        }
    } catch (error) {
        errAction(error);
    }
}
async function ozonRequest(url, method, body, clientId, apiKey, okAction, errAction){
    if (url.startsWith("/")){
        url = "https://api-seller.ozon.ru" + url;
    }
    let headerParams = {
        "Client-Id": clientId,
        "Api-Key": apiKey
    };
    await request(url, method, body, headerParams, okAction, errAction);
}