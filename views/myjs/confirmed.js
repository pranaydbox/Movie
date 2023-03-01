window.onload = function () {
    var arr = window.location.hash.substring(1).split(":");
    // alert("after splilt")
    // alert(arr)
    $.get(host+"/movies/getmovie/" + arr[0], (moviedata, status) => {
        // alert("100")
        $.get(host+"/theatres/getsingletheatre/" + arr[1], (theatredata, status) => {
            $.post(host+"/users/getprofile", { curremail: localStorage.getItem("currentLoginUser") }, (xhr, status, responseText) => {
                var userdata = JSON.parse(responseText.responseText);
                alert(localStorage.getItem('currentLoginUser'))
                getmovietheatredata(moviedata, theatredata, userdata)
            })

        })
    })
}
function getmovietheatredata(moviedata, theatredata, userdata) {
    alert('hello')
    var price = { "category D": 120, "category C": 150, "category B": 180, "category A": 200 }
    var dob = new Date(userdata.dob);
    var month_diff = Date.now() - dob.getTime();
    var age_dt = new Date(month_diff);
    var year = age_dt.getUTCFullYear();
    var age = Math.abs(year - 1970);
    var arr = window.location.hash.substring(1).split(":");
    // var seat=localStorage.getItem("seatsarr").split(":")
    $("#ticket").append(
        `<div style="background-color:black;">
        <h2 style="text-align: center;margin: 0px;font-weight: bold;font-size: 30px;padding: 15px;">Movie Ticket</h2>
    </div>
    <div style="margin: auto; width: 80%;">
        <div style="border-bottom: 2px solid black;" id="hello">
            <div style="display: flex;justify-content: space-between;align-items: center;">
                <div>
                    <h4 style="color:black;font-weight: bold;">Theatre Details</h4>
                    <p>${theatredata.theatreName}</p>
                    <p>${theatredata.location}</p>
                </div>
                <div style="padding:20px 0px 20px 0px;">
                    <img src="${moviedata.cardImage}" width="150" height="150">
                </div>
            </div>
        </div>
       

        <div style="border-bottom: 2px solid black;padding:20px 0px">
            <h4 style="color:black;font-weight: bold;">Movie Details</h4>
            <div style="display: flex; justify-content: space-between;align-items: center;flex-direction: row;">
                <div>
                    <table>
                        <tr><td>Name : </td><td>${moviedata.name}</td></tr>
                        <tr><td>category : </td><td>${moviedata.category}</td></tr>
                        <tr><td>Ticket price: </td><td>${price[theatredata.category]}</td></tr>
                        <tr><td>Language : </td><td>${moviedata.languages[0]}</td></tr>
                    </table>
                </div>
                <div>
                    <table>
                        <tr><td>Format : </td><td>${moviedata.format}</td></tr>
                        <tr><td>No of seats : </td><td>${localStorage.getItem("seatsarr").split(",").length}</td></tr>
                        <tr><td>Seats Booked : </td><td>${localStorage.getItem("seatsarr")}</td></tr>
                        <tr><td>Price : </td><td>${price[theatredata.category] * localStorage.getItem("seatsarr").split(",").length}</td></tr>
                    </table>
                </div>
            </div>
        </div>
        <div style="padding:20px 0px">
            <h4 style="color:black;font-weight: bold;">Your Details</h4>
            <div style="display: flex; justify-content: space-between;align-items: center;flex-direction: row;">
                <div>
                    <table>
                        <tr><td>Name : </td><td>${userdata.name}</td></tr>
                        <tr><td>Mobile : </td><td>${userdata.mobile}</td></tr>
                        <tr><td>Email : </td><td>${userdata.email}</td></tr>
                    </table>
                </div>
                <div>
                    <table>
                        <tr><td>Age : </td><td>${age}</td></tr>
                        <tr><td>Gender : </td><td>${userdata.gender}</td></tr>
                        <tr><td>DOB : </td><td>${userdata.dob}</td></tr>
                    </table>
                </div>
            </div>
        </div>
    </div>`
    )

    $("#ticketpdf").append(
        `<div style="background-color:black;">
        <h2 style="text-align: center;margin: 0px;font-weight: bold;font-size: 30px;padding: 15px;">Movie Ticket</h2>
    </div>
    <div style="margin: auto; width: 80%;">
        <div style="border-bottom: 2px solid black;" id="hello">
            <div style="display: flex;justify-content: space-between;align-items: center;">
                <div>
                    <h4 style="color:black;font-weight: bold;">Theatre Details</h4>
                    <p>${theatredata.theatreName}</p>
                    <p>${theatredata.location}</p>
                </div>
                <div style="padding:20px 0px 20px 0px;">
                    <img src="${moviedata.cardImage}" width="150" height="150">
                </div>
            </div>
        </div>
       

        <div style="border-bottom: 2px solid black;padding:20px 0px">
            <h4 style="color:black;font-weight: bold;">Movie Details</h4>
            <div style="display: flex; justify-content: space-between;align-items: center;flex-direction: row;">
                <div>
                    <table>
                        <tr><td>Name : </td><td>${moviedata.name}</td></tr>
                        <tr><td>category : </td><td>${moviedata.category}</td></tr>
                        <tr><td>Ticket price: </td><td>${price[theatredata.category]}</td></tr>
                        <tr><td>Language : </td><td>${moviedata.languages[0]}</td></tr>
                    </table>
                </div>
                <div>
                    <table>
                        <tr><td>Format : </td><td>${moviedata.format}</td></tr>
                        <tr><td>No of seats : </td><td>${localStorage.getItem("seatsarr").split(",").length}</td></tr>
                        <tr><td>Seats Booked : </td><td>${localStorage.getItem("seatsarr")}</td></tr>
                        <tr><td>Price : </td><td>${price[theatredata.category] * localStorage.getItem("seatsarr").split(",").length}</td></tr>
                    </table>
                </div>
            </div>
        </div>
        <div style="padding:20px 0px">
            <h4 style="color:black;font-weight: bold;">Your Details</h4>
            <div style="display: flex; justify-content: space-between;align-items: center;flex-direction: row;">
                <div>
                    <table>
                        <tr><td>Name : </td><td>${userdata.name}</td></tr>
                        <tr><td>Mobile : </td><td>${userdata.mobile}</td></tr>
                        <tr><td>Email : </td><td>${userdata.email}</td></tr>
                    </table>
                </div>
                <div>
                    <table>
                        <tr><td>Age : </td><td>${age}</td></tr>
                        <tr><td>Gender : </td><td>${userdata.gender}</td></tr>
                        <tr><td>DOB : </td><td>${userdata.dob}</td></tr>
                       
                    </table>
                </div>
            </div>
        </div>
    </div>`
    )
}