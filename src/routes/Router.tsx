import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Home from "../pages/Home";
import StudyDetail from "../pages/StudyDetail";
import Profile from "../pages/Profile"; // 프로필 페이지 추가

export default function Router() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/study/:studyId" element={<StudyDetail />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
