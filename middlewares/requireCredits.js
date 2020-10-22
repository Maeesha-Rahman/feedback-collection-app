module.exports = (req, res, next) => {
    // if passport did not find a credits for the user 
    if (req.user.credits < 1) {
        return res.status(403).send({ error: 'Not enough credits!' });
    }

    // else 
    next();
}