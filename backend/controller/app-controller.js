import { Product } from "../model/index.js";
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
