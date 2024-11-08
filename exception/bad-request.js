import { HttpException } from './root.js'; // Import the base exception class

// Define a specific type of exception
export class BadRequestsException extends HttpException {
    constructor(message, errorCode) {
        super(message, errorCode, 400, null); // Call the parent class constructor with a 400 status code
    }
}
