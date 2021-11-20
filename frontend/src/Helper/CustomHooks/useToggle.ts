import { useState } from "react";

/**
 * Custom hook which toggles between true and false.
 * Credit: WebDevSimplified
 * @param defaultValue Must initialize with boolean
 * @returns toggleable value, and the toggleValue function
 */
export default function useToggle(defaultValue: boolean) {
    const [value, setValue] = useState(defaultValue);

    function toggleValue(value: any) {
        setValue(currentValue =>
            typeof value === "boolean" ? value : !currentValue
        );
    }

    return { value, toggleValue };
}