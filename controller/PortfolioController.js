import prisma from "../DB/db.config.js";

// Helper: Extract YouTube Video ID
const getYouTubeVideoId = (url) => {
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname.includes("youtube.com")) {
      return parsedUrl.searchParams.get("v");
    }
    if (parsedUrl.hostname.includes("youtu.be")) {
      return parsedUrl.pathname.slice(1);
    }
  } catch {
    return null;
  }
};

// Fetch All Portfolio Data
export const fetchAllPortfolioData = async (req, res) => {
  try {
    const portfolioData = await prisma.portfolio.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        type: true,
        videoId: true,
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
  } finally {
    await prisma.$disconnect();
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
        videoId: true,
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
  } finally {
    await prisma.$disconnect();
  }
};

// Create New Portfolio
export const createNewPortfolio = async (req, res) => {
  const { title, description, type, youtubeLink, isLive, creator } = req.body;

  if (!title || !description || !type) {
    return res.status(400).json({
      status: 400,
      msg: "Title, description, and type are required fields",
    });
  }

  try {
    const existingCreator = await prisma.user.findUnique({
      where: { id: creator },
    });

    if (!existingCreator) {
      return res.status(404).json({
        status: 404,
        msg: "User does not exist",
      });
    }

    const videoId = youtubeLink ? getYouTubeVideoId(youtubeLink) : '';

    if (youtubeLink && !videoId) {
      return res.status(400).json({
        status: 400,
        msg: "Invalid YouTube link",
      });
    }

    const newPortfolio = await prisma.portfolio.create({
      data: {
        title,
        description,
        type,
        videoId: videoId ? videoId : '',
        isLive,
        creator: {
          connect: { id: creator },
        },
      },
    });

    return res.status(201).json({
      status: 201,
      data: newPortfolio,
      msg: "New Portfolio Created",
    });
  } catch (error) {
    console.error("Error creating portfolio:", error);
    return res.status(500).json({
      status: 500,
      msg: "Failed to create portfolio",
      error: error.message,
    });
  } finally {
    await prisma.$disconnect();
  }
};

// Update Portfolio by ID
// Update Portfolio by ID
export const updatePortfolio = async (req, res) => {
  const { id } = req.params;
  const { title, description, type, youtubeLink, isLive, creator } = req.body;

  try {
    const existingPortfolio = await prisma.portfolio.findUnique({
      where: { id: Number(id) },
    });

    if (!existingPortfolio) {
      return res.status(404).json({
        status: 404,
        msg: "Portfolio not found",
      });
    }

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

    const videoId = youtubeLink
      ? getYouTubeVideoId(youtubeLink)
      : existingPortfolio.videoId;

    if (youtubeLink && !videoId) {
      return res.status(400).json({
        status: 400,
        msg: "Invalid YouTube link",
      });
    }

    const updatedPortfolio = await prisma.portfolio.update({
      where: { id: Number(id) },
      data: {
        title:
          title !== undefined && title !== ""
            ? title
            : existingPortfolio.title,
        description:
          description !== undefined && description !== ""
            ? description
            : existingPortfolio.description,
        type:
          type !== undefined && type !== ""
            ? type
            : existingPortfolio.type,
        videoId,
        isLive:
          typeof isLive === "boolean"
            ? isLive
            : existingPortfolio.isLive,
        ...(creator && {
          creator: { connect: { id: creator } },
        }),
      },
    });

    console.log("Updated portfolio:", updatedPortfolio);

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
  } finally {
    await prisma.$disconnect();
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
  } finally {
    await prisma.$disconnect();
  }
};
