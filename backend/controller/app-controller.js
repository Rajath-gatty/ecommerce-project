import { Product } from "../model/index.js";
import { ApiError } from "../utils/ApiError.js";

export const getProducts = async (req, res) => {
  const { page, limit, search = "" } = req.body;

  if (!page || !limit) {
    return ApiError(422, "Not provided the required parameters");
  }

  const searchFilter = search
    ? { title: { $regex: search, $options: "i" } }
    : {};

  const result = await Product.find(searchFilter)
    .skip(page * limit)
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
