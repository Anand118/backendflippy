const catchAsyncError = require("../../middleware/catchAsyncError");
const permanentDeleteSeller = require("../../models/adminModel/permanentDeleteSeller");
const AllUser = require("../../models/alluser");
const Seller = require("../../models/sellerModel/sellerSchema");
const ErrorHander = require("../../utils/errorhander");
const sendToken = require("../../utils/jwtToken");
const sendSellerToken = require("../../utils/sellerJwtToken");




// seller registration-------------------------------
exports.registerSeller = catchAsyncError(async (req, res, next) => {
  const {email,otp_mobile,otp_email, phone, password } = req.body;
const deletedSeller  =await permanentDeleteSeller.find()
const sellerEmail = deletedSeller.find(element => element.seller.email===email)
const sellerPhone = deletedSeller.find(element => element.seller.phone===phone)

if(sellerEmail){

  return next(new ErrorHander("Your Seller Account is Permanent Deleted ! Email Id ", 400))
}
else if(sellerPhone){
  return next(new ErrorHander("Your Seller Account is Permanent Deleted ! Phone No.", 400))

}
else{
   const seller = await AllUser.create({
      email, 
      phone,
      password,
      otp_mobile,
      otp_email,
      role:"seller",
      avatar: {
        public_id: "kakalegayetamatar", 
        url: "chachalegayekela",
      },
    });
    sendSellerToken(seller, 200, res); 
}
     
   


});

// seller login -------------------------------
exports.sellerLogin = catchAsyncError(async (req, res, next) => {
    const { email, phone, password } = req.body;
  
    if (!password) {
      return next(new ErrorHander("please enter email or phone and passwrod", 400));
    } else if (email || phone) {
      const seller = await AllUser.findOne({ $or: [{ email }, { phone }] }).select(
        "+password"
      );
      if(!seller){
        return next(new ErrorHander("Invalid Seller Credential",401))
      }
  
      if (seller.role === "seller") {
        if (!seller) {
          return next(new ErrorHander("Invalid email or password", 401));
        }
  
        const isPasswordMatched = await seller.comparePassword(password);
  
        if (!isPasswordMatched) {
          return next(new ErrorHander("password does not match"));
        }
  
        sendSellerToken(seller, 201, res);
      } else {
        return next(new ErrorHander("seller does not exist"));
      }
    } else {
      return next(new ErrorHander("please enter all field", 401));
    }
  });


  //  seller profile --------------------------

  exports.getSellerDetails =catchAsyncError (async (req,res,next)=>{
    const seller = await AllUser.findById(req.seller.id)

      res.status(200).json({
        success:true,
        seller
    })
  

   
})


// logout user

exports.sellerLogout = catchAsyncError(async (req, res, next) => {
  res.cookie("flippyseven_seller_token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "logged out succesfully",
  });
});


// update seller password

exports.updateSellerPassword = catchAsyncError(async (req,res,next)=>{
  const seller = await AllUser.findById(req.seller.id).select("+password")
  const isPasswordMatched = await seller.comparePassword(req.body.oldPassword)
  if(!isPasswordMatched){
return next(new ErrorHander("Old Password isnot correct",400))
  }
if(req.body.newPassword !== req.body.confirmPassword){
  return next(new ErrorHander("password does not match",400))
}
seller.password = req.body.newPassword
await seller.save()
sendSellerToken(seller,200,res)

})

exports.updateSellerProfile =catchAsyncError( async(req,res,next)=>{
  const newSellerData = {
      name : req.body.name,
      email : req.body.email,
      phone : req.body.phone
  }
  
  const seller = await AllUser.findByIdAndUpdate(req.seller.id,newSellerData, {new:true,runValidators:true})
  
  res.status(200).json({
      success:true,
      seller
  })
})






// register complete seller details
exports.registerAllSellerdetails = catchAsyncError(async (req, res, next) => {
  const selleralldetails = await Seller.findOne({sellerProfile:req.seller.id})

if(selleralldetails){
   return next (new ErrorHander("you have filled your details only you can update"))

}
else{
  const seller = await Seller.create({
    sellerProfile:req.seller.id,
    gst:req.body.gst, 
    pickup_address:{
      house_no:req.body.house_no, 
      landmark:req.body.landmark,
      postal_code:req.body.postal_code,
      city:req.body.city,
      state:req.body.state,
    },
    bank_details:{
      account_number:req.body.account_number,
      ifsc_code:req.body.ifsc_code
    },
    supplier_details:{
      store_name:req.body.store_name,
      your_name:req.body.your_name
    }

   
 
  });
  res.status(200).json({
    success:true,
    msg:"seller details submitted",  
    seller  
  })
}



});







// update complete seller details
exports.updateAllSellerdetails = catchAsyncError(async (req, res, next) => {
  const updatesellerdata= {
    sellerProfile:req.seller.id,
    gst:req.body.gst,
    pan:req.body.pan, 
    pickup_address:{
      house_no:req.body.house_no, 
      street:req.body.street,
      landmark:req.body.landmark,
      postal_code:req.body.postal_code,
      city:req.body.city,
      state:req.body.state,
    },
    bank_details:{
      account_number:req.body.account_number,
      ifsc_code:req.body.ifsc_code
    },
    supplier_details:{
      store_name:req.body.store_name,
      your_name:req.body.your_name
    }
  }

  const  sellerDetails  = await Seller.findOne({sellerProfile:req.seller.id})
 if(sellerDetails){
  const updatedSellerDetails = await Seller.findOneAndUpdate({sellerProfile:req.seller.id},updatesellerdata, {new:true,runValidators:true})
  res.status(200).json({
    success:true,
    msg:"seller details submitted",  
    sellerDetails  
  })
 }
 else{
const addSellerDetails = await Seller.create(updatesellerdata)
res.status(200).json({
  success:true,
  msg:"seller details submitted",  
  addSellerDetails
})
 }
  






});












// get all complete seller details
exports.AlldetailsOfSeller = catchAsyncError(async (req, res, next) => {
const selleralldetails = await Seller.findOne({sellerProfile:req.seller.id}).populate("sellerProfile")

if(!selleralldetails){
  return next(new ErrorHander("Incomplete details"))
}
res.status(200).json({
  success:true, 
  selleralldetails
}) 
 
}) ;
 
 





