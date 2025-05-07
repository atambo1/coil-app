import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import HomePage from "../HomePage";
import WalkPage from "../Walk";
import WalkQuestions from "../WalkQuestions";

export default function CoilRouter() {
  const { coilId } = useParams();

  return (
    <Routes>
      <Route path="/" element={<HomePage coilId={coilId} />} />
      <Route path="walk" element={<WalkPage coilId={coilId} />} />
      <Route path="walk/questions" element={<WalkQuestions coilId={coilId} />} />
    </Routes>
  );
}
