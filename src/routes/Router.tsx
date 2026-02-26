import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import StudyDetail from "../pages/StudyDetail";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/study/:studyId" element={<StudyDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
