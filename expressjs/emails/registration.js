const keys = require('../keys')
module.exports = function(email) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: 'Account create',
        html: `
            <h1>Welcome to our shop!</h1>
            <p>You successfully create account with email - ${email}</p>
            <hr />
            <a href="${keys.BASE_URL}">Shop of courses</a>
        `
    }
}