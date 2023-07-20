import { Request, Response, NextFunction } from 'express';

/**
 * CustomError interface to represent custom error objects.
 */
interface CustomError {
    statusCode: number;
    message: string;
}

/**
 * errorHandler function to handle custom errors and send appropriate responses.
 * @param error The custom error object.
 * @param _: The Express Request object (unused).
 * @param response The Express Response object.
 * @param next The Express NextFunction for error handling.
 */
export function errorHandler(error: CustomError, _: Request, response: Response, next: NextFunction) {

    // if the error has a statusCode property  
    if (error.statusCode) {
        // Send the response with the custom status code and error message
        response.status(error.statusCode).send(error.message);
    } else {
        // If the error does not have a statusCode property, handle it as a generic internal server error
        // Send a 500 Internal Server Error response with a default error message
        response.status(500).send("Something unexpected happened");
    }
    // Call the next middleware in the Express middleware chain
    next();
}

