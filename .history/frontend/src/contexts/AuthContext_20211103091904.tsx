import React, { useContext, useState } from 'react'
import {auth} from '../firebase'

interface AppContextInterface {
    name: string;
    author: string;
    url: string;
  }
  
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
