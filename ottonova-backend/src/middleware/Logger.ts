import { Request, Response, NextFunction } from 'express';

/**
 * Middleware function to log route access information.
 * @param req The Express Request object.
 * @param res The Express Response object.
 * @param next The Express NextFunction for passing control to the next middleware.
 */
export function Logger(req: Request, res: Response, next: NextFunction) {
    const startTime = new Date();
    const { method, originalUrl } = req;

    // Attach a 'finish' event listener to the response object to log route access information after the response is sent
    res.on('finish', () => {
        const { statusCode, statusMessage } = res;
        const endTime = new Date();
        const elapsedTime = endTime.getTime() - startTime.getTime();
        const logMessage = `[${endTime.toISOString()}] info: : ${getColorizedMethod(method)} ${originalUrl} | Status: ${getColorizedStatus(statusCode)} ${statusMessage} | Elapsed Time: ${elapsedTime}ms`;
        // Output the log message to the console
        console.log(logMessage);
    });

    // Call the next middleware in the Express middleware chain
    next();
}

/**
 * Helper function to get the colorized HTTP method for logging.
 * @param method The HTTP method.
 * @returns The colorized HTTP method string.
 */
function getColorizedMethod(method: string): string {
    const colorReset = '\x1b[0m'; // Reset color
    const colorGreen = '\x1b[32m'; // Green color

    return `${colorGreen}${method}${colorReset}`;
}

/**
 * Helper function to get the colorized status code for logging.
 * @param statusCode The HTTP status code.
 * @returns The colorized status code string.
 */
function getColorizedStatus(statusCode: number): string {
    const colorReset = '\x1b[0m'; // Reset color
    const colorGreen = '\x1b[32m'; // Green color 
    return `${colorGreen}${statusCode}${colorReset}`;
}
