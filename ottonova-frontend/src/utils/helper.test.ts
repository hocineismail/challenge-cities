import { DARK_THEME, LIGHT_THEME } from "../constants/theme";
import { addCommasToNumberString, Theme, Cache } from "./helper"


const storage = Cache.getInstance();
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
    beforeAll(() => {
        Object.defineProperty(window, 'localStorage', {
            value: localStorageMock
        });
        storage.clearStorage()
    });

    test("Should store data in the cache, and return it", () => {
        const mockData = 0
        storage.setStorage("name", mockData, 0);
        const cachedData = storage.getStorage("name");
        expect(cachedData).toEqual(mockData)
    })

})

// const mockLocalStorage = {
//     getItem: jest.fn(),
//     setItem: jest.fn(),
//     removeItem: jest.fn(),
//     clear: jest.fn(),
// };


describe('Cache', () => {
    let cache: Cache;

    beforeEach(() => {
        cache = Cache.getInstance();
        Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    });

    it('Should store data in the cache, and return it', () => {
        const key = 'name';
        const mockData = 'some_data';
        const expirationSeconds = 3600; // 1 hour from now

        cache.setStorage(key, mockData, expirationSeconds);
        const cachedData = cache.getStorage(key);
        expect(cachedData).toEqual(mockData);
    });


    it('should set and get an item in the cache', () => {
        const key = 'test_key';
        const value = 'test_value';
        const expirationSeconds = 3600; // 1 hour from now
        cache.setStorage(key, value, expirationSeconds);

        const retrievedValue = cache.getStorage(key);
        expect(retrievedValue).toBe(value);

    });


    it('should return null when getting an expired item from the cache', () => {
        const key = 'expired_key';
        const value = 'expired_value';
        const pastExpirationSeconds = -3600; // 1 hour ago
        cache.setStorage(key, value, pastExpirationSeconds);

        const retrievedValue = cache.getStorage(key);
        console.log(retrievedValue)

        expect(localStorageMock.getItem).toHaveBeenCalledWith(`cache_${key}`);
        expect(localStorageMock.removeItem).toHaveBeenCalledWith(`cache_${key}`);
    });


    // it('should remove items with cache_ prefix on clearStorage', () => {

    //     mockLocalStorage.setItem('cache_item1', 'value1');
    //     mockLocalStorage.setItem('cache_item2', 'value2');
    //     // Add a non-cache item to localStorage
    //     mockLocalStorage.setItem('non_cache_item', 'value3');

    //     cache.clearStorage();

    //     expect(mockLocalStorage.removeItem).toHaveBeenCalledTimes(2);
    //     expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('cache_item1');
    //     expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('cache_item2');
    // });


    // it('should check if an item is expired', () => {
    //     const key = 'test_key';
    //     const value = 'test_value';
    //     const futureExpirationSeconds = 3600; // 1 hour from now
    //     cache.setStorage(key, value, futureExpirationSeconds);

    //     // Not expired yet
    //     expect(cache.isExpired(key)).toBe(false);

    //     // Expired
    //     const expiredKey = 'expired_key';
    //     const expiredValue = 'expired_value';
    //     const pastExpirationSeconds = -3600; // 1 hour ago
    //     cache.setStorage(expiredKey, expiredValue, pastExpirationSeconds);
    //     expect(cache.isExpired(expiredKey)).toBe(true);
    // });

});