
/**
 * Adds commas to a number to format.
 * If the input is not a valid number, the original string is returned unchanged.
 *
 * @param {string} numberString - The input number as a string. 10200200
 * @returns {string} The formatted number string with commas or the numberString if it's not a valid number. 
 * EXAMPLE:  10,200,200
 *  
 */

export function addCommasToNumberString(numberString: string): string {
    const number = Number(numberString);
    if (isNaN(number)) {
        return numberString; // Return the numberString if it's not a valid number
    }
    return number.toLocaleString();
}
/**
 * setThemeStorage store the current theme
 * @param {string} theme - string example: DARK | LIGHT
 *  
 */
export function setThemeStorage(theme: string): void {
    window.localStorage.setItem("theme", theme)
}
// class Storage {
//     #cache: string = ""
//     public setStorage(key: string, value: string) {
//         window.localStorage.setItem(key, value)
//     }
//     public getStorage(key: string,) {
//         window.localStorage.getItem(key)
//     }
//     public clearStorage() {
//         window.localStorage.clear()
//     }
// }
// class Cache extends Storage {
//     private getCacheKey(key: string): string {
//         return `cache_${key}`;
//     }

//     public setStorage(key: string, value: string, expirationSeconds: number = 0) {
//         const expiration = expirationSeconds > 0 ? Date.now() + expirationSeconds * 1000 : 0;
//         const cacheKey = this.getCacheKey(key);
//         const cachedItem = { data: value, expiration };
//         window.localStorage.setItem(cacheKey, JSON.stringify(cachedItem));
//     }

//     public getStorage(key: string) {
//         const cacheKey = this.getCacheKey(key);
//         const cachedItemString = window.localStorage.getItem(cacheKey);
//         if (cachedItemString) {
//             const cachedItem = JSON.parse(cachedItemString);
//             if (!cachedItem.expiration || cachedItem.expiration >= Date.now()) {
//                 return cachedItem.data;
//             } else {
//                 // Remove expired data from the cache
//                 window.localStorage.removeItem(cacheKey);
//             }
//         }
//         return null;
//     }

//     public clearStorage() {
//         for (let i = 0; i < window.localStorage.length; i++) {
//             const key = window.localStorage.key(i);
//             if (key && key.startsWith("cache_")) {
//                 window.localStorage.removeItem(key);
//             }
//         }
//     }

//     public isExpired(key: string) {
//         const cacheKey = this.getCacheKey(key);
//         const cachedItemString = window.localStorage.getItem(cacheKey);
//         if (cachedItemString) {
//             const cachedItem = JSON.parse(cachedItemString);
//             return cachedItem.expiration > 0 && cachedItem.expiration < Date.now();
//         }
//         return true;
//     }

//     public getData(key: string, expirationSeconds: number = 0) {
//         if (!this.isExpired(key)) {
//             return this.getStorage(key);
//         } else {
//             // Fetch data and store it in the cache
//             const newData = "fetch data"; // Replace this with your data fetching logic
//             this.setStorage(key, newData, expirationSeconds);
//             return newData;
//         }
//     }
// }


// // Step 1: Create an instance of the Cache class
// const cache = new Cache();

// // Step 2: Store data in the cache using the setStorage method
// cache.setStorage("example_key", "Hello, this is cached data!", 60); // The data will expire in 60 seconds

// // Step 3: Retrieve data from the cache using the getData method
// const cachedData = cache.getData("example_key");
// if (cachedData) {
//     console.log("Data from cache:", cachedData);
// } else {
//     console.log("Data not available in cache, fetching data...");
//     // Replace the following line with your data fetching logic
//     const fetchedData = "Data fetched from the server!";
//     cache.setStorage("example_key", fetchedData, 60); // Store the fetched data in the cache with a 60-second expiration
//     console.log("Fetched data:", fetchedData);
// }

// Step 4: Clear the entire cache (if needed)
// cache.clearStorage();