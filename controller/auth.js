const User = require('../model/user');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const shortid = require('shortid');

exports.signup = (req,res)=>{
    const {name,email,password}=req.body;
    User.findOne({email:email}).exec((err,user)=>{
        if(user){
            return res.status(400).json({
                error: "email is already taken"
            })
        }
        let username = shortid.generate();
        const NewUser = {
            username,
            name,
            email,
            password
        };
        let newuser = new User(NewUser);
        newuser.save((err,success)=>{
            if(err){
                return res.status(400).json({
                    error:err
                })

            }
            const token = jwt.sign({_id:success._id},process.env.JWT_SECRET,{expiresIn:'30d'});
            res.cookie('token', token,{expireIn:'30d'});
            const {_id, username, name, email} = success;
            return res.json({
            token,
            user: {_id, username, name, email}
           })
        });
    })
}

exports.signin = (req,res) =>{
    // check if user exist 
    const {email, password} = req.body
    //authenticate 
    User.findOne({email}).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:"User with that email does not exist. please signup"
            })
        }
       if(!user.authenticate(password)){
        return res.status(400).json({
            error:"Password does not match"
        })
       }
       const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'30d'});
       res.cookie('token', token,{expireIn:'30d'});
       const {_id, username, name, email} = user;
       res.json({
           token,
           user:{
            _id, username, name, email
           },
       })
    });
    //generate jwt and send to client 
};


exports.signout = (req,res)=>{
    res.clearCookie();
    res.json({
        message: "Sign Out successfully"
    });
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], 
});
exports.authMiddleware = (req,res,next)=>{
    const authUserId = req.user._id
    console.log(authUserId)
    User.findById({_id:authUserId}).exec((err,user)=>{
        if(err||!user){
            return res.status(400).json({
                error:'User not found'
            })
        }
        req.profile = user
        next()
    })
}
