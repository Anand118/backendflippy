const express = require("express")
const { registerUser, loginuser, logout, getUserDetails, updatePassword, updateProfile, registerAlldetails, AlldetailsOfUser, UpdateAlldetailsOfUser } = require("../../controller/userController/userController")
const {isAuthenticatedUser} =require("../../middleware/auth")
const Router = express.Router()


Router.route("/signup").post(registerUser)
Router.route("/login").post(loginuser)
Router.route('/logout').get(logout)
Router.route("/me").get(isAuthenticatedUser, getUserDetails)
Router.route("/me/password/update").put(isAuthenticatedUser, updatePassword)
Router.route("/me/updateProfile").put(isAuthenticatedUser,updateProfile)


Router.route("/me/fill/complete/details").post(isAuthenticatedUser,registerAlldetails)
Router.route("/me/show/complete/details/user").get(isAuthenticatedUser,AlldetailsOfUser)
Router.route("/me/update/complete/details").put(isAuthenticatedUser,UpdateAlldetailsOfUser)




module.exports = Router