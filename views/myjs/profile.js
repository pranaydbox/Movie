var onloadtime;
window.onload = function () {
    onloadtime = new Date(Date.now());
    // $.ajaxSetup({
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json',
    //         'jwt':localStorage.getItem('jwt'),
    //         'curremail': localStorage.getItem("currentLoginUser")
    //     }
    // });
    // alert()
    $.post(host +"/auth/validate", { jwt:localStorage.getItem('jwt') }, (xhr, status, responseText) => {
        if (responseText.responseText == "Not authorized") {
            window.location.href = "https://movieflix.prashantdey.in/temp2/views/register.html";
        }
    })
    $.post(host + "/users/getprofile", { curremail: localStorage.getItem("currentLoginUser") }, (xhr, status, responseText) => {
        // if (responseText.responseText == "Not authorized") {
        //     window.location.href = "https://movieflix.prashantdey.in" + "/register.html";
        // }
        var obj = JSON.parse(responseText.responseText);
        adddatatoprofile(obj);
    })
}

window.onbeforeunload = function (e) {
    // e.returnValue = 'onbeforeunload';
    var difftime = (new Date(Date.now()).getTime() - onloadtime.getTime()) / 1000;
    var obj = {
        name: "Profile",
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
    $.post(host + "/analytics/updatedata", obj, (xhr, status, responseText) => {
        console.log(responseText.responseText);
    })
};

function adddatatoprofile(obj) {
    // alert(obj.image)
    var dob = new Date(obj.dob);
    var month_diff = Date.now() - dob.getTime();
    var age_dt = new Date(month_diff);
    var year = age_dt.getUTCFullYear();
    var age = Math.abs(year - 1970);
    $("#nameunderpic").html(obj.name);
    $("#personname").html(obj.name)
    $("#personemail").html(obj.email)
    $("#personmobile").html(obj.mobile)
    $("#persondob").html((obj.dob).substring(0, 10))
    $("#personage").html(age)
    $("#profilepictureimage").attr("src", obj.image)
    $("#persongender").html(obj.gender)
    $("#personaddress").html(obj.address)
    var moviehist = obj.movieHistory;
    for (x in moviehist) {
        $("#moviehistory").append(
            `<div style="display: flex;flex-direction: row;justify-content:flex-start;align-items: center;gap:50px;box-shadow:2px 2px 8px 2px grey;width:100%;padding:10px;">
                <img style="height: 7rem;width:7rem;border-radius:50%;" src="${moviehist[x].movieImage}">
                <div>
                    <div style="font-size:23px;font-weight: 700;">${moviehist[x].movieName}</div>
                    <div style="font-size: 15px;font-weight:500;">${moviehist[x].theatreName}</div>
                    <div>Seats booked : ${moviehist[x].seatsBooked}</div>
                    <div>Total price : ${moviehist[x].seatsBooked} * ${moviehist[x].price} = ${moviehist[x].seatsBooked * moviehist[x].price}</div>
                </div>
            </div>`
        )
    }
}


$(document).ready(() => {
    $("#profilepic").change(() => {
        var fd = new FormData();
        fd.append("profileImage", document.getElementById("profilepic").files[0]);
        fd.append("curremail", localStorage.getItem("currentLoginUser"));
        $.ajax({
            url: host + "/users/uploadimage",
            data: fd,
            processData: false,
            contentType: false,
            method: 'POST',
            success: function (data) {
                alert(data);
            }
        })

    })
})


$("#editsavebtn").click(() => {

    var name = $("#editname").val();
    var mobile = $("#editmobile").val();
    var gender = $("input[type='radio'][name='genderformname']:checked").val();
    var address = $("#editaddress").val();
    var dob = new Date($("#editdate").val());
    var obj = {
        name: name,
        mobile: mobile,
        dob: dob,
        gender: gender,
        address: address,
        email: localStorage.getItem("currentLoginUser")
    }
    $.post(host + "/users/updateprofile", obj, (xhr, status, responseText) => {
        alert(responseText.responseText);
    })
    window.location.reload();
})

$(".editicon").click(() => {
    document.getElementById("editsection").style.display = "block";
    document.getElementById("profilesection").style.display = "none";
})