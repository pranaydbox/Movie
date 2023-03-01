var bookingController=require("../controllers/bookingController")
var authController=require("../controllers/authController")


var bookingRoute=require('express').Router()

bookingRoute.post("/getseatstatus",bookingController.getseatstatus);
bookingRoute.post("/booknow",bookingController.booknow)


module.exports=bookingRoute;