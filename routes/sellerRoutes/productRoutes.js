const express = require("express")
const { createProductBySeller, updateProductBySeller, getAllProductsBySeller, deleteProductBySeller, getSingleProductBySeller } = require("../../controller/sellerController/productController")
const {isAuthenticatedUser, authorizeRoles, isAuthenticatedSeller} =require("../../middleware/auth")
const Router = express.Router()


// Products -----------------------
Router.route("/seller/add/product").post(isAuthenticatedSeller, createProductBySeller)
Router.route("/seller/single/product/:id").get(isAuthenticatedSeller, getSingleProductBySeller)
Router.route("/seller/all/product").get(isAuthenticatedSeller, getAllProductsBySeller)
Router.route("/seller/update/product/:id").put(isAuthenticatedSeller, updateProductBySeller)
Router.route("/seller/delete/product/:id").delete(isAuthenticatedSeller,deleteProductBySeller)



module.exports =Router

