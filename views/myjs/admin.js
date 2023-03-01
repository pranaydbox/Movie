window.onload = () => {
    $(document).ready(() => {
        // $.ajaxSetup({
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json',
        //         'jwt':localStorage.getItem('jwt')
        //     }
        // });
        // alert(100)
        // $.post(host + "/auth/validate",{jwt:localStorage.getItem('jwt')},xhr,status,responseText)
        // {
        //     if (responseText.responseText == "Not authorized") {
        //         window.location.href = "https://localhost:5500" + "/register.html";
        //     }
        // }
        $.post(host +"/auth/validate", { jwt:localStorage.getItem('jwt') }, (xhr, status, responseText) => {
            if (responseText.responseText == "Not authorized") {
                window.location.href = "https://movieflix.prashantdey.in/temp2/views/register.html";
            }
        })
        $.get(host + "/users/getusers", (data, status) => {
            // if (data == "Not authorized") {
            //     window.location.href = "https://movieflix.prashantdey.in" + "/register.html";
            // }
            addUsersToAdminPage(data);
        })
        $.get(host + "/queries/getqueries", (data, status) => {
            addQueriesToAdmin(data);
        })
        $.get(host + "/theatres/getacceptedtheatres", (data, status) => {
            addAcceptedTheatrestoAdmin(data);
        })
        $.get(host + "/movies/getmovies", (data, status) => {
            addMoviesToAdmin(data);
        })
        $.get(host + "/theatres/gettheatre/category A", (data, status) => {
            var obj = data;
            for (x in obj) {
                $("#a").append(
                    `<div class="card" style="display:flex;flex-direction:row;border-radius:20px;padding: 20px;justify-content:space-evenly;align-items: center;box-shadow: 1px 0px 3px 1px grey;background-color: white;color:black;">
                    <img src="../${obj[x].theatreImage}" class="card-img-left" style="width:100px;height:100px;border-radius:50%;">
                    <div class="card-body" style="display:flex;flex-direction:row;justify-content: space-evenly;align-items:center;margin: 0%;padding: 0%;">
                        <div style="font-size: 20px;font-weight:600;">${obj[x].theatreName}</div>
                        <div style="font-size: 20px;font-weight:600;">${obj[x].location}</div>
                        <div onclick="accepttheatre('${obj[x].ownerEmail}')" style="background-color:#66ff1a;padding:8px 16px;font-size:17px" class="btn">Accept</div>
                        <div onclick="rejecttheatre('${obj[x].ownerEmail}')" style="background-color:red;padding:8px 16px;font-size:17px" class="btn">Reject</div>
                    </div>
                </div>`
                )
            }
        })
        $.get(host + "/theatres/gettheatre/category B", (data, status) => {
            var obj = data;
            for (x in obj) {
                $("#b").append(
                    `<div class="card" style="display:flex;flex-direction:row;border-radius:20px;padding: 20px;justify-content:space-evenly;align-items: center;box-shadow: 1px 0px 3px 1px grey;background-color: white;color:black;">
                        <img src="../${obj[x].theatreImage}" class="card-img-left" style="width:100px;height:100px;border-radius:50%;">
                        <div class="card-body" style="display:flex;flex-direction:row;justify-content: space-evenly;align-items:center;margin: 0%;padding: 0%;">
                            <div style="font-size: 20px;font-weight:600;">${obj[x].theatreName}</div>
                            <div style="font-size: 20px;font-weight:600;">${obj[x].location}</div>
                            <div onclick="accepttheatre('${obj[x].ownerEmail}')" style="background-color:#66ff1a;padding:8px 16px;font-size:17px" class="btn">Accept</div>
                            <div onclick="rejecttheatre('${obj[x].ownerEmail}')" style="background-color:red;padding:8px 16px;font-size:17px" class="btn">Reject</div>
                        </div>
                    </div>`
                )
            }
        })
        $.get(host + "/theatres/gettheatre/category C", (data, status) => {
            var obj = data;
            for (x in obj) {
                $("#c").append(
                    `<div class="card" style="display:flex;flex-direction:row;border-radius:20px;padding: 20px;justify-content:space-evenly;align-items: center;box-shadow: 1px 0px 3px 1px grey;background-color: white;color:black;">
                    <img src="../${obj[x].theatreImage}" class="card-img-left" style="width:100px;height:100px;border-radius:50%;">
                    <div class="card-body" style="display:flex;flex-direction:row;justify-content: space-evenly;align-items:center;margin: 0%;padding: 0%;">
                        <div style="font-size: 20px;font-weight:600;">${obj[x].theatreName}</div>
                        <div style="font-size: 20px;font-weight:600;">${obj[x].location}</div>
                        <div onclick="accepttheatre('${obj[x].ownerEmail}')" style="background-color:#66ff1a;padding:8px 16px;font-size:17px" class="btn">Accept</div>
                        <div onclick="rejecttheatre('${obj[x].ownerEmail}')" style="background-color:red;padding:8px 16px;font-size:17px" class="btn">Reject</div>
                    </div>
                </div>`
                )
            }
        })
        $.get(host + "/theatres/gettheatre/category D", (data, status) => {
            var obj = data;
            for (x in obj) {
                $("#d").append(
                    `<div class="card" style="display:flex;flex-direction:row;border-radius:20px;padding: 20px;justify-content:space-evenly;align-items: center;box-shadow: 1px 0px 3px 1px grey;background-color: white;color:black;">
                        <img src="../${obj[x].theatreImage}" class="card-img-left" style="width:100px;height:100px;border-radius:50%;">
                        <div class="card-body" style="display:flex;flex-direction:row;justify-content: space-evenly;align-items:center;margin: 0%;padding: 0%;">
                            <div style="font-size: 20px;font-weight:600;">${obj[x].theatreName}</div>
                            <div style="font-size: 20px;font-weight:600;">${obj[x].location}</div>
                            <div onclick="accepttheatre('${obj[x].ownerEmail}')" style="background-color:#66ff1a;padding:8px 16px;font-size:17px" class="btn">Accept</div>
                            <div onclick="rejecttheatre('${obj[x].ownerEmail}')" style="background-color:red;padding:8px 16px;font-size:17px" class="btn">Reject</div>
                        </div>
                    </div>`
                )
            }
        })
        $.get(host + "/analytics/getalldata", (data, status) => {
            insertgraphstoadmin(data);
        })
    })
}

