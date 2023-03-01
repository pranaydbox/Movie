var onloadtime;
window.onload = () => {
    onloadtime = new Date(Date.now());
    $(document).ready(() => {
        $.get(host+"/movies/getmovies", (data, status) => {
            addMoviesTopage(data);
        })
    })
    // $.get(host+"/movies/gettopsixmovies",(data,status)=>{
    //     addTop3MoviesCarousel(data);
    // })
}


window.onbeforeunload = function (e) {
    // e.returnValue = 'onbeforeunload';
    var difftime = (new Date(Date.now()).getTime() - onloadtime.getTime()) / 1000;
    var obj = {
        name: "Movies",
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

function addTop3MoviesCarousel(obj) {
    // alert(obj)
    // console.log(obj[0].cardImage)
    let str = ""
    for (var i = 0; i < 2; i++) {
        str = str + `<div class="single-carusel">
                <div class="thumb relative">
                <div class="overlay overlay-bg"></div>
                    <img class="img-fluid" src="${obj[i].coverImage}" alt="">
                </div>
                <div class="price-detials">
                    <a href="#" class="price-btn">Starting From <span>$250</span></a>
                </div>
                <div class="details">
                    <h4 class="text-white">hello</h4>
                    <p class="text-white">
                        Cairo, Egypt
                    </p>
                </div>								
			</div>\n`

    }
    $("#moviesTop3Carousel").append(
        str
    )
    $("#moviesTop3Carousel").carousel({ slide: true, ride: true });
}




function addMoviesTopage(obj) {
    $("#moviesBodyContainer").hide()
    for (x in obj) {
        data = obj[x];
        console.log(data);
        // <div id='movieCardSubTags' style='color:white'>" + data.languages[0] + "/" + data.category[0] + "</div>
        var ele = document.createElement("div");
        ele.innerHTML = "<div class='single-destinations' style='display:flex;flex-direction:column;cursor:pointer;justify-content:center;align-items:center;border-radius:20px'><div class='thumb' onclick='show(" + data.movieId + ")'><img style='border-top-left-radius: 20px;border-top-right-radius:20px' src=" + data.cardImage + " alt=''></div><div id='movieCardName' style='color:white;font-size:15px;font-weight: bold;padding:2px'>" + data.name + "</div><div style='font-size:20px;width:100%;text-align:center;padding:6px;font-weight:normal;border-bottom-left-radius: 20px;border-bottom-right-radius:20px;background:linear-gradient(to right,black,grey,black);color:white'>Book Ticket</div></div>"
        ele.className = "col-lg-3 movieCard";
        ele.id = data.movieId;
        $("#mm").append(ele);
    }
}

function show(id) {
    location.href = "movie.html#" + id;
}


function selectcategories() {
    var res = $("#categories").css('display')
    if (res == 'none') {
        $("#categories").css({ 'display': 'inline' })
    }
    else {
        $("#categories").css({ 'display': 'none' })
    }
}
function selectformats() {
    var res = $("#formats").css('display')
    if (res == 'none') {
        $("#formats").css({ 'display': 'inline' })
    }
    else {
        $("#formats").css({ 'display': 'none' })
    }
}
function selectlanguages() {
    var res = $("#languages").css('display')
    if (res == 'none') {
        $("#languages").css({ 'display': 'inline' })
    }
    else {
        $("#languages").css({ 'display': 'none' })
    }
}
const category = { thriller: 0, action: 0, adventure: 0, comedy: 0, suspense: 0 }
const language = { Telugu: 0, Hindi: 0, English: 0, Kannada: 0, Malayalam: 0 }
const format = { twoD: 0, threeD: 0, fourDX: 0, IMAX: 0 }
function categories(cat) {
    if (category[cat] == 0) {
        $("#" + cat).css({ 'background-color': 'black', 'color': 'white', 'box-shadow': '2px 2px 8px 2px grey', 'font-weight': 'bold' })
        category[cat] = 1;
    }
    else {
        $("#" + cat).css({ 'background-color': 'white' })
        category[cat] = 0
    }

}
function languages(lan) {
    if (language[lan] == 0) {
        $("#" + lan).css({ 'background-color': 'black', 'color': 'white', 'box-shadow': '2px 2px 8px 2px grey', 'font-weight': 'bold' })
        language[lan] = 1;
    }
    else {
        $("#" + lan).css({ 'background-color': 'white' })
        language[lan] = 0;
    }

}
function formats(form) {
    if (format[form] == 0) {
        $("#" + form).css({ 'background-color': 'black', 'color': 'white', 'box-shadow': '2px 2px 8px 2px grey', 'font-weight': 'bold' })
        format[form] = 1
    }
    else {
        $("#" + form).css({ 'background-color': 'white' })
        format[form] = 0;
    }
}
$("#applyfilters").click(function () {
    $("#mm").hide()
    var obj = {
        category: category,
        format: format,
        language: language
    }
    console.log(obj)
    $.post(host+"/movies/getmoviesbyfilters", obj, (hr, status, data) => {
        // alert(data.responseText);"
        $("#moviesBodyContainer").html("");
        var obj = JSON.parse(data.responseText);
        for (x in obj) {
            data = obj[x];
            console.log(data);
            var ele = document.createElement("div");
            ele.innerHTML = "<div class='single-destinations' style='display:flex;flex-direction:column;cursor:pointer;justify-content:center;align-items:center;border-radius:20px'><div class='thumb' onclick='show(" + data.movieId + ")'><img style='border-top-left-radius: 20px;border-top-right-radius:20px' src=" + data.cardImage + " alt=''></div><div id='movieCardName' style='color:white;font-size:15px;font-weight: bold;padding:2px'>" + data.name + "</div><div style='font-size:20px;width:100%;text-align:center;padding:6px;font-weight:normal;border-bottom-left-radius: 20px;border-bottom-right-radius:20px;background:linear-gradient(to right,black,grey,black);color:white'>Book Ticket</div></div>"
            ele.className = "col-lg-3 movieCard";
            ele.id = data.movieId;
            $("#moviesBodyContainer").append(ele);

        }
        $("#mm").hide()
        $("#moviesBodyContainer").show()
        if (obj.length == 0) alert("No movies! Please apply filters")
    })
})