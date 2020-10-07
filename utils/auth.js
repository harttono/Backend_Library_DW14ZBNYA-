const jwt = require('jsonwebtoken');
const key = require('./secretKey');

exports.getToken = (user) => {
    return jwt.sign({
        id:user.id,
        fullname:user.fullname,
        email:user.email,
        isAdmin:user.isAdmin
    },key.secretKey,{
        expiresIn:'3h'
    })
}