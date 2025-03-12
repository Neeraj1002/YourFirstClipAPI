import "dotenv/config";
import express from 'express';
import cors from 'cors';
import rootRouter from "./routes/index.js";
import { errorMiddleware } from "./middleware/error.js";

const app = express();
const PORT = process.env.PORT;



//cors allow
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001', // If you still need it
    'https://yourfirstclip.com',
    'https://your-first-clip.vercel.app/',
];

app.use(cors({
    origin: 'https://your-first-clip.vercel.app', // Replace with your frontend URL
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // If you need credentials (cookies, auth tokens), set this to true
    preflightContinue: false,
    optionsSuccessStatus: 204
}));




// Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use('/api', rootRouter);

// Error handling middleware should be added after all routes and other middleware
app.use(errorMiddleware);

// Global error handling for uncaught exceptions and unhandled rejections
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1); // Exit process after handling uncaught exception
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    process.exit(1); // Exit process after handling unhandled rejection
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
