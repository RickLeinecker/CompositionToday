import React, {useContext, useEffect, useState } from 'react'
import {auth} from '../firebase'
import firebase from "firebase/app"

const AuthContext = React.createContext<any>(null)

export function useAuth(){
    return useContext(AuthContext)
}

export const AuthProvider: React.FC = ({children}) => {
    const [currentUser, setCurrentUser] = useState<firebase.User | null>()

    function signup(email: string, password: string){
        auth.createUserWithEmailAndPassword(email, password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })

        return unsubscribe
    },[])

    const value = {
        currentUser,
        signup
    }
    return (
        <AuthContext.Provider>
            {children}
        </AuthContext.Provider>
    )
}
