var onloadtime;
window.onload = function () {
    onloadtime=new Date(Date.now());
    // alert(localStorage.getItem("theatreId"))
    if (localStorage.getItem("theatreId") == null) {

        window.localStorage.setItem("theatreId", 1);
        // alert(localStorage.getItem("theatreId"))
    }
    else {

        // alert(localStorage.getItem("theatreId"))
    }
} 


window.onbeforeunload = function (e) {
    // e.returnValue = 'onbeforeunload';
    var difftime=(new Date(Date.now()).getTime()-onloadtime.getTime())/1000;
    var obj={
        name:"Contact",
        count:"1",
        loggedvisits:"1",
        time:Math.round(difftime)+"",
        bouncerate:"0"
    }
    if(difftime<=10){
        obj.bouncerate="1";
    }
    if(localStorage.getItem("currentLoginUser")==1){
        obj.loggedvisits="0";
    }
    console.log(obj);
    $.post(host+"/analytics/updatedata",obj,(xhr,status,responseText)=>{
        console.log(responseText.responseText);
    })
};



$(document).ready(() => {
    $("#sendQueryButton").click(() => {
        name1 = $("#queryName").val();
        email = $("#queryEmail").val();
        subject = $("#querySubject").val();
        message = $("#queryMessage").val();
        var obj = {
            name: name1,
            email: email,
            subject: subject,
            message: message
        }
        sendToAdmin(obj);
    })
})





function sendToAdmin(obj) {
    $.post(host+"/queries/addqueries", obj, (xhr, status, responseText) => {
        alert(responseText.responseText);
        window.location.href = "contact.html"
    })
}
$("#submitTheatre").click(function () {

    theatrename = $("#theatre_name").val();
    theatreurl = document.getElementById("theatre_url");
    theatrelocation = $("#theatre_location").val();
    theatrecategory = $("#category1").val();
    var theatreDetails = new FormData();
    theatreDetails.append("theatreId", localStorage.getItem("theatreId"));
    theatreDetails.append("theatreName", theatrename);
    theatreDetails.append("ownerEmail", localStorage.getItem("currentLoginUser"));
    theatreDetails.append("category", theatrecategory);
    theatreDetails.append("theatreImage", theatreurl.files[0]);
    theatreDetails.append("location", theatrelocation);
    theatreDetails.append("bookings", 0);
    theatreDetails.append("access", "pending");
    theatreDetails.append("movieObjects", []);
    theatreDetails.append("beverageObjects", []);
    console.log(theatreurl.files);

    // for (var pair of theatreDetails.entries()) {
    //     console.log(pair[0]+ ', ' + pair[1]); 
    // }
    

    window.localStorage.setItem("theatreId", parseInt(window.localStorage.getItem("theatreId")) + 1);

    // $.post("http://localhost:3333/theatres/addtheatre",theatreDetails,(xhr,status,responseText)=>{
    //     alert(responseText.responseText);
    //     window.location.href="contact.html";
    // })
    $.ajax({
        url: host+'/theatres/addtheatre',
        data: theatreDetails,
        processData: false,
        method: 'POST',
        contentType:false,
        success: function ( data ) {
            alert( data );
        }
    });
})