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
app.post("/:id",function(req,res)
{
    console.log(req.body);
    console.log(req.params.id)
    id=req.params.id;
   
})
app.get('/enquiry',function(req,res){
    // console.log(data[id])
    res.send(data[id]);
})


// user signup details
var users=require('./user.json');
app.post('/user',function(req,res){
    users.push(req.body);
    fs.writeFile("user.json", users, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
        else console.log("written");
    })
    // res.send("post req called "+req.body);
})


app.listen(3001);
console.log("server listening at 3001");