var homeobj = {
    count: 0,
    bouncerate: 0,
    time: 0,
    loggedvisits: 0
}
var moviesobj = {
    count: 0,
    bouncerate: 0,
    time: 0,
    loggedvisits: 0
}
var theatresobj = {
    count: 0,
    bouncerate: 0,
    time: 0,
    loggedvisits: 0
}
var contactobj = {
    count: 0,
    bouncerate: 0,
    time: 0,
    loggedvisits: 0
}
var aboutobj = {
    count: 0,
    bouncerate: 0,
    time: 0,
    loggedvisits: 0
}
var profileobj = {
    count: 0,
    bouncerate: 0,
    time: 0,
    loggedvisits: 0
}

days = []
daywisehomecount = []
daywisemoviescount = []
daywisetheatrescount = []
daywisecontactcount = []
daywiseaboutcount = []
daywiseprofilecount = []
daywisehometime = []
daywisemoviestime = []
daywisetheatrestime = []
daywisecontacttime = []
daywiseabouttime = []
daywiseprofiletime = []


function calculateoverall(home, movies, theatres, contact, about, profile) {
    homes = home.visitsdata;
    for (x in homes) {
        homeobj.count += parseInt(homes[x].count);
        homeobj.bouncerate += parseInt(homes[x].bouncerate);
        homeobj.time += parseInt(homes[x].time);
        homeobj.loggedvisits += parseInt(homes[x].loggedvisits);
        daywisehomecount.push(homes[x].count)
        daywisehometime.push(homes[x].time)
    }
    moviess = movies.visitsdata;
    for (x in moviess) {
        moviesobj.count += parseInt(moviess[x].count);
        moviesobj.bouncerate += parseInt(moviess[x].bouncerate);
        moviesobj.time += parseInt(moviess[x].time);
        moviesobj.loggedvisits += parseInt(moviess[x].loggedvisits);
        daywisemoviescount.push(moviess[x].count)
        daywisemoviestime.push(moviess[x].time)
        days.push(moviess[x].date);
    }
    theatress = theatres.visitsdata;
    for (x in theatress) {
        theatresobj.count += parseInt(theatress[x].count);
        theatresobj.bouncerate += parseInt(theatress[x].bouncerate);
        theatresobj.time += parseInt(theatress[x].time);
        theatresobj.loggedvisits += parseInt(theatress[x].loggedvisits);
        daywisetheatrescount.push(theatress[x].count)
        daywisetheatrestime.push(theatress[x].time)
    }
    contacts = contact.visitsdata;
    for (x in contacts) {
        contactobj.count += parseInt(contacts[x].count);
        contactobj.bouncerate += parseInt(contacts[x].bouncerate);
        contactobj.time += parseInt(contacts[x].time);
        contactobj.loggedvisits += parseInt(contacts[x].loggedvisits);
        daywisecontactcount.push(contacts[x].count)
        daywisecontacttime.push(contacts[x].time)
    }
    abouts = about.visitsdata;
    for (x in abouts) {
        aboutobj.count += parseInt(abouts[x].count);
        aboutobj.bouncerate += parseInt(abouts[x].bouncerate);
        aboutobj.time += parseInt(abouts[x].time);
        aboutobj.loggedvisits += parseInt(abouts[x].loggedvisits);
        daywiseaboutcount.push(abouts[x].count)
        daywiseabouttime.push(abouts[x].time)
    }
    profiles = profile.visitsdata;
    for (x in profiles) {
        profileobj.count += parseInt(profiles[x].count);
        profileobj.bouncerate += parseInt(profiles[x].bouncerate);
        profileobj.time += parseInt(profiles[x].time);
        profileobj.loggedvisits += parseInt(profiles[x].loggedvisits);
        daywiseprofilecount.push(profiles[x].count)
        daywiseprofiletime.push(profiles[x].time)
    }
    console.log(homeobj, theatresobj, moviesobj, contactobj, aboutobj, profileobj);

}


