import React, { useContext } from 'react'
import { CurrentUser } from './ObjectInterface'


export type UserContextType = {
    currentUser: CurrentUser;
    setCurrentUser: (currentUser: CurrentUser) => void;
}

export const UserContext = React.createContext<UserContextType>({
    currentUser: {
        email: "",
        uid: "",
    },
    setCurrentUser: user => console.warn("no user provider"),
});

export const useUser = () => useContext(UserContext)

// export default function UserProvider() {
//     return (
//         <div>
            
//         </div>
//     )
// }
