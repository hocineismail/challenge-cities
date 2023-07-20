import fs from 'fs';
import path from 'path';

// Define the file path for the cities.json data file
const CITIES = path.join(__dirname, "../../data", "cities.json");

/**
 * CitiesService class that handles operations related to cities data.
 */
export class CitiesService {

  /**
   * Read the contents of the cities.json file and parse it as JSON.
   * @returns A Promise that resolves to the parsed JSON data.
   * @throws An error if there's any issue reading the file or parsing JSON.
   */
  private async readJsonFile(pathFile: string): Promise<any> {
    return new Promise<string>((resolve, reject) => {
      // Read the cities.json file using fs.readFile
      fs.readFile(pathFile, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    })
      .then((data: string) => JSON.parse(data)) // Parse the data as JSON
      .catch((error: Error) => {
        // If there's any error during reading or parsing, throw a custom error message
        throw new Error(`An error occurred while reading the JSON file: ${error.message}`);
      });
  }

  /**
   * Get the list of cities from the cities.json data file.
   * @returns A Promise that resolves to the list of cities.
   * @throws An object containing 'errors' and 'message' properties in case of an error.
   */
  async getCities(): Promise<any> {
    try {
      // Call the readJsonFile method to get the parsed JSON data
      return await this.readJsonFile(CITIES);
    } catch (error) {
      // If there's any error, throw an object with 'errors' and 'message' properties
      throw {
        errors: error,
        message: "An error occurred while fetching the cities data."
      };
    }
  }
}
