import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CoilRouter from "./coils/CoilRouter";
import HomePage from "./pages/HomePage.jsx";
import EnterPage from "./pages/Enter.jsx";
import AuthCallback from "./pages/AuthCallback.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/walk" element={<HomePage />} />
        <Route path="/enter" element={<EnterPage />} />
        <Route path="/auth" element={<AuthCallback />} />
        <Route path="/:coilId/*" element={<CoilRouter />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