function makegrpchart() {
    var trace1 = {
        x: ['Home', 'Movies', 'Theatres', "Contact", "About", "Profile"],
        y: [homeobj.count, moviesobj.count, theatresobj.count, contactobj.count, aboutobj.count, profileobj.count],
        name: 'Count',
        type: 'bar'
    };

    var trace2 = {
        x: ['Home', 'Movies', 'Theatres', "Contact", "About", "Profile"],
        y: [homeobj.bouncerate, moviesobj.bouncerate, theatresobj.bouncerate, contactobj.bouncerate, aboutobj.bouncerate, profileobj.bouncerate],
        name: 'BounceRate',
        type: 'bar'
    };
    var trace3 = {
        x: ['Home', 'Movies', 'Theatres', "Contact", "About", "Profile"],
        y: [homeobj.time / 60, moviesobj.time / 60, theatresobj.time / 60, contactobj.time / 60, aboutobj.time / 60, profileobj.time / 60],
        name: 'Time',
        type: 'bar'
    };

    var trace4 = {
        x: ['Home', 'Movies', 'Theatres', "Contact", "About", "Profile"],
        y: [homeobj.loggedvisits, moviesobj.loggedvisits, theatresobj.loggedvisits, contactobj.loggedvisits, aboutobj.loggedvisits, profileobj.loggedvisits],
        name: 'Loggedvisits',
        type: 'bar'
    };
    var trace5 = {
        x: ['Home', 'Movies', 'Theatres', "Contact", "About", "Profile"],
        y: [homeobj.count - homeobj.loggedvisits, moviesobj.count - moviesobj.loggedvisits, theatresobj.count - theatresobj.loggedvisits, contactobj.count - contactobj.loggedvisits, aboutobj.count - aboutobj.loggedvisits, profileobj.count - profileobj.loggedvisits],
        name: 'NonLoggedvisits',
        type: 'bar'
    };

    var data = [trace1, trace2, trace3, trace4, trace5];

    var layout = { barmode: 'group' };

    Plotly.newPlot('overallgrpchart', data, layout);

}

