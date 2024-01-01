const jwt = require('jsonwebtoken');

const secrateKey = process.env.JWT_SECRATE;

function createJWT({email}) {
    const token = jwt.sign({ email: email }, secrateKey);
    return token;
}

function verifyJWT(token) {
    try {
        const payload = jwt.verify(token, secrateKey);
        console.log(payload);
        return payload;
    } catch (error) {
        return error;
    }
}

module.exports = { verifyJWT, createJWT };
