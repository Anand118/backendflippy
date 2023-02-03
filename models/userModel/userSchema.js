const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AllUser",
  },
  address: {
    type: String,
  },
  country: {
    type: String,
  },
  state:{
        type:String 
  },
  city:{
    type:String
 
  },
  postal_code:{ 
    type:String,
   minLength:[6, "postal code cannot be less than 6 character"],
   maxLength:[6, "postal code cannot be greater than 6 character"]
   
  }
  

});
userSchema.set('timestamps',true)


module.exports = mongoose.model("user", userSchema);
