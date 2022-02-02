import { createContext } from "react";

type contextProp = {
    stopAllPlayers: boolean;
    setStopAllPlayers: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}

export const PlayerContext = createContext<contextProp>({
    stopAllPlayers: false,
    setStopAllPlayers: undefined
});