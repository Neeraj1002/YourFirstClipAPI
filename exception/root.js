// Define the base exception class
export class HttpException extends Error {
    constructor(message, errorCode, statusCode, error) {
        super(message); // Call the parent class constructor
        this.message = message; // Fix the typo: should be `message`
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.error = error;
    }
}
