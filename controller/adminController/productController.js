
const { json } = require("body-parser");
const catchAsyncError = require("../../middleware/catchAsyncError");
const AllUser = require("../../models/alluser");
const Seller = require("../../models/sellerModel/sellerSchema");
const ErrorHander = require("../../utils/errorhander");
const Product = require("../../models/productSchema");
const ApiFeatures = require("../../utils/apifeatures");

 


//   create product by admin
exports.createProductByAdmin = catchAsyncError(async (req,res,next)=>{
    // for seller
//    const productExist  = await Product.findOne({name:req.body.name})
//    const addedBySameId = await Product.findOne({user_id:req.admin.id})
//    if(addedBySameId){
//    if(productExist){
//     console.log("yes")
//    }
//    else{
//     console.log("no")
//    }
//    }else{
//     req.body.user_id = req.admin.id
//     req.body.added_by=req.admin.role
   
//     const product = await Product.create(req.body)

//     res.status(201).json({
//         success:true,
//         product
//     })
//    }
    req.body.user_id = req.admin.id
    req.body.added_by=req.admin.role
   
    const product = await Product.create(req.body)

    res.status(201).json({
        success:true,
        product
    })
})
 

// update product by admin

exports.updateProductByAdmin = catchAsyncError(async (req,res,next)=>{

    const productsUpdate = await Product.findById(req.params.id)

    if(productsUpdate){
        const product = await Product.findByIdAndUpdate({_id:req.params.id},req.body , {new:true,runValidators:true})
    
        res.status(201).json({
            success:true,
            product
        })
    }
    else{
        return next(new ErrorHander(`product not found with this id ${req.params.id}`,401))
    }
   
})




// get single prodcuts by admin

exports.getSingleProductByAdmin = catchAsyncError(async (req,res,next)=>{

    const product = await Product.findById(req.params.id).populate("user_id")
     
    if(product){
       res.status(200).json({
        success:true,
        product
       })
    }
    else{
        return next(new ErrorHander(`product not found with this id ${req.params.id}`,401))
    }
   
})


// get All Productts 

exports.getAllPRoductsByAdmin = catchAsyncError(async (req,res,next)=>{
    const resultperPage = 20;
    const productCount = await Product.countDocuments()
    const apiFeatures = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultperPage)
    const products = await apiFeatures.query
    const filterProductCount = products.length

    // if(products.length<1){
    //     return next(new ErrorHander("Product does not exist please add Products" , 401))
    // }


    res.status(200).json({
        success:true,
        products,
        productCount,
        filterProductCount
    })

})



// delete product by admin

exports.deleteProductByAdmin = catchAsyncError(async (req,res,next)=>{
   
    const product = await Product.findByIdAndDelete({_id:req.params.id}, {new:true,runValidators:true})


    if(!product){
        return next(new ErrorHander(`product not found with this id ${req.params.id}`,401))
    }
    res.status(201).json({
        success:true,
        msg:"Product deleted successfully"
    })
})








