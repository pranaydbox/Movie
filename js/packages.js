
document.getElementById("0").addEventListener("click",()=>{getid(0)});
document.getElementById("1").addEventListener("click",()=>{getid(1)});
document.getElementById("2").addEventListener("click",()=>{getid(2)});
document.getElementById("3").addEventListener("click",()=>{getid(3)});
document.getElementById("4").addEventListener("click",()=>{getid(4)});
document.getElementById("5").addEventListener("click",()=>{getid(5)});
function getid(i)
{
    // alert("hello "+i);
    // console.log(i);

   


    var obj={
        url:"pranay",
        name:"kumar"
    }

    var x1=new XMLHttpRequest();
    x1.open("POST","http://127.0.0.1:3001/"+i);
        x1.setRequestHeader("content-type","application/json");
    x1.send(JSON.stringify(obj));
    x1.onload=function()
    {
        alert("data is "+x1.responseText);
    }
    window.location.href='enquiry.html';
}