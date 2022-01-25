import React, {useContext, useEffect, useState } from 'react'
import {auth} from './firebase'
import { useNavigate } from 'react-router-dom';

import {
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut, 
    sendPasswordResetEmail,
    updateProfile
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

    useState(() => {
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

    const signUpUser = (email, password, name) => {
        setLoading(true);
        // also logs them in
        createUserWithEmailAndPassword(auth, email, password)
        .then((res) => console.log(res))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));

        signOut(auth)
    }

    const signInUser = (email, password) => {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
        .then((res) => console.log(res))
        .catch((err) => setError(err.code))
        .finally(() => setLoading(false));
        navigate('/');
    }

    const logoutUser = () => {
        signOut(auth)
        navigate('/registration');
    }

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
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
        logoutUser,
        resetPassword
    }

    return (
        <AuthContext.Provider value={value}> {!loading && children} </AuthContext.Provider>
    )
}
