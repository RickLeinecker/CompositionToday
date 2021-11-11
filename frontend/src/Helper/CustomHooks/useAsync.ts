import { useCallback, useEffect, useState } from "react";

/**
 * Custom hook for many handling async functions.
 * Credit: WebDevSimplified
 * @param callback 
 * @param dependencies 
 * @returns 
 */
export default function useAsync(callback: any, dependencies = []) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [value, setValue] = useState();

    const callbackMemoized = useCallback(() => {
        setLoading(true);
        setError(undefined);
        setValue(undefined);
        callback()
            .then(setValue)
            .catch(setError)
            .finally(() => setLoading(false));
    }, dependencies);

    useEffect(() => {
        callbackMemoized()
    }, [callbackMemoized]);

    return { loading, error, value };
}