const catchAsyncError = require("../../middleware/catchAsyncError");
const { find } = require("../../models/alluser");
const AllUser = require("../../models/alluser");
const User = require("../../models/userModel/userSchema");

const ErrorHander = require("../../utils/errorhander");
const sendToken = require("../../utils/jwtToken");

// create user

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, phone, password } = req.body;

  const user = await AllUser.create({
    name,
    email,
    phone,
    password,
    avatar: {
      public_id: "kakalegayetamatar",
      url: "chachalegayekela",
    },
  });

  sendToken(user, 200, res);
});

// login user

exports.loginuser = catchAsyncError(async (req, res, next) => {
  const { email, phone, password } = req.body;

  if (!password) {
    return next(new ErrorHander("please enter email or phone and passwrod", 400));
  } else if (email || phone) {
    const user = await AllUser.findOne({ $or: [{ email }, { phone }]}).select(
      "+password"
    );
    if(!user){
      return next(new ErrorHander("Invalid User Credential",401))
    }

    if(user.role==="user"){
        if (!user) {
            return next(new ErrorHander("Invalid email or password", 401));
          }
          
      
          const isPasswordMatched = await user.comparePassword(password);
      
          if (!isPasswordMatched) {
            return next(new ErrorHander("password does not match"));
          }
      
          sendToken(user, 201, res);
    }
   else{
    return next(new ErrorHander("User not Found",404))
   }
    
    

    
  } else {
    return next(new ErrorHander("please enter all field", 401));
  }
});

// logout user

exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("flippyseven_user_token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "logged out succesfully",
  });
});


// user profile

exports.getUserDetails =catchAsyncError (async (req,res,next)=>{
    const user = await AllUser.findById(req.user.id)

  res.status(200).json({
    success:true,
    user
})


   
})


// update user password

exports.updatePassword = catchAsyncError(async (req,res,next)=>{
    const user = await AllUser.findById(req.user.id).select("+password")
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword)
    if(!isPasswordMatched){
 return next(new ErrorHander("Old Password is not correct",400))
    }
if(req.body.newPassword !== req.body.confirmPassword){
    return next(new ErrorHander("password does not match",400))
}
user.password = req.body.newPassword
await user.save()
sendToken(user,200,res)

})

exports.updateProfile =catchAsyncError( async(req,res,next)=>{
    const newUserData = {
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone
    }
    
    const user = await AllUser.findByIdAndUpdate(req.user.id,newUserData, {new:true,runValidators:true})
    
    res.status(200).json({
        success:true,
        user
    })
})




// register complete user details
exports.registerAlldetails = catchAsyncError(async (req, res, next) => {
  const useralldetails = await User.findOne({userProfile:req.user.id})

if(useralldetails){
   return next (new ErrorHander("you have filled your details only you can update"))

}

  const user = await User.create({
    userProfile:req.user.id,
   address:req.body.address,
   country:req.body.country,
   state:req.body.state,
   city:req.body.city,
   postal_code:req.body.postal_code
 
  });
  res.status(200).json({
    success:true,
    msg:"user details submitted",  
    user  
  })

});


// get all complete user details
exports.AlldetailsOfUser = catchAsyncError(async (req, res, next) => {
const useralldetails = await User.findOne({userProfile:req.user.id}).populate("userProfile")

if(!useralldetails){
  return next(new ErrorHander("Incomplete details"))
}
res.status(200).json({
  success:true, 
  useralldetails
}) 
 
}) ;
 
 

// update complete user details

exports.UpdateAlldetailsOfUser = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    address:req.body.address,
    country:req.body.country,
    state:req.body.state,
    city:req.body.city,
    postal_code:req.body.postal_code

}

const updateusercompletedetails = await User.findOneAndUpdate({userProfile:req.user.id},newUserData, {new:true,runValidators:true})

res.status(200).json({
    success:true,
    updateusercompletedetails
})
 
   
   
  });




