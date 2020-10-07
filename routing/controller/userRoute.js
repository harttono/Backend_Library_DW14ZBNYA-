const {User}   = require('../../models');
const bycypt = require('bcrypt');
const {getToken} = require('../../utils/auth');

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
                            token:getToken(newUser)
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
        res.status(500).send({
            message:`error ${err}`
        })
    }
}

// Login 
exports.login = async (req,res) =>{
    try{
        const{email,password} = req.body;
        const signInUser = await User.findOne({
            where:{
                email
            }
        })
        if(signInUser){
            if(bycypt.compareSync(password,signInUser.password)){
                res.send({
                    message:`You've logged in successfully !`,
                    data:{
                        email:signInUser.email,
                        token:getToken(signInUser)
                    }
                })
            }else{
                return res.status(401).send({
                    message:'Invalid Passoword.'
                })
            }
        }else{
            return res.status(401).send({
                message:'Invalid username or password.'
            })
        }
    }catch(err){
        res.status(500).send({
            message:`error ${err}`
        })
    }
}

// generate admin

exports.createAdmin = async (req,res) =>{
    try{
        const adminData = {
            email:"harttonz@gmail.com",
            password:"123",
            fullname:"harttonz",
            gender:"male",
            phone:"089533201888",
            address:"pemalang",
            role:"Admin",
            isAdmin:1,
            picture:'http://localhost:4000/profile/account.png'
        }
        bycypt.hash(adminData.password,10,async(err,hash)=>{
            adminData.password = hash;
            const newAdmin = await User.create(adminData);
            if(newAdmin){
                res.send({admin:newAdmin})
            }else{
                res.status(401).send({
                    message:'Invalid Admin Data.'
                })
            }
        })
    }catch(err){
        res.status(500).send({
            message:`error ${err}`
        })
    }
}

// Get  Users
exports.getUsers = async(req,res) =>{
    try{
        const users = await User.findAll({
            attributes:{
                exclude:['gender','role','isAdmin','picture','createdAt','updatedAt']
            }
        });
        if(users){
            return res.send({
                data:users
            })
        }
    }catch(err){
            res.status(500).send({
                message:`error ${err}`
            })
    }
}

// delete User

exports.deleteUser = async(req,res) =>{
    try{
        const {id} = req.params;
        const deletedUser = await User.destroy({
            where:{
                id
            }
        })
        if(deletedUser){
            res.send({
                message:`User with Id ${id} has been deleted successfully !`,
                data:id
            })
        }else{
            res.status(404).send({
                message:`User with Id ${id} not found.`
            })
        }
    }catch(err){
        res.status(500).send({
            message:`error ${err}`
        })
    }
}