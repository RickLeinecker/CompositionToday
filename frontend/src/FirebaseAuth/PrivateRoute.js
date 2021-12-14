import React from 'react'
import { useAuth } from "./AuthContext"
import { Route, Redirect } from 'react-router-dom'

export default function PrivateRoute({ component: Component, props: myProps = "", ...rest }) {

    const { currentUser } = useAuth()
    return (
        <Route {...rest} render={props => {
            console.log(myProps)
            return currentUser ? (
                <Component myProps={myProps} {...props} />
            ) : (
                <Redirect to="/login"></Redirect>
            )
        }} />
    )
}