function mkpiechart() {
    var data = [{
        type: "pie",
        values: [homeobj.count, moviesobj.count, theatresobj.count, contactobj.count, aboutobj.count, profileobj.count],
        labels: ['Home', 'Movies', 'Theatres', "Contact", "About", "Profile"],
        textinfo: "label+percent",
        insidetextorientation: "radial"
    }]

    var layout = [{
        height: 700,
        width: 700
    }]

    Plotly.newPlot('pichart', data, layout)
}

function mkdwcountchart() {
    var trace1 = {
        x: days,
        y: daywisehomecount,
        type: 'scatter',
        name: "Home"
    };

    var trace2 = {
        x: days,
        y: daywisemoviescount,
        type: 'scatter',
        name: "Movies"
    };
    var trace3 = {
        x: days,
        y: daywisetheatrescount,
        type: 'scatter',
        name: "Theatres"
    };

    var trace4 = {
        x: days,
        y: daywisecontactcount,
        type: 'scatter',
        name: "Contact"
    };
    var trace5 = {
        x: days,
        y: daywiseaboutcount,
        type: 'scatter',
        name: "About"
    };
    var trace6 = {
        x: days,
        y: daywiseprofilecount,
        type: 'scatter',
        name: "Profile"
    }

    var data = [trace1, trace2, trace3, trace4, trace5, trace6];


    Plotly.newPlot('daywisecountchart', data);
}

function mkdwtimechart() {
    var trace1 = {
        x: days,
        y: daywisehometime,
        type: 'scatter',
        name: "Home",
        fill: 'tonexty'
    };

    var trace2 = {
        x: days,
        y: daywisemoviestime,
        type: 'scatter',
        name: "Movies",
        fill: 'tonexty'
    };
    var trace3 = {
        x: days,
        y: daywisetheatrestime,
        type: 'scatter',
        name: "Theatres",
        fill: 'tonexty'
    };

    var trace4 = {
        x: days,
        y: daywisecontacttime,
        type: 'scatter',
        name: "Contact",
        fill: 'tonexty'
    };
    var trace5 = {
        x: days,
        y: daywiseabouttime,
        type: 'scatter',
        name: "About",
        fill: 'tonexty'
    };
    var trace6 = {
        x: days,
        y: daywiseprofiletime,
        type: 'scatter',
        name: "Profile",
        fill: 'tonexty'
    }

    var data = [trace1, trace2, trace3, trace4, trace5, trace6];


    Plotly.newPlot('daywisetimechart', data);
}


function mkavgtimepichart() {
    var data = [{
        type: "pie",
        values: [homeobj.time / homeobj.count, moviesobj.time / moviesobj.count, theatresobj.time / theatresobj.count, contactobj.time / contactobj.count, aboutobj.time / aboutobj.count, profileobj.time / profileobj.count],
        labels: ['Home', 'Movies', 'Theatres', "Contact", "About", "Profile"],
        textinfo: "label+percent",
        insidetextorientation: "radial"
    }]

    var layout = [{
        height: 700,
        width: 700
    }]

    Plotly.newPlot('avgtimepichart', data, layout)
}


function insertgraphstoadmin(data) {
    var home = data[0];
    var movies = data[1];
    var theatres = data[2];
    var contact = data[3];
    var about = data[4];
    var profile = data[5];
    calculateoverall(home, movies, theatres, contact, about, profile);
    makegrpchart();
    mkpiechart();
    mkdwcountchart();
    mkdwtimechart();
    mkavgtimepichart()
}


