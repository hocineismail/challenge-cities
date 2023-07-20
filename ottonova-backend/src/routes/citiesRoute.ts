import 'reflect-metadata';
import { Router, Request, Response, NextFunction } from 'express';
import { CitiesController } from '@controllers/cities/cities.controller';
import { IRouter } from '@utils/handlers.decorator';

// Create a new Express Router to define citiesRoutes
const citiesRoutes = Router();

// Create an instance of CitiesController to handle cities-related requests
const citiesController = new CitiesController();

// Get the base path for the cities routes from the metadata on CitiesController
const basePath = Reflect.getMetadata('base_path', CitiesController);

// Get the routers array from the metadata on CitiesController
const routers: IRouter[] = Reflect.getMetadata('routers', CitiesController);

// Iterate through the routers array to define routes on the citiesRoutes Router
routers.forEach((router: IRouter) => {
    const { method, path, handlerName } = router;
    // Define the route on citiesRoutes with the appropriate HTTP method and path
    // Use type assertion to cast citiesController to 'any' to access the handler function dynamically
    (citiesRoutes as any)[method](`${basePath}${path}`, (req: Request, res: Response, next: NextFunction) =>
        (citiesController as any)[handlerName](req, res, next)
    );
});

// Export the citiesRoutes Router to be used in the application
export default citiesRoutes;
