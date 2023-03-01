var userRoute=require('express').Router()
var userController=require('../controllers/userController')
var upload=require("../multerOperations/multer").upload
var authController=require("../controllers/authController")

userRoute.get("/getusers",userController.getusers)
userRoute.post("/getprofile",userController.getprofile)
userRoute.post("/uploadimage",upload.single("profileImage"),userController.uploadimage)
userRoute.post("/updateprofile",userController.updateprofile)


module.exports=userRoute;