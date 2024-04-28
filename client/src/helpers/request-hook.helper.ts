import { useEffect, useState } from "react";

type RequestFunction<T> = () => Promise<T | undefined>;

//  returns : isLoading state (boolean) and the data from our API call
export const useRequest = <T>(request: RequestFunction<T>): [boolean, T | undefined] => {
    const [data, setData] = useState<T | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Only fetch data if it hasn't been fetched yet
        if (!data) {
            const fetchData = async () => {
                setIsLoading(true);
                setData(undefined); // clear the data from any previous runs
                try {
                    const result = await request();
                    // Added a 4-second delay to see the spinner
                    // await new Promise(resolve => setTimeout(resolve, 4000)); 
                    setData(result); // store the new data
                } catch (error) {
                    console.error("Error fetching data : ", error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchData();
        }
    }, [request, data]); // Add data as a dependency
    return [isLoading, data];
};