document.getElementById("SignUp").addEventListener("click",signup);
function signup(){
    // alert("hello")
    var fname=document.getElementById("First Name").value;
    var lname=document.getElementById("Last Name").value;
    var uname=document.getElementById("User Name").value;
    var pass=document.getElementById("Password").value;
    var mobile=document.getElementById("Mobile").value;
    var email=document.getElementById("Email").value;
    var obj={
        fname:fname,
        lname:lname,
        uname:uname,
        pass:pass,
        mobile:mobile,
        email:email
    }
   
    localStorage.setItem("currentemail",email);
    // console.log(JSON.stringify(obj))
    var http=new XMLHttpRequest();
    http.open("POST","http://127.0.0.1:3001/user");
    http.setRequestHeader("content-type","application/json");
    http.send(JSON.stringify(obj));
    http.onload=function(){
        alert(http.responseText);
    }
    window.location.href='index.html';
}



document.getElementById("Login").addEventListener("click",login);
function login()
{
    // alert("hello")
    var email=document.getElementById("lEmail").value;
    var pass=document.getElementById("lPassword").value;

    var obj={
        email:email,
        pass:pass
    }
    // alert(obj.email)
    var http=new XMLHttpRequest();
    http.open("POST","http://127.0.0.1:3001/login");
    http.setRequestHeader("content-type","application/json");
    http.send(JSON.stringify(obj));
    http.onload=function(){
        var res=http.responseText;
        // alert(res);
        if(res=="valid email")
        {
            localStorage.setItem("currentemail",email);
            window.location.href='index.html';
        }
        else
        {
            alert(res);
        }
    }
}