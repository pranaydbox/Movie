var usermodel=require("../models/userModel.js");
var moviemodel=require("../models/movieModel");
var reviewmodel=require("../models/reviewModel");




function getusers(req,res){
    usermodel.userModel.find({},(err,data)=>{
        res.send(data);
    })
}


function getprofile(req,res){
    usermodel.userModel.findOne({email:req.body.curremail},(err,data)=>{
        console.log(data)
        res.send(data);
        
    })
}


async function uploadimage(req,res){
    await usermodel.userModel.updateOne({email:req.body.curremail},{$set:{image:req.file.location}})
    await moviemodel.movieModel.updateMany({"reviewObjects.email":req.body.curremail},{$set:{"reviewObjects.$.userimage":req.file.location}});
    await reviewmodel.reviewModel.updateMany({"reviews.email":req.body.curremail},{$set:{"reviews.$.userimage":req.file.location}})
    res.send("Uploaded successfully")
}


async function updateprofile(req,res){
    await usermodel.userModel.updateOne({email:req.body.email},{$set:{name:req.body.name,mobile:req.body.mobile,dob:req.body.dob,gender:req.body.gender,address:req.body.address}});
    await moviemodel.movieModel.updateMany({"reviewObjects.email":req.body.email},{$set:{"reviewObjects.$.name":req.body.name}});
    await reviewmodel.reviewModel.updateMany({"reviews.email":req.body.email},{$set:{"reviews.$.name":req.body.name}});
    res.send("Profile Updated");
}


module.exports={getusers,getprofile,uploadimage,updateprofile}