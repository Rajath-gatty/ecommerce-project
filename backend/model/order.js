import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    total_price: {
      type: Number,
      required: true,
    },
    products: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    delivery_address: {
      name: String,
      address_line_1: String,
      pincode: Number,
      city: String,
    },
    status: {
      type: String,
      enum: ["delivered", "in_progress", "shipped"],
      default: "in_progress",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
