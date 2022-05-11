import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute({isLogged}) {
    return isLogged ? <Outlet /> : <Navigate to="/landing-page" />;
}

export default PrivateRoute;