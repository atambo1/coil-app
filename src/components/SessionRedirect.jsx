import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSession } from "../context/SessionContext";

export default function SessionRedirect() {
  const { user, loading } = useSession();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && user && location.pathname === "/") {
      if (user.coil) {
        navigate(`/${user.coil}`);
      } else {
        navigate("/welcome");
      }
    }
  }, [user, loading, location.pathname, navigate]);

  return null;
}
