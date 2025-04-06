import express from "express";
import "dotenv/config";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import { ApiError } from "./utils/ApiError.js";
import { router } from "./router/index.js";
const app = express();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));

app.use("/api", router.auth);
app.use("/api", router.app);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/shop?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(8080, () => {
      console.log("server started");
    });
  })
  .catch(() => {
    throw new Error("Database connection failed");
  });

app.use((err, __, res, _) => {
  if (!(err instanceof ApiError)) {
    return res.status(500).json({ error: "Something went wrong" });
  }
  return res
    .status(err.status || 500)
    .json({ error: err.message || "Something went wrong" });
});
