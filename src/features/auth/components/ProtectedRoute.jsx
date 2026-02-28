import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import {
  selectIsAuthenticated,
  selectHydrationStatus,
  selectToken,
} from "../authSelectors";
// =================================================================================

function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const hydrationStatus = useSelector(selectHydrationStatus);
  const token = useSelector(selectToken);

  if (token && (hydrationStatus === "idle" || hydrationStatus === "loading"))
    return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children ?? <Outlet />;
}

export default ProtectedRoute;
