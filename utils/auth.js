const jwt = require('jsonwebtoken');
const {secretKey} = require('./secretKey');

exports.getToken = (user) => {
    return jwt.sign({
        id:user.id,
        fullname:user.fullname,
        email:user.email,
        isAdmin:user.isAdmin
    },secretKey,{
        expiresIn:'24h'
    })
}

exports.isAuth = (req,res,next) =>{
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token,secretKey,(err,decode) =>{
            if(err){
                return res.status(401).send({
                    message:'Invalid token'
                })
            }
            req.user = decode;
            next();
            return
        })
    }else{
        return res.status(401).send({
            message:`token isn't supplied.`
        })
    }
}