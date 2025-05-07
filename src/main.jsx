import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CoilRouter from "./coils/CoilRouter";
import HomePage from "./pages/HomePage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Serve HomePage at / or /walk */}
        <Route path="/" element={<HomePage />} />
        <Route path="/walk" element={<HomePage />} />

        {/* Route into coil-based structure */}
        <Route path="/:coilId/*" element={<CoilRouter />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
