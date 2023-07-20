import * as fs from 'fs';
import { CitiesService } from './cities.service';

//mock json file to test readJsonFile function
const mockJSON = '{"cities":["City 1","City 2"]}';

// Mock fs.readFile to avoid actual file reading during tests
jest.mock('fs', () => ({
    readFile: jest.fn((_, encoding, callback) => callback(null, mockJSON)),
}));
describe('test Cities Service', () => {
    beforeEach(() => {
        // Reset the mock before each test
        jest.clearAllMocks();
    });
    it('getCities should return an json cities', async () => {

        const citiesService = new CitiesService();
        const result = await citiesService.getCities();
        expect(typeof result).toBe('object');
        // Check the content of the result 
        expect(JSON.stringify(result)).toBe(mockJSON);
    });

});














// jest.mock('fs');

// describe('ReadFileContentsSync', () => {
//     it('should read file contents', async () => {
//         const citiesService = new CitiesService()
//         const TEST_DATA = 'This is sample Test Data';
//         (fs.readFileSync as jest.Mock).mockReturnValue(TEST_DATA);
//         const ReadData = await citiesService.getCities()
//         console.log(ReadData)
//         // expect(fs.readFileSync).toHaveBeenCalled();
//         // expect(ReadData).toBe(TEST_DATA);
//     });
// });
// import * as fs from 'fs';
// import { CitiesService } from './cities.service';

// // Define the correct callback function signature for fs.readFile
// type FileCallback = (err: NodeJS.ErrnoException | null, data: string) => void;

// jest.mock('fs', () => ({
//     readFile: jest.fn((_path: string, _options: any, callback: FileCallback) => {
//         const data = JSON.stringify([
//             { name: 'City A', population: 1000000 },
//             { name: 'City B', population: 500000 },
//             { name: 'City C', population: 300000 },
//         ]);
//         callback(null, data);
//     }),
// }));

// describe('CitiesService', () => {
//     // Create an instance of CitiesService for each test
//     let citiesService: CitiesService;

//     beforeEach(() => {
//         citiesService = new CitiesService();
//     });

//     afterEach(() => {
//         jest.clearAllMocks();
//     });

//     // it('should successfully read and parse the JSON file', async () => {
//     //     const cities = await citiesService.readJsonFile();
//     //     expect(cities).toEqual([
//     //         { name: 'City A', population: 1000000 },
//     //         { name: 'City B', population: 500000 },
//     //         { name: 'City C', population: 300000 },
//     //     ]);
//     // });

//     // it('should get the list of cities', async () => {
//     //     const cities = await citiesService.getCities();
//     //     expect(cities).toEqual([
//     //         { name: 'City A', population: 1000000 },
//     //         { name: 'City B', population: 500000 },
//     //         { name: 'City C', population: 300000 },
//     //     ]);
//     // });

//     // it('should throw an error when reading the JSON file fails', async () => {
//     //     const customError = new Error('Custom error message');
//     //     jest.spyOn(fs, 'readFile').mockImplementationOnce((_path, _options, callback) => {
//     //         callback(customError);
//     //     });

//     //     await expect(citiesService.readJsonFile()).rejects.toEqual(customError);
//     // });

//     it('should throw an object containing error information when getCities fails', async () => {
//         const spy = jest.spyOn(fs, 'readFile')
//             .mockImplementation((_, callback) => callback(null, Buffer.from('Sample')));

//         // Calling the function
//         citiesService.getCities()

//         expect(spy).toHaveBeenCalled();
//         // const customError = new Error('Custom error message');
//         // jest.spyOn(fs, 'readFile').mockImplementationOnce((_path, _options, callback) => {
//         //     callback(customError);
//         // });

//         // await expect(citiesService.getCities()).rejects.toEqual({
//         //     errors: customError,
//         //     message: 'An error occurred while fetching the cities data.',
//         // });
//     });
// });
