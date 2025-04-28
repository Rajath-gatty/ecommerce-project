import express from "express";
import * as AppController from "../controller/app-controller.js";
import { v4 } from "uuid";
import multer from "multer";
import path from "path";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "public", "product", "images"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + v4() + "." + file.originalname.split(".")[1]
    );
  },
});

// Check if uploaded file is an image
const fileFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg|avif)$/i)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  // You can also check mimetype
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed!"), false);
  }

  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter });

router.post("/products", AppController.getProducts);
router.get("/product/featured", AppController.getLatestProducts);
router.get("/product/new-arrival", AppController.getFeatured);
router.get("/products/:productId", AppController.getSingleProduct);
router.post("/product", upload.single("image"), AppController.createProduct);

router.get("/cart", isAuth, AppController.getCart);
router.post("/cart/add", isAuth, AppController.addCart);
router.delete("/cart/remove/:cartId", isAuth, AppController.removeFromCart);
// router.post("/cart/delete", AppController.getCart);

export { router as appRouter };
