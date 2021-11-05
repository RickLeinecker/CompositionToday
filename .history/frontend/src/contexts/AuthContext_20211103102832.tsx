import React, {useContext, useEffect, useState } from 'react'
import {auth} from '../firebase'
import { createUserWithEmailAndPassword } from '@firebase/auth'

const AuthContext = React.createContext<any>(null)

export function useAuth(){
    return useContext(AuthContext)
}

export const AuthProvider: React.FC = ({children}) => {
    const [currentUser, setCurrentUser] = useState()

    function signup(email: string, password: string){
        // createUserWithEmailAndPassword(auth, email, password)
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
        <AuthContext.Provider value={currentUser}>
            {children}
        </AuthContext.Provider>
    )
}
