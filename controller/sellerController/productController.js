const { json } = require("body-parser");
const catchAsyncError = require("../../middleware/catchAsyncError");
const AllUser = require("../../models/alluser");
const Seller = require("../../models/sellerModel/sellerSchema");
const ErrorHander = require("../../utils/errorhander");
const Product = require("../../models/productSchema");
const ApiFeatures = require("../../utils/apifeatures");

//   create product by seller
exports.createProductBySeller = catchAsyncError(async (req, res, next) => {
  // for seller
  const productExist = await Product.findOne({ name: req.body.name });
  const addedBySameId = await Product.findOne({ user_id: req.seller.id });
  if (addedBySameId) {
    if (productExist) {
      return next(
        new ErrorHander(
          "This Product is already exist, please add new product "
        )
      );
    } else {
      req.body.user_id = req.seller.id;
      req.body.added_by = req.seller.role;

      const product = await Product.create(req.body);

      res.status(201).json({
        success: true,
        product,
      });
    }
  } else {
    req.body.user_id = req.seller.id;
    req.body.added_by = req.seller.role;

    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  }
});

// update product by seller

exports.updateProductBySeller = catchAsyncError(async (req, res, next) => {
const  product = await Product.findById(req.params.id)
if(product){
 if(product.user_id==req.seller.id){
   const prod =  await Product.findByIdAndUpdate(req.params.id ,req.body, {new:true,runValidators:true})
  
   res.status(200).json({
    success:true,
    prod
   })
 }
 else{
    return next(new ErrorHander("you can not update this product",400))
 }
}
else{
    return next(new ErrorHander("product does not exist with this id",400))

}

// const product = await Product.findByIdAndUpdate({_id:req.params.id},req.body , {new:true,runValidators:true})

// res.status(201).json({
//     success:true,
//     product,
//     msg:"product updated successfully"
// })

 
});



// get All Products
exports.getAllProductsBySeller = catchAsyncError(async (req, res, next) => {
 const resultperPage = 2;
 const apiFeatures = new ApiFeatures( Product.find({user_id:req.seller.id}),req.query).search().filter().pagination(resultperPage);
 const products = await apiFeatures.query
  const productsCount = products.length
  if (products.length < 1) {
    return next(
      new ErrorHander("Product does not exist please add Products", 401)
    );
  }

  res.status(200).json({
    success: true,
    products,
    productsCount,
  });
});


// delete product by seller

exports.deleteProductBySeller = catchAsyncError(async (req, res, next) => {
  const product = await Product.findByIdAndDelete({ _id: req.params.id }, );

  if (!product) {
    return next(
      new ErrorHander(`product not found with this id ${req.params.id}`, 401)
    );
  }
  res.status(201).json({
    success: true,
    msg: "Product deleted successfully",
  });
});




// get single prodcuts by seller

exports.getSingleProductBySeller = catchAsyncError(async (req,res,next)=>{

    const product = await Product.findById(req.params.id)

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