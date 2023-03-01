$(document).ready(function(){
    $("#signupBtn").click(function(){
        var name=$("#signupName").val();;
        var mobile=$("#signupMobile").val();
        var email=$("#signupEmail").val();
        var password=$("#signupPassword").val();
        var obj={
            name:name,
            mobile:mobile,
            email:email,
            password:password,
        }
        postUserDataInDatabase(obj);
    })
})


function postUserDataInDatabase(obj){
    $(document).ready(()=>{
        $.post(host+"/auth/addUser",obj,(xhr,status,responseText)=>{
            if(responseText.responseText=="User already exists"){
                alert(responseText.responseText);
                return;
            };
            window.location.href="index.html";
        });
    })

}



$(document).ready(()=>{
    $("#loginBtn").click(function(){
        var email=$("#loginEmail").val();
        var password=$("#loginPassword").val();
        obj={
            email:email,
            password:password
        }
        $(document).ready(()=>{
            $.post(host+"/auth/emailvalidate",obj,(xhr,status,responseText)=>{
                var result=responseText.responseText;
                if(result=="exists"){
                    localStorage.setItem("currentLoginUser",email);
                    window.location.href="index.html";
                }
                else{
                    alert("Invalid Email/Password");
                }
            });
        })
    })
})

$("#googlebtn").click(function(){
    window.location.href=host+"/auth/google";
})

