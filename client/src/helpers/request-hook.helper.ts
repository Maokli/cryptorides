import { useEffect, useState } from "react";

// Define a type constraint for the request function
type RequestFunction<T> = () => Promise<{ data: T }>;

//  returns : isLoading state (boolean) and the data from our API call
export const useRequest = <T>(request: RequestFunction<T>): [boolean, T | undefined] => {
    const [data, setData] = useState<T | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setData(undefined); // clear the data from any previous runs
            try {
                const result = await request();
                setData(result.data); // store the new data
            } catch (error) {
                console.error("Error fetching data : ", error);
            }

            setIsLoading(false); // clear the loading state
        };

        void fetchData();
    }, [request]);

    return [isLoading, data];
}