function addMoviesToAdmin(arr) {
    for (x in arr) {
        obj = arr[x];
        // var ele = document.createElement("div");
        // ele.className = "list-group-item pt-0";
        // ele.id = obj.movieId;
        var ele = `<div id = ${obj.movieId} class="row" style="color:black;padding:20px;display:flex;justify-content:center;align-items:center;margin:20px;background-color:white;border-radius:30px;box-shadow:2px 1px 5px 2px grey;">
            <div class="col-lg-3"><img  src="../${obj.cardImage}" style="width:5rem;height:5rem;border-radius:50%"></div>
            <div class="col-lg-3" style="font-size:18px;font-weight:700" >${obj.name}</div>
            <div class="col-lg-3"><a style="padding:8px 20px;color:black;background-color:blue;border-radius:10px;"  href="reviews.html#${obj.movieId}"+>Reviews</a></div>
            <div class="col-lg-3"<div style="padding:6px 10px;color:remove;background-color:red;border-radius:10px;width:9%;cursor:pointer;text-align:center" onclick="deletemovie('${obj.movieId}')">Remove</div></div>
        </div>`
        $("#allMoviesData").append(ele);
    }

    // for (x in obj) {
    //     $("#theatretablebody").append(
    //         `<div class="card row" style="display:flex;flex-direction:row;justify-content:space-evenly;align-items:center;background-color: black;box-shadow: 1px 0px 3px 1px grey;padding: 10px;">
    //             <div  class="col-lg-2" style="text-align: center;"style="margin:0px;padding:0px;">${obj[x].theatreId}</div>
    //             <div class="col-lg-2" style="text-align: center;">${obj[x].ownerEmail}</div>
    //             <div class="col-lg-2" style="text-align: center;">${obj[x].theatreName}</div>
    //             <div class="col-lg-2" style="text-align: center;">${obj[x].location}</div>
    //             <div class="col-lg-2" style="text-align: center;">${obj[x].category}</div>
    //             <div class="btn col-lg-2" style="background-color:red;border-radius:10px;" onclick="removetheatrefromtheatresadmin('${obj[x].ownerEmail}')">Remove</div>
    //       </div>`
    //     )
    // }
}


function deletemovie(movieId) {
    $.post(host + "/movies/removemovie", { movieId: movieId }, (hr, status, data) => {
        alert(responseText.responseText);
    })
}

function addAcceptedTheatrestoAdmin(obj) {
    for (x in obj) {
        $("#theatretablebody").append(
            `<div class="card row" style="display:flex;flex-direction:row;justify-content:space-evenly;align-items:center;background-color:white;box-shadow: 1px 0px 3px 1px grey;padding: 10px;color:black">
                <div  class="col-lg-2" style="text-align: center;"style="margin:0px;padding:0px;">${obj[x].theatreId}</div>
                <div class="col-lg-2" style="text-align: center;">${obj[x].ownerEmail}</div>
                <div class="col-lg-2" style="text-align: center;">${obj[x].theatreName}</div>
                <div class="col-lg-2" style="text-align: center;">${obj[x].location}</div>
                <div class="col-lg-2" style="text-align: center;">${obj[x].category}</div>
                <div class="btn col-lg-2" style="background-color:red;border-radius:10px;" onclick="removetheatrefromtheatresadmin('${obj[x].ownerEmail}')">Remove</div>
          </div>`
        )
    }

}

function removetheatrefromtheatresadmin(ownerEmail) {
    $.post(host + "/theatres/removetheatre", { ownerEmail: ownerEmail }, (xhr, status, responseText) => {
        alert(responseText.responseText)
    })
}


function addUsersToAdminPage(obj) {
    var x = 1;
    for (key in obj) {
        var ele = document.createElement('tr');
        ele.innerHTML = `<td>${x}</td><td>${obj[key].name}</td><td>${obj[key].mobile}</td><td>${obj[key].email}</td>`;
        x++;
        $("#userdata").append(ele);
    }
    $(document).ready(function () {
        $("#userdata").dataTable({
            // data:obj,
            // columns:[
            //     {"mDate":null},
            //     {"mData":"name"},
            //     {"mData":"mobile"},
            //     {"mData":"email"}
            // ]
        })

    })
}
// }


