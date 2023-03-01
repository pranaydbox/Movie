var authRoute = require('express').Router();
const passport = require('passport');
var authController = require('../controllers/authController');
require('../Authenctication/auth.js')
var session = require('express-session');
authRoute.use(session({ secret: 'cats' }));
authRoute.use(passport.initialize());
authRoute.use(passport.session());
var dotenv = require('dotenv');
dotenv.config();
var cookieparser = require('cookie-parser');
authRoute.use(cookieparser())

authRoute.post("/addUser", authController.addUser)
authRoute.post("/emailvalidate", authController.emailvalidate)
authRoute.get("/google", passport.authenticate('google', { scope: ['email', 'profile'] }))
authRoute.get("/googleRedirect", passport.authenticate('google'), authController.googleredirect)
authRoute.get("/logout", authController.logout)
authRoute.get("/gettoken",authController.gettoken)
authRoute.post('/validate',authController.isloggedin)

module.exports = authRoute;
