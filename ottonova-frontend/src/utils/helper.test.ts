import { DARK_THEME, LIGHT_THEME } from "../constants/theme";
import { addCommasToNumberString, Theme, Cache } from "./helper"



const themeSwitcher = new Theme

// type of mock localstorage
type LocalStorageMock = {
    getItem: (key: string) => string | null;
    setItem: (key: string, value: string) => void;
    removeItem: (key: string) => void;
    clear: () => void;
};

type Store = {
    [key: string]: string;
};
const localStorageMock = ((): LocalStorageMock => {
    let store: Store = {};

    return {
        getItem: function (key) {
            return store[key] || null;
        },
        setItem: function (key, value) {
            store[key] = value.toString();
        },
        removeItem: function (key) {
            delete store[key];
        },
        clear: function () {
            store = {};
        }
    };
})();


describe("Helper function", () => {

    test("Should return Number Format: 100,000", () => {
        const number: string = "100000"
        const result = addCommasToNumberString(number);
        expect(result).toEqual("100,000")
    })

    test("Should return Original input in case is not a number", () => {
        const number: string = "hello"
        const result = addCommasToNumberString(number);
        expect(result).toEqual("hello")
    })

})



describe('theme Storage', () => {

    beforeAll(() => {
        Object.defineProperty(window, 'localStorage', {
            value: localStorageMock
        });

    });

    beforeEach(() => {
        window.localStorage.clear()
    });

    test("Should switch light theme to dark one", () => {
        const currentTheme = themeSwitcher.getCurrentTheme();
        expect(currentTheme).toEqual(LIGHT_THEME);
        themeSwitcher.toggleTheme();
        const nextTheme = themeSwitcher.getCurrentTheme();
        expect(nextTheme).toEqual(DARK_THEME);
    });

    test("Should switch light theme to dark one", () => {
        window.localStorage.setItem('theme', LIGHT_THEME);
        const currentTheme = themeSwitcher.getCurrentTheme();
        expect(currentTheme).toEqual(LIGHT_THEME);
        themeSwitcher.toggleTheme();
        const nextTheme = themeSwitcher.getCurrentTheme();
        expect(nextTheme).toEqual(DARK_THEME);
    });

    test("should return light if there is no theme stored", () => {
        const currentTheme = themeSwitcher.getCurrentTheme();
        expect(currentTheme).toEqual(LIGHT_THEME);
    });


    test("should add theme into local storage", () => {
        window.localStorage.setItem('theme', DARK_THEME);
        const currentTheme = themeSwitcher.getCurrentTheme();
        expect(currentTheme).toEqual(DARK_THEME);
    });

});


describe("Cache", () => {
    let cache: Cache;

    beforeEach(() => {
        cache = Cache.getInstance(); // Create a new instance of the cache before each test

    });

    test('Should store data in the cache, and return it', () => {
        const key = 'name';
        const mockData = 'some_data';
        const expirationSeconds = 36000; // 1 hour from now
        cache.setStorage(key, mockData, expirationSeconds);
        const mockCache = {
            data: mockData, expiration:
                expirationSeconds > 0 ? Date.now() + expirationSeconds * 1000 : 0
        }
        const cachedData = cache.getStorage(key);
        expect(cachedData).toEqual(mockCache);
    });


    test('should return null when getting an expired item from the cache', () => {
        const key = 'expired_key';
        const value = 'expired_value';
        const pastExpirationSeconds = -2000;

        cache.setStorage(key, value, pastExpirationSeconds);
        const retrievedValue = cache.getStorage(key);
        expect(retrievedValue).toBeNull()
    });


})
