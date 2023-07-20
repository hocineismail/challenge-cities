import { Request, Response } from 'express';
import { corsHandler } from './corsHandler';
import { errorHandler } from './ errorHandler';



// Mock console.log to capture log messages
jest.spyOn(console, 'log').mockImplementation();
interface CustomError {
    statusCode: number;
    message: string;
}


describe('corsHandler', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should set the correct headers', () => {
        const mockRequest = {} as Request;
        const mockResponse = {
            header: jest.fn(),
        } as unknown as Response;
        const mockNext = jest.fn();

        corsHandler(mockRequest, mockResponse, mockNext);

        expect(mockResponse.header).toHaveBeenCalledWith(
            'Access-Control-Allow-Origin',
            '*'
        );
        expect(mockResponse.header).toHaveBeenCalledWith(
            'Access-Control-Allow-Methods',
            'GET'
        );
        expect(mockResponse.header).toHaveBeenCalledWith(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        );
        expect(mockNext).toHaveBeenCalled();
    });
});



describe('errorHandler', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should send error message with status code', () => {
        const mockError: CustomError = { statusCode: 400, message: 'Bad Request' };
        const mockRequest = {} as Request;
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        } as unknown as Response;
        const mockNext = jest.fn();

        errorHandler(mockError, mockRequest, mockResponse, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.send).toHaveBeenCalledWith('Bad Request');
        expect(mockNext).toHaveBeenCalled();
    });

    it('should send default error message with status code 500', () => {
        const mockError: CustomError = { statusCode: 500, message: 'Something unexpected happened' };
        const mockRequest = {} as Request;
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        } as unknown as Response;
        const mockNext = jest.fn();

        errorHandler(mockError, mockRequest, mockResponse, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.send).toHaveBeenCalledWith('Something unexpected happened');
        expect(mockNext).toHaveBeenCalled();
    });
});

// describe('routeLogger', () => {
//     it('should log the route access information', () => {
//         const mockRequest = {
//             method: 'GET',
//             originalUrl: '/example',
//         } as unknown as Request;
//         const mockResponse = {
//             on: jest.fn().mockImplementation((event: string, callback: () => void) => {
//                 if (event === 'finish') {
//                     callback();
//                 }
//             }),
//             statusCode: 200,
//             statusMessage: 'OK',
//         } as unknown as Response;
//         const mockNext = jest.fn() as NextFunction;

//         const startTime = new Date();
//         routeLogger(mockRequest, mockResponse, mockNext);
//         const endTime = new Date();
//         const elapsedTime = endTime.getTime() - startTime.getTime();

//         const logMessage = `Route accessed: GET /example | Status: 200 OK | Elapsed Time: ${elapsedTime}ms`;

//         expect(mockResponse.on).toHaveBeenCalledWith('finish', expect.any(Function));
//         expect(console.log).toHaveBeenCalledWith(expect.stringMatching(logMessage));
//         expect(mockNext).toHaveBeenCalled();
//     });
// });