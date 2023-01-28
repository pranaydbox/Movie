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
app.get('/enquiry',function(req1,res1){
    console.log(data[id])
    res1.send(data[id]);
})

app.listen(3001);
console.log("server listening at 3001");