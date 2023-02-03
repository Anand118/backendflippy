const { json } = require("body-parser");
const catchAsyncError = require("../../middleware/catchAsyncError");
const AllUser = require("../../models/alluser");
const Seller = require("../../models/sellerModel/sellerSchema");
const ErrorHander = require("../../utils/errorhander");
const ApiFeatures = require("../../utils/apifeatures");
const Category = require("../../models/categorySchemal");

// add category
exports.createCategoryByAdmin = catchAsyncError(async (req, res, next) => {
  const catdata = {
    parent_name: req.body.parent_name,
    sub_category: [
      {
        sub_name: req.body.sub_name,
        icon: "a",
        commission: req.body.commission,
        featured: req.body.featured,
      },
    ],
    meta_title: req.body.meta_title,
    meta_description: req.body.meta_description,
    attributedata:req.body.attributedata
  };
  const subCatdata = {
    sub_name: req.body.sub_name,
    icon: "a",
    commission: req.body.commission,
    featured: req.body.featured,

    meta_title: req.body.meta_title,
    meta_description: req.body.meta_description,
    attributedata:req.body.attributedata
  
  };

  const isExistparent = await Category.findOne({
    parent_name: req.body.parent_name
  });

  if (isExistparent) {
    const { sub_name, commission } = req.body;
    if (!sub_name || !commission) {
      return next(
        new ErrorHander("please enter with sub category and commission", 401)
      );
    } else {
    
        const update_sub_cat = await Category.findOneAndUpdate(
          { parent_name: req.body.parent_name },
          { $push: { sub_category: subCatdata } },
          { new: true, runValidators: true }
        );
        res.status(201).json({
          success: true,
          update_sub_cat,
        });
     

    }
  } else {
    const {parent_name,sub_name, commission} =req.body
    if(!parent_name || !sub_name || !commission){
      return next(new ErrorHander("please enter all field"))
    }
    const category = await Category.create(catdata);
    res.status(201).json({
      success: true,
      category,
    });
  }
});

// update category
exports.updateCategoryByAdmin = catchAsyncError(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    return next(new ErrorHander("sorry category can not update"));
  }
  res.status(201).json({
    success: true,
    category,
  });
});

//delete category

exports.deleteCategoryByAdmin = catchAsyncError(async (req, res, next) => {
  const { id, catId } = req.params;

  const maincat = await Category.findById(catId);

  if (maincat.sub_category.length <= 1) {
    maincat.remove();
  }

  const category = await Category.updateMany(
    { _id: catId },
    { $pull: { sub_category: { _id: id } } },
    { new: true }
  );

  if (!category) {
    return next(
      new ErrorHander(`category does not exist with this id ${req.params.id}`)
    );
  }
  res.status(201).json({
    success: true,
    category,
    msg: "category deleted successfully",
  });
});

// get single category
exports.getSingleCategoryByAdmin = catchAsyncError(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(
      new ErrorHander(`category does not exist with this id ${req.params.id}`)
    );
  }
  res.status(201).json({
    success: true,
    category,
  });
});

// get all category
exports.getAllCategoryByAdmin = catchAsyncError(async (req, res, next) => {
  const allcategory = await Category.find();
  // if(allcategory.length===0){
  //     return next (new ErrorHander(`categories are not exist`))
  // }
  res.status(201).json({
    success: true,
    allcategory,
  });
});
