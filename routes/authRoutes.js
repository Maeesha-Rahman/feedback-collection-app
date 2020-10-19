// require original password npm not password.js
const passport = require('passport');

module.exports = (app) => {
    app.get(
        '/auth/google', passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    )

    app.get('/auth/google/callback', passport.authenticate('google'));

    // user logout
    app.get('/api/logout', (req, res) => {
        // logout is a function that is automatically attached to the req object by passport 
        req.logout();
        // req that user is destroyed by passport since we are no longer signed in 
        res.send(req.user);
    })

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};

