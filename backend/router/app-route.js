import express from "express";
import * as AppController from "../controller/app-controller.js";
import { v4 } from "uuid";
import multer from "multer";
import path from "path";

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
router.post("/product", upload.single("image"), AppController.createProduct);

export { router as appRouter };
