const JWT = require("jsonwebtoken");

const secret = "$hane$seth"; //TO create tokens

function createTokenForUser(user){
    const payload = {
        _id: user._id,
        firstName: user.firstName,
        email: user.email,
        role: user.role
    }

    const token = JWT.sign(payload, secret);

    return token;
}

function validateToken(token){
    const payload = JWT.verify(token, secret, {expiresIn: '1d'});
    return payload;
}

module.exports = {
    createTokenForUser,
    validateToken
}
