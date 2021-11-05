import React, { Component } from 'react'
import {useAuth} from "../contexts/AuthContext"
import {Route, Redirect} from 'react-router-dom'

export default function PrivateRoute({component: Component, ...rest}) {
    
    const {currentUser} = useAuth()

    return (
        <Route>
            {...rest}
            render={props => {
                currentUser ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login"></Redirect>
                )
            }}  
        </Route>
    )
}
