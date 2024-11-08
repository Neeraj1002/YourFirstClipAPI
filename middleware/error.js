export const errorMiddleware = (error, req, res, next) => {

    // Default to 500 Internal Server Error if statusCode is not set
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
        message: error.message || 'An unexpected error occurred',
        errorCode: error.errorCode || 'UNKNOWN_ERROR',
        errors: error.error || [] 
    });
};
