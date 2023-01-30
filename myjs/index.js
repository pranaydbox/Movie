window.onload=function(){
    // alert("index")


    if(localStorage.getItem("currentemail")!=null)
    {

        var x1=new XMLHttpRequest();
        x1.open("POST","http://127.0.0.1:3001/getname/"+localStorage.getItem("currentemail"));
        x1.setRequestHeader("content-type","application/json");
        x1.send(JSON.stringify({}));
        x1.onload=function()
        {
            // alert("data is "+x1.responseText);
            // console.log(x1.responseText);
            localStorage.setItem("currentuser",x1.responseText);


            $(document).ready(function(){
                var obj=JSON.parse(localStorage.getItem("currentuser"));
                $("#register").hide();
                $(".nav-item").show();
                $("#profile").text("Hello "+obj.fname);
    
                if(obj.email=="pranay@gmail.com") $("#admin").show();
                else $("#admin").hide();
            })
        }



        
    }
}


//logout details
document.getElementById("logout").addEventListener("click",logout);
function logout()
{
    $(".nav-item").hide();
    $("#register").show();
    localStorage.removeItem("currentemail");
    window.location.href="register.html";

}