import { addCommasToNumberString, setThemeStorage } from "./helper"

describe("Helper function", () => {
    it("Should return Number Format: 100,000", () => {
        const number: string = "100000"
        const result = addCommasToNumberString(number);
        expect(result).toEqual("100,000")
    })
    it("Should return Original input in case is not a number", () => {
        const number: string = "hello"
        const result = addCommasToNumberString(number);
        expect(result).toEqual("hello")
    })

})
describe('setThemeStorage', () => {
    beforeEach(() => {
        window.localStorage.clear();
    });
    it("should add theme into local storage", () => {
        const item = "theme";
        const theme = "DARK"
        setThemeStorage(theme);
        expect(localStorage.getItem(item)).toEqual(theme);
    });
    it("should return null if there is no theme stored", () => {
        const item = "theme";


        expect(localStorage.getItem(item)).toBeNull();
    });

});