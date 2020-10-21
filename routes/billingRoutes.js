const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {

    app.post('/api/stripe', requireLogin, async (req, res) => {
        // take the request and before we run the async logic, throw request into the middleware requireLogin to make sure user is signed in before running the below logic on the incoming request
        // console.log(req.body.id)
        // logic to handle token - handle credit card and billing charge
        const charge = await stripe.charges.create({
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id
        });

        // console.log(charge);
        req.user.credits += 5;
        const user = await req.user.save();

        // send user model back to whoever made the request
        res.send(user);
    });
};