function addQueriesToAdmin(obj) {
    for (k in obj) {
        var ele = document.createElement('tr');
        ele.innerHTML = `<td>${obj[k].name}</td><td>${obj[k].email}</td><td>${obj[k].subject}</td><td>${obj[k].message}</td>`;
        $("#enq").append(ele);
    }
    $("#enq").dataTable();
    // $(document).ready(()=>{
    //     $("#enquiries").dataTable({
    //         data:obj,
    //         columns:[
    //             {"mData":"name"},
    //             {"mData":"email"},
    //             {"mData":"subject"},
    //             {"mData":"message"},
    //         ]
    //     })  
    // })

}

function displayUsers() {
    $("#usersData").css("display", "table")
    $("#addMoviesData").css("display", "none")
    $("#addTheatresData").css("display", "none")
    $("#enquiries").css("display", "none")
    $("#analyticsgraphs").css("display", "none")
}


function displayMovies() {
    $("#usersData").css("display", "none")
    $("#addMoviesData").css("display", "block")
    $("#addTheatresData").css("display", "none")
    $("#enquiries").css("display", "none")
    $("#analyticsgraphs").css("display", "none")
}


function displayqueries() {
    $("#usersData").css("display", "none")
    $("#addMoviesData").css("display", "none")
    $("#addTheatresData").css("display", "none")
    $("#enquiries").css("display", "table")
    $("#analyticsgraphs").css("display", "none")
}

function displayTheatres() {
    $("#usersData").css("display", "none")
    $("#addMoviesData").css("display", "none")
    $("#addTheatresData").css("display", "block")
    $("#enquiries").css("display", "none")
    $("#analyticsgraphs").css("display", "none")
}

function displayAnalytics() {
    $("#usersData").css("display", "none")
    $("#addMoviesData").css("display", "none")
    $("#addTheatresData").css("display", "none")
    $("#enquiries").css("display", "none")
    $("#analyticsgraphs").css("display", "block")
}




function accepttheatre(ownerEmail) {
    if (localStorage.getItem("theatreemails") == null) {
        localStorage.setItem(ownerEmail, "1")
    }
    $.post(host + "/theatres/accepttheatre", { ownerEmail: ownerEmail }, (xhr, status, responseText) => {
        alert(responseText.responseText);
    })

}


function rejecttheatre(ownerEmail) {
    $.post(host + "/theatres/rejecttheatre", { ownerEmail: ownerEmail }, (xhr, status, responseText) => {
        alert(responseText.responseText);
    })
}



var theatreArr = []
var movieArr = []

$(document).ready(() => {
    $("#theatreSaveAndAddBtn").click(() => {
        var obj = {
            theatre: $("#addTheatreSelect").val(),
            price: $("#theatrePrice").val(),
            startDate: $("#theatreStartDate").val(),
            endDate: $("#theatreEndDate").val()
        }
        theatreArr.push(obj);
        $("#addTheatreSelect").val("null1"),
            $("#theatrePrice").val(null),
            $("#theatreStartDate").val(null),
            $("#theatreEndDate").val(null)
    })
    $("#addMovieBtn").click(() => {
        var theatreObjects = []
        for (i in theatreArr) {
            theatreObjects.push(theatreArr[i]);
        }
        var obj = {
            movieId: $("#addMovieId").val(),
            name: $("#addMovieName").val(),
            cardImage: $("#addMovieImUrl").val(),
            coverImage: $("#addMovieCoverImUrl").val(),
            description: $("#addMovieDescription").val(),
            category: $("#addMovieCategory").val(),
            format: $("#addMovieFormat").val(),
            duration: $("#addMovieDuration").val(),
            language: $("#addMovieLang").val(),
            bookings: 0,
            theatreObjects: theatreObjects
        }
        $.post(host + "/movies/addmovie", obj, (xhr, status, responseText) => {
            alert(responseText.responseText);
            window.location.href = "admin.html";
        })
    })





})





