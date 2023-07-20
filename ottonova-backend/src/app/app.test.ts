import request from 'supertest';
import express from 'express';
import 'reflect-metadata';


import { corsHandler } from '@middleware/corsHandler';

import { Logger } from '@middleware/Logger';
import { errorHandler } from '@middleware/ errorHandler';
import citiesRoutes from '@routes/citiesRoute';

const app = express();

// Apply middleware
app.use(Logger);
app.use(corsHandler);
app.use('/api/v1/', citiesRoutes);
app.use(errorHandler);


// Mock the console.log method
jest.spyOn(console, 'log').mockImplementation(() => { });

describe('Express App Test', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    // Test middleware
    it('should pass the Logger middleware', async () => {
        // Send a dummy GET request to the server
        const response = await request(app).get('/api/v1/cities');

        // You can add assertions here based on the expected behavior of the Logger middleware
        expect(response.statusCode).toBe(200);
    });

    // Test the citiesRoutes
    it('should get cities successfully from citiesRoutes', async () => {
        // Send a GET request to /api/v1/cities
        const response = await request(app).get('/api/v1/cities');

        // You can add assertions here based on the expected behavior of the citiesRoutes
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(false); // Expecting an object, not an array

        // Assuming the route returns an object with city data:
        expect(response.body).toHaveProperty('cities');

    });

    // // Test the errorHandler
    it('should handle errors correctly', async () => {
        // Send a POST request to /api/v1/some-endpoint that triggers an error
        const response = await request(app).post('/api/v1/some-endpoint').send({});

        // You can add assertions here based on the expected behavior of the errorHandler
        expect(response.status).toBe(404);
        // console.log(response)
        // expect(response.body.message).toBe('Something unexpected happened');
        // Add more specific assertions as needed based on the actual response data.
    });

});
