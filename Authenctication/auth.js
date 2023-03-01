var passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
var dotenv = require('dotenv')
dotenv.config()
const host="https://movieflixapi.prashatdey.in"
// const host="http://localhost:3333"
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
    callbackURL: host+"/auth/googleRedirect",
    passReqToCallback: true
    },
    function (request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
})

passport.deserializeUser(function (user, done) {
    done(null, user);
})