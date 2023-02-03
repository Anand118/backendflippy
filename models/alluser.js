const mongoose  =require("mongoose")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto  = require("crypto")
const validator = require("validator")



const alluserSchema = new mongoose.Schema({
    name:{
        type:String,
        maxLength:[30,"name cannot exceed 30 character"],
        minLength:[8, "name cannot less than 8 character"]
    },
    email:{
        type:String,
        required:[true,"please enter your email address"],
        unique:true,
        validate:[validator.isEmail,"please enter your valid email address"]


    },
    otp_email:{
        type:Number,
        maxLength:[6, "please enter your otp"]
    },
    
    phone:{
        type:String,
        unique:true,
        maxLength:[10,"number can not be greater than 10"],
        minLength:[10, "number can not be less than 10"]
    },
    otp_mobile:{
        type:Number,
        maxLength:[6, "please enter your otp"]    
    },
   
    password:{
        type:String,
        required:[true,"please enter your password"],
        minLength:[8, "password should be more than 8 character"],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },

    role:{
        type:String,
        default:"user"
    },

   
    resetPasswordToken:String,
    resePasswordExpire:Date
    
   
})

alluserSchema.set('timestamps',true)

//  hash password
alluserSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }

    this.password =await bcrypt.hash(this.password, 10)
})

//  jsonwebtoken JWT for user
alluserSchema.methods.getJWTTOKEN = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
};

// for admin
alluserSchema.methods.getJWTTOKENADMIN = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_ADMIN,{
        expiresIn:process.env.JWT_EXPIRE_ADMIN,
    })
};


// for seller
alluserSchema.methods.getJWTTOKENSELLER = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_SELLER,{
        expiresIn:process.env.JWT_EXPIRE_SELLER,
    })
};



// compare password

alluserSchema.methods.comparePassword = async function(enteredPassword){  
    return await bcrypt.compareSync(enteredPassword,this.password)
       
    }


   



module.exports =mongoose.model("AllUser",alluserSchema)