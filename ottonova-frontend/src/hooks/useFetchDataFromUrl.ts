
import React, { useCallback, useEffect } from 'react';
import { Cache } from '../utils/helper';

/**
 * Custom hook to fetch data from a specified URL.
 *
 * @param {Props} props - The hook props.
 * @param {string} props.url - The URL to fetch the data from.
 * @returns {Object} - An object containing the fetched data, loading state, and errors.
 */

interface Props {
    url: string;
    request: string;// request the name or request, we will cache data by name of request
}
interface ApiResponse<T> {
    data: T | undefined;
    isLoading: boolean;
    errors: string | null;
}
export default function useFetchDataFromUrl<T>({ url, request }: Props): ApiResponse<T> {
    // Create a single instance of the Cache class
    const cacheInstance = Cache.getInstance();
    // useCalback to memoize the fetchData function
    const fetchData = useCallback(async () => {
        try {
            // Check if data is catched to optimze requests
            const result = cacheInstance.getData(request);

            if (result) {
                console.log("getData from cache")
                setIsLoading(false);
                setData(result);
            } else {
                // if data is not exit on cache we will fetch new request
                const response = await fetch(url);
                if (response.ok) {
                    const responseData = await response.json();
                    console.log("getData from request")
                    //86400s  to store our date for one day
                    cacheInstance.setStorage(request, responseData, 86400)
                    setIsLoading(false);
                    setData(responseData);
                } else {
                    throw new Error('Request failed');
                }
            }

        } catch (error) {
            setIsLoading(false);
            setErrors('Oooups!!! Something went Wrong');
        }
    }, [url, request]);

    const [data, setData] = React.useState<T | undefined>(undefined);

    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [errors, setErrors] = React.useState<string | null>(null);

    // fetchData function will be called if url is updated and exist 
    useEffect(() => {
        if (url) {
            fetchData();
        }
    }, [url, fetchData, cacheInstance]);

    return {
        data, isLoading, errors
    };
}
