import { Router } from "express";
import authRoutes from "./auth.js";
import portfolioRoutes from "./portfolioRoutes.js"; // Import portfolio routes

const rootRouter = Router();

// Mount authentication routes
rootRouter.use("/auth", authRoutes);

// Mount portfolio routes
rootRouter.use("/portfolios", portfolioRoutes);

export default rootRouter;
