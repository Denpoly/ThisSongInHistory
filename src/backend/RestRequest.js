export class RestRequest {
    static get(urlParam, apiKey) {
        let p = new Promise((res, rej) => {
            const HTTP = new XMLHttpRequest();
            const url = urlParam;
            HTTP.open("GET", url);
            if (apiKey) {
                HTTP.setRequestHeader("Authorization", "Bearer " + apiKey);
            }
            HTTP.send();
            HTTP.onerror = (e) => {
                rej(e.message);
                console.log("whoops");
            }
            HTTP.onload = (e) => {
                const response = HTTP.responseText
                res(response);
            }
        });
        return p;
    }

    static postSpotifyAuthKey(urlParam, clientString) {
        console.log("function call");
        let p = new Promise((res, rej) => {
            const HTTP = new XMLHttpRequest();
            const url = urlParam;
            const body = "grant_type=client_credentials"
            HTTP.open("POST", url);
            HTTP.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            HTTP.setRequestHeader("Authorization", "Basic "+ btoa(clientString) );
            HTTP.send(body);
            HTTP.onerror = (e) => {
                rej(HTTP.responseText);
            }
            HTTP.onload = (e) => {
                const response = HTTP.responseText
                console.log("here")
                res(response);
            }
        });
        return p;
    }

    static getAuthKey(clientString) {
        var cookie = document.cookie
        var d = new Date()
        let p = new Promise((res, rej) => {
            if (!cookie) {
                console.log("here")
                this.postSpotifyAuthKey("https://accounts.spotify.com/api/token" ,clientString).then((val) => {
                    let response = JSON.parse(val);
                    let accessToken = response["access_token"];
                    let expires = response["expires_in"];
                    console.log(expires)
                    d.setTime(d.getTime() + expires*1000);
                    document.cookie = "key= " + accessToken + "; expires=" + d.toUTCString() + ";";
                    res(accessToken);
                });
            }
            else {
                res(cookie.substring(4));
            }
        });
        return p;
    }
}
export default RestRequest