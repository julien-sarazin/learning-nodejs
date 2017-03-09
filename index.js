const express = require('express');
const passport = require('passport');
const facebookStrategy = require('passport-facebook').Strategy;

const User = require('./User');

passport.use(new FacebookStrategy({
        clientID: 751366168355321,
        clientSecret: "908dfa78913c34173699170b1a4a81fb",
        callbackURL: "http://localhost.com:3000/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOrCreate(..., function(err, user) {
            if (err) { return done(err); }
            done(null, user);
        });
    }
));


const app = express();

app.get('/auth/facebook',
    passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

app.listen(3000);