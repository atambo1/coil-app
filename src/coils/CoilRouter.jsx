import React, { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import HomePage from "../pages/oldHomePage.jsx";
import WalkPage from "../pages/Walk.jsx";
import WalkQuestions from "../pages/WalkQuestions.jsx";
import InvalidCoilPage from "../pages/InvalidCoilPage.jsx";
import axios from "axios";

export default function CoilRouter() {
  const { coilId } = useParams();
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    axios.get(`/api/coil/${coilId}/exists`)
      .then((res) => setIsValid(res.data.exists))
      .catch(() => setIsValid(false));
  }, [coilId]);

  if (isValid === null) return <div>Loading...</div>;
  if (!isValid) return <InvalidCoilPage coilId={coilId} />;

  return (
    <Routes>
      <Route index element={<HomePage coilId={coilId} />} />
      <Route path="walk" element={<WalkPage coilId={coilId} />} />
      <Route path="walk/questions" element={<WalkQuestions coilId={coilId} />} />
    </Routes>
  );
}
