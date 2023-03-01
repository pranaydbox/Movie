var usermodel=require('../models/userModel.js');
var jwt = require('jsonwebtoken');

var token="no token";

function addUser(req,res){
    var user=new usermodel.userModel({
        name:req.body.name,
        mobile:req.body.mobile,
        email:req.body.email,
        password:req.body.password,
        dob:null,
        image:"multerOperations/uploads/intialuser.jpg",
        gender:null,
        address:null,
        owner:"false",
        admin:"false"
    })
    usermodel.userModel.findOne({email:req.body.email},(err,data)=>{
        if(data!=undefined){
            res.send("User already exists");
        }
        else{
            user.save((err,data)=>{
                if(err){
                    res.send("Some error");
                }
                else{
                    res.send("Added succesfully");
                }
            })
        }
    })
}


function findOrCreate(obj){
    var user=new usermodel.userModel({
        name:obj.name,
        mobile:null,
        email:obj.email,
        password:null,
        dob:null,
        image:"multerOperations/uploads/intialuser.jpg",
        gender:null,
        address:null,
        owner:"false",
        admin:"false"
    })
    usermodel.userModel.findOne({email:obj.email},(err,data)=>{
        if(data==undefined){
            user.save((err,data)=>{
                if(err){
                    console.log("Some error");
                }
                else{
                    console.log("Added succesfully");
                }
            })
        }
    })
}


function emailvalidate(req,res){
    usermodel.userModel.findOne({email:req.body.email},(err,data)=>{
        if(data!=undefined){
            if(data.password==req.body.password){
                token = jwt.sign(req.body, process.env.JWT_KEY);
                // res.cookie('jwt',token);
                res.send("exists");
            }
            else{
                res.send("not exists");
            }
        }
        else{
            res.send("not exists");
        }
    })
}


function logout(req, res) {
    // res.cookie('jwt', "1", {
    //     expires: new Date(Date.now() + 9999999),
    //     httpOnly: false
    // });
    token="no token";
    res.send("Deleted Cookie");
}


function googleredirect(req, res){
    var obj = {
        date: new Date(),
        name: req.user.displayName,
        email: req.user.email,
    }
    findOrCreate(obj);
    token = jwt.sign(obj, process.env.JWT_KEY)
    // res.cookie('jwt', token, {
    //     expires: new Date(Date.now() + 9999999),
    //     httpOnly: false
    // });
    res.redirect("https://movieflix.prashatdey.in");
}

function isloggedin(req,res,next){
    if(req.body.jwt!="no token" && jwt.verify(req.body.jwt,process.env.JWT_KEY)){
        next()
    }
    else{
        res.send("Not authorized");
    }
}


function gettoken(req,res){
    res.send(token);
}

module.exports={addUser,emailvalidate,findOrCreate,googleredirect,logout,isloggedin,gettoken}
