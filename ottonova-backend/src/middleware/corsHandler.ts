import { Request, Response, NextFunction } from 'express';

/**
 * corsHandler middleware function to handle CORS (Cross-Origin Resource Sharing) headers.
 * @param req The Express Request object.
 * @param res The Express Response object.
 * @param next The Express NextFunction for passing control to the next middleware.
 */
export function corsHandler(req: Request, res: Response, next: NextFunction) {
    // Set the necessary CORS headers in the response
    // '*' We can add the domain that we need,'*' is mean accept all domain
    res.header('Access-Control-Allow-Origin', '*');
    // You can use what do you want POST UPDATE DELETE GET
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    // Call the next middleware in the Express middleware chain
    next();
}
