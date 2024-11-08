import { Router } from "express";
import { 
  createNewPortfolio,
  fetchAllPortfolioData,
  getPortfolioDetails,
  updatePortfolio,
  deletePortfolio 
} from "../controller/PortfolioController.js";

const router = Router();

// Create a new portfolio
router.post("/", createNewPortfolio);

// Fetch all portfolios
router.get("/", fetchAllPortfolioData);

// Fetch a portfolio by ID
router.get("/:id", getPortfolioDetails);

// Update a portfolio by ID
router.put("/:id", updatePortfolio);

// Delete a portfolio by ID
router.delete("/:id", deletePortfolio);

export default router;
