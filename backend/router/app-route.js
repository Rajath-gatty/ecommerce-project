import express from "express";
import * as AppController from "../controller/app-controller.js";

export const router = express.Router();

router.post("/products", AppController.getProducts);
