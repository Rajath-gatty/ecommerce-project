import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: String,
    cart: [
      {
        quantity: Number,
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
    avatar: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateAccessToken = function () {
  const token = jwt.sign(
    { email: this.email, _id: this._id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "5 days",
    }
  );
  return token;
};

export const User = mongoose.model("User", userSchema);
