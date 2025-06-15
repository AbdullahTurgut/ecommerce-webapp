import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles = [], useOutlet = false }) => {
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRoles = useSelector((state) => state.auth.roles);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }

  // convert to lower case the roles
  const userRolesLower = userRoles.map((role) => role.toLowerCase());
  const allowedRolesLower = allowedRoles.map((role) => role.toLowerCase());

  const isAuthorized = userRolesLower.some((userRole) =>
    allowedRolesLower.includes(userRole)
  );

  if (isAuthorized) {
    return useOutlet ? <Outlet /> : children;
  } else {
    return <Navigate to={"/unauthorized"} state={{ from: location }} replace />;
  }
};

export default ProtectedRoute;
