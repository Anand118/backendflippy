const express = require("express")
const { sellerLogin, registerSeller, getSellerDetails, sellerLogout, updateSellerPassword, updateSellerProfile, registerAllSellerdetails, AlldetailsOfSeller, updateAllSellerdetails } = require("../../controller/sellerController/sellerController")
const {isAuthenticatedSeller} =require("../../middleware/auth")
const Router = express.Router()


Router.route("/seller_signup").post(registerSeller)
Router.route("/seller_login").post(sellerLogin)
Router.route('/seller/logout').get(sellerLogout)
Router.route('/seller/me').get(isAuthenticatedSeller, getSellerDetails)
Router.route("/seller/me/password/update").put(isAuthenticatedSeller, updateSellerPassword)
Router.route("/seller/me/updateProfile").put(isAuthenticatedSeller,updateSellerProfile)
 


Router.route("/seller/me/fill/complete/details").post(isAuthenticatedSeller,registerAllSellerdetails)
Router.route("/seller/me/update/complete/details").put(isAuthenticatedSeller,updateAllSellerdetails)
Router.route("/seller/me/show/complete/details").get(isAuthenticatedSeller,AlldetailsOfSeller)


module.exports =Router