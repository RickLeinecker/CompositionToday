import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute({isLogged}) {
    return isLogged ? <Outlet /> : <Navigate to="/registration" />;
}

export default PrivateRoute;