import { useState } from "react";

export default function useArray(defaultValue: any) {
    const [array, setArray] = useState(defaultValue);

    function push(element: any) {
        setArray((a: any) => [...a, element]);
    }

    function filter(callback: any) {
        setArray((a: any) => a.filter(callback));
    }

    function update(index: number, newElement: any) {
        setArray((a: any) => [
            ...a.slice(0, index),
            newElement,
            ...a.slice(index + 1, a.length),
        ]);
    }

    function remove(index: number) {
        setArray((a: any) => [...a.slice(0, index), ...a.slice(index + 1, a.length)]);
    }

    function clear() {
        setArray([]);
    }

    return { array, set: setArray, push, filter, update, remove, clear };
}