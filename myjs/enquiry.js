window.onload=function(){
    var http=new XMLHttpRequest();
    http.open("GET","http://127.0.0.1:3001/enquiry");
    http.send();
    http.onload=function(){
        console.log(http.responseText);
        var data=JSON.parse(http.responseText);
        document.getElementById("movieimage").src=data.url;
        document.getElementById("moviename").innerHTML=data.name;
        document.getElementById("moviedescription").innerHTML=data.desc;
    }
}