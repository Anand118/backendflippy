const mongoose = require("mongoose");

const deletedsellerSchema = new mongoose.Schema({
 
seller:{

},
sellerdetails:{

}


});

deletedsellerSchema.set('timestamps',true)

module.exports = mongoose.model("permanent_deleted_seller", deletedsellerSchema);
