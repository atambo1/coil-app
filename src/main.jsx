import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CoilRouter from "./coils/CoilRouter";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/:coilId/*" element={<CoilRouter />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
