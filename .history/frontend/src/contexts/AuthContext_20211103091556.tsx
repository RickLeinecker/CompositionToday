import React from 'react'
import {auth} from '../firebase'

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}
export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()

    function signup(email, password){
        auth.createUserWithEmailAndPassword(email, password)
    }

    const value = {
        currentUser
    }
    return (
        <AuthContext.Provider>
            {children}
        </AuthContext.Provider>
    )
}
