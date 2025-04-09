import express from "express";

const router = express.Router();

router.post("/login", () => "Login controller");
router.post("/sign-in", () => "Sign in controller");

export { router as authRouter };
