const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({ bye: 'buddy' });
});



// if there is an environment variabe that has already been defined by heroku assign that variable to PORT otherwise use value of 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);

// http://localhost:5000/