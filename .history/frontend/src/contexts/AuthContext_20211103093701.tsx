import React, {useContext, useEffect, useState } from 'react'
import {auth} from '../firebase'

const AuthContext = React.createContext<any>(null)

export function useAuth(){
    return useContext(AuthContext)
}

export const AuthProvider: React.FC = ({children}) => {
    const [currentUser, setCurrentUser] = useState()

    function signup(email: string, password: string){
        auth.createUserWithEmailAndPassword(email, password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user: any) => {
            setCurrentUser(user)
        })

        return unsubscribe
    },[])

    const value = {
        currentUser,
        signup
    }
    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    )
}
