var passport = require("passport");
const config = require("./keys")
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy; 
passport.serializeUser(function (user, done) {
    done(null, user);
}); passport.deserializeUser(function (user, done) {
    done(null, user);
}); passport.use(
    new GoogleStrategy(
        {
            clientID: config.googleClient,
            clientSecret: config.googleSecret,
            callbackURL: "http://localhost:5000/api/auth/auth/google/callback"
        },
        function (accessToken, refreshToken, profile, done) {
            var userData = {
                email: profile.emails[0].value,
                name: profile.displayName,
                token: accessToken
            };
            done(null, userData);
            
        }
    )
);