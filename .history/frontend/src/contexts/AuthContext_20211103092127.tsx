import React, { Props, useContext, useState } from 'react'
import {auth} from '../firebase'

const AuthContext = React.createContext<any>(null)

export function useAuth(){
    return useContext(AuthContext)
}
export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()

    function signup(email: string, password: string){
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
