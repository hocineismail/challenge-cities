import { DARK_THEME, LIGHT_THEME } from "../constants/theme";

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
    return number.toLocaleString('en-US');
}


/**
 * setThemeStorage store the current theme
 * @param {string} theme - string example: DARK | LIGHT
 *
 */

export function setThemeStorage(theme: string): void {
    window.localStorage.setItem("theme", theme);
}

//Storage class enables to manuplite storage
export class Storage {
    public setItem(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    public getItem(key: string): string | null {
        return localStorage.getItem(key);
    }

    public removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    public clear(): void {
        localStorage.clear();
    }
}
//Theme is a class enables to get the current theme or swotch to the next theme
export class Theme extends Storage {

    public getCurrentTheme(): string {
        const currentTheme = localStorage.getItem('theme')
        if (currentTheme) {
            return currentTheme
        } else {
            //the first time visit the website we need to add the default light theme
            this.setItem("theme", LIGHT_THEME)
            return LIGHT_THEME
        }

    }

    public toggleTheme(): void {
        const theme = this.getCurrentTheme() === DARK_THEME ? LIGHT_THEME : DARK_THEME
        this.setItem("theme", theme);
    }
}
//Cache is a class enables to store fetched data to reduce requests cost
export class Cache extends Storage {
    private static instance: Cache | null = null;

    private constructor() {
        super();
    }

    public static getInstance(): Cache {
        if (!Cache.instance) {
            Cache.instance = new Cache();
        }
        return Cache.instance;
    }

    private getCacheKey(key: string): string {
        return `cache_${key}`;
    }

    public setStorage(key: string, value: unknown, expirationSeconds = 0) {
        const expiration =
            expirationSeconds > 0 ? Date.now() + expirationSeconds * 1000 : 0;
        const cacheKey = this.getCacheKey(key);
        const cachedItem = { data: value, expiration };

        window.localStorage.setItem(cacheKey, JSON.stringify(cachedItem));

    }

    public getStorage(key: string) {
        const cacheKey = this.getCacheKey(key);

        const cachedItemString = window.localStorage.getItem(cacheKey);


        if (cachedItemString) {
            const cachedItem = JSON.parse(cachedItemString);
            if (cachedItem.expiration && cachedItem.expiration >= Date.now()) {
                return cachedItem;
            } else {
                // Remove expired data from the cache
                window.localStorage.removeItem(cacheKey);
                return null;
            }
        }
        return null;
    }

    public clearStorage() {
        for (let i = 0; i < window.localStorage.length; i++) {
            const key = window.localStorage.key(i);
            if (key && key.startsWith("cache_")) {
                window.localStorage.removeItem(key);
            }
        }
    }

    public isExpired(key: string) {

        const cachedItemString = this.getStorage(key);

        if (cachedItemString) {
            const cachedItem = JSON.parse(cachedItemString);
            return cachedItem.expiration > 0 && cachedItem.expiration < Date.now();
        }
        return true;
    }


}

