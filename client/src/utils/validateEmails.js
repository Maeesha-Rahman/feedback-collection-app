const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export default (emails) => {
    // list of emails looks like this: email@email.com, example@example.com
    // convert this list to array of emails split at the comma and trim() to make sure there's no extra space that is in there, just pure email with no spaces on either side  
    const invalidEmails = emails
        .split(',')
        .map(email => email.trim())
        // keep emails that are invalid - if expression is false
        .filter(email => re.test(email) === false)

    if (invalidEmails.length) {
        return `These emails are invalid: ${invalidEmails}`;
    }

    return;
}