import React from 'react'


/**
 * Custom hook to fetch data from a specified URL.
 *
 * @param {Props} props - The hook props.
 * @param {string} props.url - The URL to fetch the data from.
 * @returns {Object} - An object containing the fetched data, loading state, and errors.
 */

interface Props {
    url: string
}

export default function useFetchDataFromUrl({ url }: Props) {
    const [data, setData] = React.useState<any>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [errors, setErrors] = React.useState<string | null>(null);
    React.useEffect(() => {
        if (url) {
            (async () => {
                try {
                    const response = await fetch(url);
                    if (response.ok) {
                        const responseData = await response.json();
                        setIsLoading(false);
                        setData(responseData);
                    } else {
                        throw new Error('Request failed');
                    }
                } catch (error) {
                    setIsLoading(false);
                    setErrors('Oooups!!! Something went Wrong');
                }
            })();
        }
    }, [url]);

    return {
        data, isLoading, errors
    }
}