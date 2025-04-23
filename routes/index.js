import { Router } from "express";
import authRoutes from "./auth.js";
import portfolioRoutes from "./portfolioRoutes.js"; // Import portfolio routes
import emailRoutes from "./emailRoutes.js"; // Import email routes
const rootRouter = Router();

// Mount authentication routes
rootRouter.use("/auth", authRoutes);

// Mount portfolio routes
rootRouter.use("/portfolios", portfolioRoutes);

//Mount email routes
rootRouter.use("/email", emailRoutes);

export default rootRouter;
