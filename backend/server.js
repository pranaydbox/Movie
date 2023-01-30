const express = require('express') //used to import all methods objects etc
const cors=require('cors')
const app = express() //used to create a server
app.use(express.json())
app.use(cors())
const fs=require("fs");

const data=require('./movies.json')
app.get('/movies',function(req,res)
{
    res.send(data);
})

var id=0;
app.post("/service/:id",function(req,res)
{
    // console.log(req.body);
    // console.log(req.params.id)
    id=req.params.id;
   
})
app.get('/enquiry',function(req,res){
    // console.log(data[id])
    res.send(data[id]);
})



// user signup details

var users=require('./user.json');
app.post('/user',function(req,res){
    
    users[req.body.email]=req.body;
    // users.push(JSON.stringify(req.body));
    // console.log(users)
    fs.writeFile("user.json", JSON.stringify(users), 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
        else console.log("written");
    })
    // res.send("post req called "+req.body);
})


//login details
app.post('/login',function(req,res){
    var obj=req.body;
    var user=require('./user.json')
    // console.log(user[obj.email])
    // res.send("flajljf")
    if(user[obj.email]!=null)
    {
        
        if(user[obj.email].pass==obj.pass)
        {
            res.send("valid email");
        }
        else
        {
            res.send("invalid password");
        }
    }
    else{
        res.send("user not registered! Please Sign up");
    }

})



//get fname of currentemail

app.post("/getname/:email",(req,res)=>{
    console.log(req.params.email)
    fs.readFile('user.json','utf-8',(err,data)=>{
      
        let obj=JSON.parse(data);
        // console.log(obj[req.params.email]);
        res.send(JSON.stringify(obj[req.params.email]))
    })
})


app.listen(3001);
console.log("server listening at 3001");