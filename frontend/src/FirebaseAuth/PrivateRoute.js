import React from 'react'
import { useAuth } from "./AuthContext"
import { Route, Redirect } from 'react-router-dom'

/**
 * PrivateRoute ensures user is logged in. When in use
 * must include component prop. If using props in that
 * component, ensure you are passing an object through
 * it. Ex. props = {{property= "value", ...}}
 * @param component JSX page component to render after routing there
 * @param props [Optional] props to pass to the component
 * @returns Rendering of the JSX.Element
 */
export default function PrivateRoute({ component: Component, props: myProps = {}, ...rest }) {

    const { currentUser } = useAuth()
    return (
        <Route {...rest} render={props => {
            console.log(myProps)
            return currentUser ? (
                <Component {...{...myProps, ...props}} />
            ) : (
                <Redirect to="/login"></Redirect>
            )
        }} />
    )
}