$(document).ready(() => {
    $("#MovieSaveAndAddBtn").click(() => {
        var obj = {
            movie: $("#addMovieSelect").val(),
            price: $("#moviePrice").val(),
            startDate: $("#movieStartDate").val(),
            endDate: $("#movieEndDate").val()
        }
        movieArr.push(obj);
        $("#addMovieSelect").val("null")
        $("#moviePrice").val("null");
        $("#movieStartDate").val("null");
        $("#movieEndDate").val("null")
    })
    $("#addTheatreBtn").click(() => {
        var movieObjects = []
        for (x in movieArr) {
            movieObjects.push(movieArr[x])
        }
        var obj = {
            theatreId: $("#addTheatreId").val(),
            name: $("#addTheatreName").val(),
            theatreImage: $("#addTheatreImUrl").val(),
            location: $("#addTheatreLocation").val(),
            bookings: 0,
            movieObjects: movieObjects,
        }
        $.post(host + "/theatres/addtheatre", obj, (xhr, status, responseText) => {
            alert(responseText.responseText);
            window.location.href = "admin.html";
        })
    })

    $("#theatres-background").click(function () {
        theatres()
    })
    $("#theatres-aside").click(function () {
        theatres()
    })
    function theatres() {
        $("#theatres-background").css({ backgroundColor: "black" })
        $("#users-background").css({ backgroundColor: "white" })
        $("#enquiries-background").css({ backgroundColor: "white" })
        $("#movies-background").css({ backgroundColor: "white" })
        $(".theatres-text").css({ color: "white" })
        $(".users-text").css({ color: "#012970" })
        $(".enquiries-text").css({ color: "#012970" })
        $(".movies-text").css({ color: "#012970" })

        $("#theatres-aside").css({ "background-color": "black", 'color': 'white', 'box-shadow': '2px 2px 8px 2px grey' })
        $("#movies-aside").css({ 'background-color': 'white', 'color': 'black' })
        $("#users-aside").css({ 'background-color': 'white', 'color': 'black' })
        $("#queries-aside").css({ 'background-color': 'white', 'color': 'black' })
    }
    $("#users-background").click(function () {
        users();
    })
    $("#users-aside").click(function () {
        users();
    })
    function users() {
        $("#theatres-background").css({ backgroundColor: "white" })
        $("#users-background").css({ backgroundColor: "black" })
        $("#enquiries-background").css({ backgroundColor: "white" })
        $("#movies-background").css({ backgroundColor: "white" })
        $(".theatres-text").css({ color: "#012970" })
        $(".users-text").css({ color: "white" })
        $(".enquiries-text").css({ color: "#012970" })
        $(".movies-text").css({ color: "#012970" })

        $("#users-aside").css({ "background-color": "black", 'color': 'white', 'box-shadow': '2px 2px 8px 2px grey' })
        $("#movies-aside").css({ 'background-color': 'white', 'color': 'black' })
        $("#theatres-aside").css({ 'background-color': 'white', 'color': 'black' })
        $("#queries-aside").css({ 'background-color': 'white', 'color': 'black' })
    }


    $("#enquiries-background").click(function () {
        enquiries()
    })
    $("#queries-aside").click(function () {
        enquiries()
    })
    function enquiries() {
        $("#theatres-background").css({ backgroundColor: "white" })
        $("#users-background").css({ backgroundColor: "white" })
        $("#movies-background").css({ backgroundColor: "white" })
        $("#enquiries-background").css({ backgroundColor: "black" })
        $(".theatres-text").css({ color: "#012970" })
        $(".users-text").css({ color: "#012970" })
        $(".enquiries-text").css({ color: "white" })
        $(".movies-text").css({ color: "#012970" })

        $("#queries-aside").css({ "background-color": "black", 'color': 'white', 'box-shadow': '2px 2px 8px 2px grey' })
        $("#movies-aside").css({ 'background-color': 'white', 'color': 'black' })
        $("#theatres-aside").css({ 'background-color': 'white', 'color': 'black' })
        $("#users-aside").css({ 'background-color': 'white', 'color': 'black' })
    }

    $("#movies-background").click(function () {
        movies()
    })
    $("#movies-aside").click(function () {
        movies()
    })
    function movies() {
        $("#theatres-background").css({ backgroundColor: "white" })
        $("#users-background").css({ backgroundColor: "white" })
        $("#enquiries-background").css({ backgroundColor: "white" })
        $("#movies-background").css({ backgroundColor: "black" })
        $(".theatres-text").css({ color: "#012970" })
        $(".users-text").css({ color: "#012970" })
        $(".enquiries-text").css({ color: "#012970" })
        $(".movies-text").css({ color: "white" })

        $("#movies-aside").css({ "background-color": "black", 'color': 'white', 'box-shadow': '2px 2px 8px 2px grey' })
        $("#theatres-aside").css({ 'background-color': 'white', 'color': 'black' })
        $("#users-aside").css({ 'background-color': 'white', 'color': 'black' })
        $("#queries-aside").css({ 'background-color': 'white', 'color': 'black' })
    }





})



