const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');



mongoose.connect(keys.mongoURI);

const app = express();

app.use(
    cookieSession({
        // cookie will last 30 days before it automatically expires (in milleseconds)
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

// call this funtion, and immediately call it with the app object
require('./routes/authRoutes')(app);


// if there is an environment variabe that has already been defined by heroku assign that variable to PORT otherwise use value of 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);

// http://localhost:5000/





