module.exports = (req, res, next) => {
    // if passport did not find a user that was referenced inside the cookie included in the request (aka if user is NOT signed in)
    if (!req.user) {
        // unauthorized/forbidden have to be logged in to make a request to this endpoint
        return res.status(401).send({ error: 'You must log in!' });
    }

    // else 
    next();
}