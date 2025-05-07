import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import WalkPage from "../pages/Walk.jsx";
import WalkQuestions from "../pages/WalkQuestions.jsx";


export default function CoilRouter() {
  const { coilId } = useParams();

  return (
    <Routes>
      <Route index element={<HomePage coilId={coilId} />} />
      <Route path="walk" element={<WalkPage coilId={coilId} />} />
      <Route path="walk/questions" element={<WalkQuestions coilId={coilId} />} />
    </Routes>
  );
}
