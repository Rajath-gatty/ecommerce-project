import { Product, User } from "../model/index.js";
import { ApiError } from "../utils/ApiError.js";
import { safeValidateProductData } from "../validation/productValidation.js";
export const getProducts = async (req, res) => {
  const { page, limit, search = "" } = req.body;

  if (!page || !limit) {
    return ApiError(422, "Not provided the required parameters");
  }

  const searchFilter = search
    ? { title: { $regex: search, $options: "i" } }
    : {};

  const result = await Product.find(searchFilter)
    .skip((page - 1) * limit)
    .limit(limit);

  const totalProducts = await Product.find(searchFilter).countDocuments();

  const paginationData = {
    total: totalProducts,
    page: page,
    limit: limit,
  };

  res
    .status(200)
    .json({ success: true, data: { data: result, meta: paginationData } });
};

export const createProduct = async (req, res, next) => {
  console.log("Request reached controller");
  try {
    const {
      title,
      description,
      price,
      category,
      discountedPrice,
      size,
      rating,
      company,
      isFeatured,
    } = req.body;

    // Validation
    const { success, data, error } = safeValidateProductData(req.body);
    if (!success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.errors,
      });
    }
    if (!req.file) {
      throw new ApiError(422, "Image is required");
    }

    const image = "/product/images/" + req.file.filename;

    // Create new product
    const product = await Product.create({
      title,
      description,
      price,
      image,
      category,
      discountedPrice,
      size,
      rating,
      company,
      isFeatured,
      // Add any other fields from your schema
    });

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const getFeatured = async (req, res, next) => {
  try {
    const result = await Product.find({ isFeatured: true }).limit(10);
    res.status(200).json({ success: true, data: result ?? [] });
  } catch (err) {
    next(err);
  }
};

// Cart section
export const getCart = async (req, res, next) => {
  const userId = req.id;

  try {
    const user = await User.findById(userId).populate("cart.productId");
    if (!user) {
      throw new ApiError(401, "User not found");
    }
    res.status(200).json({ success: true, data: user.cart });
  } catch (err) {
    next(err);
  }
};

export const addCart = async (req, res, next) => {
  const { productId, quantity } = req.body;
  const userId = req.id;

  try {
    // Check if product exists
    const productExists = await Product.findById(productId);
    if (!productExists) {
      throw new ApiError(404, "Product not found");
    }

    // Check if the product is already in the cart
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(401, "User not found");
    }

    const existingCartItemIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    let updatedUser;

    if (existingCartItemIndex >= 0) {
      // Product already in cart, update quantity
      user.cart[existingCartItemIndex].quantity += quantity;
      await user.save();
      updatedUser = await User.findById(userId).populate("cart.productId");
    } else {
      // Product not in cart, add new item
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { $push: { cart: { productId, quantity } } },
        { new: true }
      ).populate("cart.productId");
    }

    res.status(200).json({ success: true, data: updatedUser.cart });
  } catch (err) {
    next(err);
  }
};

export const removeFromCart = async (req, res, next) => {
  const { cartId } = req.params;
  const userId = req.id;
  try {
    if (!cartId) {
      throw new ApiError(422, "No product found");
    }

    const updatedUser = await User.findByIdAndUpdate(userId, {
      $pull: { cart: { _id: cartId } },
    });

    if (!updatedUser) {
      throw new ApiError(404, "User not found");
    }

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
    });
  } catch (err) {
    next(err);
  }
};
