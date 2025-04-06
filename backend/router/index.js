import { router as appRouter } from "./app-route.js";
import { router as authRouter } from "./auth-route.js";

// Option 1: Combine into a single object
export const router = { app: appRouter, auth: authRouter };
