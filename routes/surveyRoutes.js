const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {

    app.get('/api/surveys/thanks', (req, res) => {
        res.send('Thanks for voting!');
    })

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        // instance of a survey
        const survey = new Survey({
            title,
            subject,
            body,
            // array of objects containing email addresses 
            // convert to array of strings, map over every string in array, for every email address return an object with a property email that points at user's email (trim gets rid of any whitespace)
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now(),
        });

        const mailer = new Mailer(survey, surveyTemplate(Survey));
        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();

            res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }

    });

};



