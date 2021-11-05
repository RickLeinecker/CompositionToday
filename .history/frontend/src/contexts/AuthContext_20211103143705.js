import React, {useContext, useEffect, useState } from 'react'
import {auth} from '../firebase'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password){
        createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password){
        signInWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    },[])

    const value = {
        currentUser,
        // login, 
        signup,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
