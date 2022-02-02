import { createContext } from "react";

type contextProp = {
    username: string;
    updateUsername: (newUsername: string) => void;
}

export const UsernameContext = createContext<contextProp>({ username: '', updateUsername: () => {} });