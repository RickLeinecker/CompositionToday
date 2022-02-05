import { createContext } from "react";

type contextProp = {
    isMyProfile: boolean;
}

export const ProfileContext = createContext<contextProp>({
    isMyProfile: false,
});