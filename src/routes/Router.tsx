import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import StudyDetail from "../pages/StudyDetail";
import Profile from "../pages/Profile"; // 프로필 페이지 추가
import ProfileEdit from "../pages/ProfileEdit";
import Layout from '@/components/layout/Layout';
import AuthLayout from '@/components/layout/AuthLayout';
import Login from '@/pages/Login'; 

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* 공통 레이아웃 (헤더 + 푸터) */}
        <Route element={<Layout />}>
          {/* 메인화면 + 스터디 상세화면 */}
          <Route path="/" element={<Home />} />
          <Route path="/study/:studyId" element={<StudyDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<ProfileEdit />} /> 
        </Route>
        
        {/* 인증 레이아웃 (심플한 헤더) */}
        <Route element={<AuthLayout />}>
          {/* 로그인 */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<div>회원가입 화면 준비 중...</div>} />
          <Route path="/forgot-password" element={<div>비밀번호 찾기 화면 준비 중...</div>} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}