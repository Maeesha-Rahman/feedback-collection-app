const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');



mongoose.connect(keys.mongoURI);

// express app object 
const app = express();

app.use(bodyParser.json());
app.use(
    cookieSession({
        // cookie will last 30 days before it automatically expires (in milleseconds)
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

// call this funtion, and immediately call it with the express app object
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    // express will serve up production assets like our main.js file, or main.css file 
    // if any get request comes in for some route or file, and we don't understand what it is looking for (if we don't have a route handler set up) then look into clien/build directory and try to see if there's some file inside that matches up with what the request is looking for
    app.use(express.static('client/build'));

    // exporess will serve up the index.html file if it doesn't recognize the route 
    // if there's also no file inside of client/build directory that matches up with what the request is looking for, give them back index.html file (catch all case)
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}


// if there is an environment variabe that has already been defined by heroku assign that variable to PORT otherwise use value of 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);

// http://localhost:5000/





