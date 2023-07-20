import 'reflect-metadata';
import { CitiesController } from './cities.controller';
import { CitiesService } from '@services/cities/cities.service';
import { NextFunction } from 'express';

// Mock the console.log method
jest.spyOn(console, 'log').mockImplementation(() => { });

class CustomError extends Error {
    statusCode: number;
    constructor(message?: string) {
        super(message);
        this.statusCode = 500;
    }
}

jest.mock('@services/cities/cities.service');

describe('CitiesController', () => {
    let citiesController: CitiesController;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNext: jest.Mock<NextFunction>;

    beforeEach(() => {
        citiesController = new CitiesController();
        mockRequest = {} as Partial<Request>;
        mockResponse = {
            status: jest.fn().mockReturnThis() as any, // Type assertion to handle the mockReturnThis() function
            json: jest.fn() as any, // Type assertion to handle the mocked json() function
        };
        mockNext = jest.fn();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call getCities method of citiesService and send the response with status 200', async () => {
        // Mock the getCities method of CitiesService
        const getCitiesMock = jest.spyOn(CitiesService.prototype, 'getCities');
        getCitiesMock.mockResolvedValue(['City1', 'City2']);

        await citiesController.getCities(mockRequest as any, mockResponse as any, mockNext);

        expect(getCitiesMock).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(['City1', 'City2']);
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('should call next with a CustomError when getCities method of citiesService throws an error', async () => {
        // Mock the getCities method of CitiesService to throw a CustomError
        const getCitiesMock = jest.spyOn(CitiesService.prototype, 'getCities');
        const customError = new CustomError('Something Wrong');
        getCitiesMock.mockRejectedValue(customError);

        await citiesController.getCities(mockRequest as any, mockResponse as any, mockNext);

        expect(getCitiesMock).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).not.toHaveBeenCalled();
        expect(mockResponse.json).not.toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalledWith(customError); // Ensure mockNext is called with the exact CustomError instance.
    });
});
