//
/**
 * Adds commas to a number to format.
 * If the input is not a valid number, the original string is returned unchanged.
 *
 * @param {string} numberString - The input number as a string. 10200200
 * @returns {string} The formatted number string with commas or the numberString if it's not a valid number. 
 * EXAMPLE:  10,200,200
 *  
 */

export function addCommasToNumberString(numberString: string) {
    const number = Number(numberString);
    if (isNaN(number)) {
        return numberString; // Return the numberString if it's not a valid number
    }
    return number.toLocaleString();
}