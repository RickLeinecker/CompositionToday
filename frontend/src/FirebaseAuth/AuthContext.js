import React, {useContext, useEffect, useState } from 'react'
import {auth} from './firebase'
import { useNavigate } from 'react-router-dom';
import SignUpAuth from './SignUpAuth'
import SignInUserAuth from './SignInUserAuth'
import SignInGuestAuth from './SignInGuestAuth'
import ResetPasswordAuth from './ResetPasswordAuth';
import {
    onAuthStateChanged,
    signOut,
} from 'firebase/auth'

const AuthContext = React.createContext();

export const useAuthContext = () =>{
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) =>{
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const unsubscribe = onAuthStateChanged(auth, (res) => {
          if (res) {
            setCurrentUser(res);
          } else {
            setCurrentUser(null);
          }
          setError("");
          setLoading(false);
        });
        return unsubscribe;
      }, []);
    
    const signUpUser = async (email, password) => {
        return SignUpAuth(email, password);
    }

    const signInUser = (email, password) => {
        return SignInUserAuth(email, password);
    }

    const signInGuest = () =>
    {
        return SignInGuestAuth(auth)
    }

    const logoutUser = () => {
        signOut(auth);
        setCurrentUser(null);
        navigate('/landing-page');
    }

    const resetPassword = (email, actionCodeSettings) => {
        return ResetPasswordAuth(email, actionCodeSettings);
      };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    },[])

    const value = {
        currentUser,
        loading,
        error,
        signUpUser, 
        signInUser,
        signInGuest,
        logoutUser,
        resetPassword
    }

    return (
        <AuthContext.Provider value={value}> {!loading && children} </AuthContext.Provider>
    )
}