$(document).ready(() => {
    $("#submitMovie").click(() => {
        if (localStorage.getItem("movieId") == null) {
            localStorage.setItem("movieId", 1);
        }
        // var cat = JSON.stringify($("#categories").val())
        // alert(typeof cat)
        // var category=cat.split(",")
        // alert(category)

        var name = $("#movie_name").val()
        var cat = $("#categories").val()
        var duration = $("#duration").val()
        var description = $("#description").val()
        var startDate = $("#startDate").val()
        var form = $("#formats").val()
        var lan = $("#languages").val()
        var cardImage = document.getElementById("movie_image").files[0];
        var coverImage = document.getElementById("cover_image").files[0];

        var category = []
        for (let i = 0; i < cat.length; i++) {
            category.push(cat[i])
        }
        var format = []
        for (let i = 0; i < form.length; i++) {
            format.push(form[i])
        }
        var languages = []
        for (let i = 0; i < lan.length; i++) {
            languages.push(lan[i])
        }
        var movieDetails = new FormData();
        movieDetails.append("movieId", localStorage.getItem("movieId")),
            movieDetails.append("name", name),
            movieDetails.append("cardImage", cardImage),
            movieDetails.append("coverImage", coverImage),
            movieDetails.append("category", category),
            movieDetails.append("duration", duration),
            movieDetails.append("languages", languages),
            movieDetails.append("format", format),
            movieDetails.append("description", description),
            movieDetails.append("startDate", startDate),
            movieDetails.append("bookings", "0"),
            movieDetails.append("access", "true")

        // $.post("http://localhost:3333/movies/addmovie", obj, (xhr, status, responseText) => {
        //     alert(responseText.responseText);
        // })
        // $.ajaxSetup({
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json',
        //         'jwt':localStorage.getItem('jwt')
        //     }
        // });
        $.ajax({
            method: 'POST',
            processData: false,
            url: host + '/movies/addmovie',
            contentType: false,
            data: movieDetails,
            success: function (data) {
                alert(data)
            }
        })

        // $.ajax({
        //     url: host+'/movies/addmovie',
        //     data: movieDetails,
        //     processData: false,
        //     method: 'POST',
        //     contentType:false,
        //     success: function ( data ) {
        //         alert( data );
        //     },
        //     headers: {
        //         "Access-Control-Allow-Origin": "http://localhost:3333"
        //     }
        // });

        // $.post(host + "/movies/addmovie", { data: movieDetails }, (hr, status, data) => {
        //     alert(responseText.responseText);
        // })

        localStorage.setItem("movieId", parseInt(localStorage.getItem("movieId")) + 1);
    })
})