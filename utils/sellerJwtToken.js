const sendSellerToken = (seller,statusCode,res)=>{
    const sellertoken = seller.getJWTTOKENSELLER();

    // create options
    const options = {
        expires:new Date(Date.now()+ process.env.COOKIE_EXPIRE_SELLER*24*60*60*1000 ),
        httpOnly:true

    }

    res.status(statusCode).cookie("flippyseven_seller_token",sellertoken,options).json({
        success:true,
        seller,
        sellertoken
    })
}
module.exports = sendSellerToken