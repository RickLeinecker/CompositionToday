import useAsync from "./useAsync";

const DEFAULT_OPTIONS = {
    headers: { "Content-Type": "application/json" },
};

/**
 * Custom hook for handling fetch requests. NOTE that this will
 * handle json types.
 * Credit: WebDevSimplified
 * @param url string of the location of resource
 * @param options option types when sending request
 * @param dependencies if a part of the url is variable, specify it in a
 *                     dependency array so useFetch() will know when to take effect.
 * @returns { loading, error, value }
 */
export default function useFetch(url: string, options = {}, dependencies = []) {
    return useAsync(() => {
        return fetch(url, { ...DEFAULT_OPTIONS, ...options }).then(res => {
            if (res.ok) return res.json()
            return res.json().then(json => Promise.reject(json))
        })
    }, dependencies);
}