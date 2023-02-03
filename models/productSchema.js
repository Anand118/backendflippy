const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter product name"],
  },
  added_by: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: "AllUser",
    required: true,
  },
  category_id: {
    type: String,
    required: [true, "please enter product category"],
  },

  brand_id: {
    type: String,
  },

  refundable: {
    type: Boolean,
    default: false,
    required: [true, "please enter refundable process"],
  },

  photos: [
    {
      type: String,
      required: true,
    },
  ],
  thumbnail_img: {
    type: String,
    required: true,
  },
  video_provider: {
    type: String,
  },
  video_link: {
    type: String,
  },

  tags: [
    {
      type: String,
    },
  ],

  description: {
    type: String,
    required: [true, "please enter product desscription"],
  },

  unit_price: {
    type: Number,
    maxLength: [8, "cannot exceed max 8 character"],
    required:[true,"please enter product price"]
  },
  purchase_price: {
    type: Number,
  },

  colors: [
    {
      type: String,
    },
  ],
  attributes: [
    {
      input_attr_val: [
        {
          type: String,
        },
      ],
    },
  ],

  todays_deal: {
    type: Number,
    default: 0,
    max: [1, "only 0 and 1 , 0 for off  1m for On"],
  },
  published: {
    type: Number,
    default: 0,
    max: [1, "only 0 and 1 , 0 for off  1m for On"],
  },
  approved: {
    type: Number,
    default: 0,
    max: [1, "only 0 and 1 , 0 for off  1m for On"],
  },

  stock_visibility_state: {
    type: String,
    default: "quantity",
  },
  cash_on_delivery: {
    type: Number,
    default: 0,
    max: [1, "only 0 and 1 , 0 for off  1m for On"],
  },
  featured: {
    type: Number,
    default: 0,
    max: [1, "only 0 and 1 , 0 for off  1m for On"],
  },
  seller_featured: {
    type: Number,
    default: 0,
    max: [1, "only 0 and 1 , 0 for off  1m for On"],
  },

  current_stock: {
    type: Number,
    required: [true, "please enter Product Stock"],
    maxLength: [10, "stock cannot exceed 4 character"],
    default: 1,
  },

  unit: {
    type: Number,
    required: [true, "please enter product unit or weight"],
    max: [50, "your product unit cannot exceed 50 kg"],
  },

  min_qty: {
    type: Number,
    default: 1,
    required: [true, "please enter product quantity"],
    min: [1, "your product quantity should be 1"],
  },

  low_stock_quantity: {
    type: Number,
    required: [true, "please enter lowest stock warning"],
    min: [1, "lowest stock qty will be 1"],
  },
  discount: {
    type: Number,
    // required: true,
    max: [100, "please enter dicount rate  based on flat or percent"],
  },
  discount_type: {
    type: String,
    default: "percent",
  },

  discount_start_date: {
    type: Date,
  },
  discount_end_date: {
    type: Date,
  },
  tax: {
    type: Number,
  },
  tax_type: {},

  shipping_type: {
    type: String,
    default: "free",
  },

  shipping_cost: {
    type: Number,
    default: 0,
  },
  is_quantity_multiplied: {
    type: Number,
    default: 1,
    // required: [true, "please enter product quantity"],
    min: [1, "1 is multipled with shipping cost"],
  },
  est_shipping_days: {
    type: Number,
    required: true,
  },
  meta_title: {
    type: String,
  },
  meta_description: {
    type: String,
  },

  sku: {
    type: String,
  },

  ratings: {
    type: Number,
    default: 0,
  },

  numofReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "AllUser",
        required: true,
      },
      name: {
        type: String,
        require: true,
      },
      rating: {
        type: Number,
        require: true,
      },
      comment: {
        type: String,
        require: true,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("product", productSchema);
