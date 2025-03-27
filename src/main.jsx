import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EntryGate from "./pages/Enter";
import WalkPage from "./pages/Walk";
import HomePage from "./pages/HomePage";
import WalkQuestions from "../src/pages/WalkQuestions";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<EntryGate />} />
        <Route path="/walk" element={<WalkPage userEmail="atambo1@gmail.com" />} />
        <Route path="/walk/questions" element={<WalkQuestions />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
