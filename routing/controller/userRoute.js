const {User}   = require('../../models');
const bycypt = require('bcrypt');
const generateToken = require('../../utils/auth');

// Register User
exports.register = async (req,res) =>{
    try{
        const {email,password,fullname,gender,phone,address} = req.body;
        const userData = {
            email:email,
            password:password,
            fullname:fullname,
            gender:gender,
            phone:phone,
            address:address,
            role:"User",
            isAdmin:0,
            picture:'http://localhost:5000/profile/account.png'
        }
        const user = await User.findOne({
            where:{
                email:email
            }
        })
        if(!user){
            bycypt.hash(req.body.password,10,async(err,hash)=>{
                userData.password = hash;
                const newUser = await User.create(userData);
                if(newUser){
                    res.send({
                        message:'Your data has been saved successfully !',
                        data:{
                            email:newUser.email,
                            token:generateToken.getToken(newUser)
                        }
                    })
                }else{
                    return res.status(401).send({
                        message:'Invalid user data !.'
                    })
                }
            })
        }else{
            res.status(401).send({
                message:'your email already exist !.'
            })
        }
    }catch(err){
        res.send({
            message:`error ${err}`
        })
    }
}

// Login 

