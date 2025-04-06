import express from "express";

export const router = express.Router();

router.post("/login", () => "Login controller");
router.post("/sign-in", () => "Sign in controller");
