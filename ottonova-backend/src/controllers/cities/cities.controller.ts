
import { NextFunction, Request, Response } from "express";


import 'reflect-metadata';
import { Get } from "@utils/handlers.decorator";
import Controller from "@utils/controller.decorator";
import { CitiesService } from "@services/cities/cities.service";
// CustomError class that extends the Error class to handle custom errors with status code


class CustomError extends Error {
    statusCode: number;

    /**
     * Creates a new CustomError instance.
     * @param message The error message.
     */
    constructor(message?: string) {
        super(message);
        this.statusCode = 500;
    }
}

/**
 * CitiesController class that handles HTTP requests related to cities.
 */
@Controller('/cities')
export class CitiesController {
    readonly citiesService: CitiesService;

    /**
     * Creates a new instance of CitiesController.
     * Initializes citiesService with the appropriate instance of CitiesService.
     */
    constructor() {
        this.citiesService = new CitiesService();
    }

    /**
     * Handles HTTP GET request to get the list of cities.
     * @param req The Express Request object.
     * @param res The Express Response object.
     * @param next The Express NextFunction for error handling.
     */
    @Get('')
    public async getCities(_: Request, res: Response, next: NextFunction) {
        try {
            // Call the getCities method of the citiesService to get the data
            const data = await this.citiesService.getCities();
            // Send a successful response with status 200 and the data in JSON format
            res.status(200).json(data);
        } catch (error) {
            // If an error we need to create a CustomError instance with the appropriate status code and message
            console.log(error)
            const errorToThrow = new CustomError();
            errorToThrow.statusCode = 500;
            errorToThrow.message = "Something Wrong";
            // Pass the error to the next middleware for error handling
            next(errorToThrow);
        }
    }
}
