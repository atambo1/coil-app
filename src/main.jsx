import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CoilRouter from "./coils/CoilRouter";
import HomePage from "./pages/HomePage.jsx";
import EnterPage from "./pages/Enter.jsx";
import AuthCallback from "./pages/AuthCallback.jsx";
import WelcomePage from "./pages/WelcomePage.jsx";
import { SessionProvider, useSession } from "./context/SessionContext";


const SessionRedirect = () => {
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
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SessionProvider> {/*  Provides access to session */}
      <Router>
        <SessionRedirect />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/walk" element={<HomePage />} />
          <Route path="/enter" element={<EnterPage />} />
          <Route path="/auth" element={<AuthCallback />} />
          <Route path="/:coilId/*" element={<CoilRouter />} />
          <Route path="/welcome" element={<WelcomePage />} />
        </Routes>
      </Router>
    </SessionProvider>
  </React.StrictMode>
);
