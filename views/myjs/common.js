
// const host="https://movieflix.prashantdey.in"
const host = "https://movieflixapi.prashantdey.in"
// const host="http://localhost:3333"
$(document).ready(() => {
    $("#lgout").click(async () => {
        let del = await $.get(host + "/auth/logout")
        localStorage.setItem("currentLoginUser", 1);
        localStorage.setItem("jwt", "no token");
    })
})


async function gettoken() {
    let token;
    if(localStorage.getItem('jwt')!=null && localStorage.getItem('jwt')!="no token" )
        token=localStorage.getItem('jwt')
    else 
        token = await $.get(host + "/auth/gettoken");

    localStorage.setItem("jwt", token);
    if (token != "no token") {
        var base64Url = token.split(".")[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        jsonPayload = JSON.parse(jsonPayload);
        localStorage.setItem("currentLoginUser", jsonPayload.email);
    }
    else {
        localStorage.setItem("currentLoginUser", 1);
    }

}



gettoken();



// async function deleteAllCookies() {
//     let del = await $.get(host + "/auth/logout")
// }