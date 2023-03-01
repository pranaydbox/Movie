var analyticsmodel=require("../models/analyticsModel");


async function updatedata(req,res){
    var pagename=req.body.name;
    var currdate=new Date(Date.now()).toLocaleString().split(',')[0];
    var obj={
        date:currdate,
        count:req.body.count,
        bouncerate:req.body.bouncerate,
        time:req.body.time,
        loggedvisits:req.body.loggedvisits
    }
    let data=await analyticsmodel.analyticsModel.findOne({pagename:pagename},{visitsdata:{$slice:-1}})
    // console.log(data);
    if(data.visitsdata[0]==undefined || data.visitsdata[0].date!=currdate){
        analyticsmodel.analyticsModel.updateOne({pagename:pagename},{$push:{visitsdata:obj}},(err,data)=>{
            res.send("Updated successfully");
        })
    }
    else{
        let ans=await analyticsmodel.analyticsModel.updateOne({pagename:pagename},{$pop:{visitsdata:1}})
        obj.date=data.visitsdata[0].date;
        obj.count=parseInt(data.visitsdata[0].count)+parseInt(obj.count);
        obj.bouncerate=parseInt(data.visitsdata[0].bouncerate)+parseInt(obj.bouncerate);
        obj.time=parseInt(data.visitsdata[0].time)+parseInt(obj.time);
        obj.loggedvisits=parseInt(data.visitsdata[0].loggedvisits)+parseInt(obj.loggedvisits);
        analyticsmodel.analyticsModel.updateOne({pagename:pagename},{$push:{visitsdata:obj}},(err,data)=>{
            res.send("Updated successfully");
        })
    }
}


function getalldata(req,res){
    analyticsmodel.analyticsModel.find({},(err,data)=>{
        res.send(data);
    })
}

module.exports={updatedata,getalldata};
