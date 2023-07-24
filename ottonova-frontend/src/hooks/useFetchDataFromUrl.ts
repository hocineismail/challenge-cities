
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
    const [data, setData] = React.useState<T | undefined>(undefined);

    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [errors, setErrors] = React.useState<string | null>(null);


    // useCalback to memoize the fetchData function
    const fetchData = useCallback(async () => {
        try {
            // Check if data is catched to optimze requests 
            const result = cacheInstance.getStorage(request);

            if (result) {
                //use stored data
                // that will reduce requests numbers
                const { data } = result
                setTimeout(() => {
                    setIsLoading(false);
                    setData(data);
                }, 1000);
            } else {

                // if data is not exist on the cache we will send new request to get data and store it on the cache
                // the cache has an expiration time
                const response = await fetch(url);
                if (response.ok) {
                    const responseData = await response.json();
                    //86400s  to store our date for one day
                    cacheInstance.setStorage(request, responseData, 10000)

                    setTimeout(() => {
                        setIsLoading(false);
                        setData(responseData);
                    }, 1000);
                } else {
                    throw new Error('Request failed');
                }
            }

        } catch (error) {
            setTimeout(() => {
                setIsLoading(false);
                setErrors('Oooups!!! Something went Wrong');
            }, 1000);
        }
    }, [url, request]);

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
