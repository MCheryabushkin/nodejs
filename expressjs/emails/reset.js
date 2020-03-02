const keys = require('../keys');

module.exports = function(email, token) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: 'Password reset',
        html: `
            <h1>You don't remember your password!</h1>
            <p>Press to link:</p>
            <p><a href="${keys.BASE_URL}/auth/password/${token}">Return access</a></p>
            <hr />
            <a href="${keys.BASE_URL}">Shop of courses</a>
        `
    }
}