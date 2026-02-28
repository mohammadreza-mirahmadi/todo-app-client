import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectHydrationStatus } from "../authSelectors";
import { useEffect } from "react";
import { getProfileThunk } from "../authThunks";
import { Navigate, Outlet, useLocation } from "react-router-dom";
// =================================================================================

function AuthGate({ children }) {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const hydrationStatus = useSelector(selectHydrationStatus);
  const location = useLocation();

  const publicPaths = ["/login", "/register"];
  const isPublicPath = publicPaths.includes(location.pathname);
  useEffect(() => {
    if (token && hydrationStatus === "idle") {
      dispatch(getProfileThunk());
    }
  }, [token, hydrationStatus, dispatch]);

  if (token && (hydrationStatus === "idle" || hydrationStatus === "loading")) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p>Restoring session ...</p>
      </div>
    );
  }

  if (token && hydrationStatus === "succeeded" && isPublicPath) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default AuthGate;
