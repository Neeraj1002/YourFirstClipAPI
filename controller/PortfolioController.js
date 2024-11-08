import prisma from "../DB/db.config.js";

// Fetch All Portfolio Data
export const fetchAllPortfolioData = async (req, res) => {
    try {
      const portfolioData = await prisma.portfolio.findMany({
        select: {
          id: true,
          title: true,
          description: true,
          type: true,
          youtubeLink: true,
          isLive: true,
          creator: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
            },
          },
        },
      });
      return res.status(200).json({
        status: 200,
        data: portfolioData,
        msg: "Fetched all portfolio data",
      });
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
      return res.status(500).json({
        status: 500,
        msg: "Failed to fetch portfolio data",
        error: error.message,
      });
    }
  };
  
  // Get Portfolio Details by ID
  export const getPortfolioDetails = async (req, res) => {
    const { id } = req.params;
  
    try {
      const portfolio = await prisma.portfolio.findUnique({
        where: { id: Number(id) },
        select: {
          id: true,
          title: true,
          description: true,
          type: true,
          youtubeLink: true,
          isLive: true,
          creator: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
            },
          },
        },
      });
  
      if (!portfolio) {
        return res.status(404).json({
          status: 404,
          msg: "Portfolio not found",
        });
      }
  
      return res.status(200).json({
        status: 200,
        data: portfolio,
        msg: "Fetched portfolio details",
      });
    } catch (error) {
      console.error("Error fetching portfolio details:", error);
      return res.status(500).json({
        status: 500,
        msg: "Failed to fetch portfolio details",
        error: error.message,
      });
    }
  };
  

// Add New Portfolio
export const createNewPortfolio = async (req, res) => {
    const { title, description, type, youtubeLink, isLive, creator } = req.body;
  
    if (!title || !description || !type) {
      return res.status(400).json({
        status: 400,
        msg: "Title, description, and type are required fields",
      });
    }
  
    try {
      // Check if the creator exists
      const existingCreator = await prisma.user.findUnique({
        where: { id: creator },
      });
  
      if (!existingCreator) {
        return res.status(404).json({
          status: 404,
          msg: "User does not exist",
        });
      }
  
      const newPortfolio = await prisma.portfolio.create({
        data: {
          title,
          description,
          type,
          youtubeLink,
          isLive,
          creator: {
            connect: { id: creator }, // Link to an existing user with the given ID
          },
        },
      });
  
      return res.status(201).json({
        status: 201,
        data: newPortfolio,
        msg: "New Portfolio Created",
      });
    } catch (error) {
      console.error("Error creating new portfolio:", error);
      return res.status(500).json({
        status: 500,
        msg: "Failed to create new portfolio",
        error: error.message,
      });
    }
  };
  





// Update Portfolio by ID
export const updatePortfolio = async (req, res) => {
    const { id } = req.params;
    const { title, description, type, youtubeLink, isLive, creator } = req.body;
  
    try {
      // Check if the portfolio exists
      const existingPortfolio = await prisma.portfolio.findUnique({
        where: { id: Number(id) },
      });
  
      if (!existingPortfolio) {
        return res.status(404).json({
          status: 404,
          msg: `Portfolio not found`,
        });
      }
  
      // Check if the updater (creator) exists
      if (creator) {
        const existingCreator = await prisma.user.findUnique({
          where: { id: creator },
        });
  
        if (!existingCreator) {
          return res.status(404).json({
            status: 404,
            msg: "User does not exist",
          });
        }
      }
  
      const updatedPortfolio = await prisma.portfolio.update({
        where: { id: Number(id) },
        data: {
          title: title || existingPortfolio.title,
          description: description || existingPortfolio.description,
          type: type || existingPortfolio.type,
          youtubeLink: youtubeLink || existingPortfolio.youtubeLink,
          isLive: typeof isLive === "boolean" ? isLive : existingPortfolio.isLive,
          updater: creator
            ? {
                connect: { id: creator }, // Link to an existing user with the given ID
              }
            : undefined, // Only update if creator is provided
        },
      });
  
      return res.status(200).json({
        status: 200,
        data: updatedPortfolio,
        msg: "Portfolio updated successfully",
      });
    } catch (error) {
      console.error("Error updating portfolio:", error);
      return res.status(500).json({
        status: 500,
        msg: "Failed to update portfolio",
        error: error.message,
      });
    }
  };

  





// Delete Portfolio by ID
export const deletePortfolio = async (req, res) => {
  const { id } = req.params;

  try {
    const existingPortfolio = await prisma.portfolio.findUnique({
      where: { id: Number(id) },
    });

    if (!existingPortfolio) {
      return res.status(404).json({
        status: 404,
        msg: `Portfolio with ID ${id} not found`,
      });
    }

    await prisma.portfolio.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({
      status: 200,
      msg: "Portfolio deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting portfolio:", error);
    return res.status(500).json({
      status: 500,
      msg: "Failed to delete portfolio",
      error: error.message,
    });
  }
};
