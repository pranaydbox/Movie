var onloadtime;
window.onload = function () {
    onloadtime = new Date(Date.now());
    $.get(host+"/theatres/gettopthreetheatres", (data, status) => {
        addtop3theatres(data);
    })
    $.get(host+"/movies/gettopsixmovies", (data, status) => {
        addtop6movies(data);
    })

}

window.onbeforeunload = function (e) {
    // e.returnValue = 'onbeforeunload';
    var difftime = (new Date(Date.now()).getTime() - onloadtime.getTime()) / 1000;
    var obj = {
        name: "Home",
        count: "1",
        loggedvisits: "1",
        time: Math.round(difftime) + "",
        bouncerate: "0"
    }
    if (difftime <= 10) {
        obj.bouncerate = "1";
    }
    if (localStorage.getItem("currentLoginUser") == 1) {
        obj.loggedvisits = "0";
    }
    console.log(obj);
    $.post(host+"/analytics/updatedata", obj, (xhr, status, responseText) => {
        console.log(responseText.responseText);
    })
}; 



function addtop3theatres(obj) {
    var price = { "category D": 120, "category C": 150, "category B": 180, "category A": 200 }
    for (x in obj) {
        $("#top3theatres").append(
            `<div class="col-lg-4">
            <div class="single-destination relative">
                <div class="thumb relative">
                    <div class="overlay overlay-bg"></div>
                    <img class="img-fluid" src="${obj[x].theatreImage}" alt="">
                </div>
                <div class="desc">	
                    <a href="theatres.html" class="price-btn">₹${price[obj[x].category]}</a>			
                    <h4>${obj[x].theatreName}</h4>
                    <p>${obj[x].location}</p>			
                </div>
            </div>
        </div>`
        )
    }
}
function addtop6movies(obj) {
    for (x in obj) {
        $("#top6movies").append(

            `<div class="col-lg-4">
            <div class="single-destination relative">
                <div class="thumb relative">
                    <div class="overlay overlay-bg"></div>
                    <img class="img-fluid" src="${obj[x].coverImage}" alt="">
                </div>
                <div class="desc">	
                    <a href="movies.html" class="price-btn">Book now</a>			
                    <h4>${obj[x].name}</h4>
                    <p>${obj[x].category}</p>			
                </div>
            </div>
        </div>`

        )
    }
    $("#top6movies").carousel()
}