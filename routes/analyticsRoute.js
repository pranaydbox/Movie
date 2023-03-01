var analyticsRoute=require('express').Router()
var analyticsController=require("../controllers/analyticsController");

analyticsRoute.post("/updatedata",analyticsController.updatedata);
analyticsRoute.get("/getalldata",analyticsController.getalldata)


module.exports=analyticsRoute;