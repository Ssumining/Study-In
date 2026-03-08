import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LocalStudy from './pages/LocalStudy';
import OnlineStudy from './pages/OnlineStudy';
import Router from "./routes/Router";
import Modal from '@/components/common/Modal';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/local" replace />} />
          <Route path="/local" element={<LocalStudy />} />
          <Route path="/online" element={<OnlineStudy />} />
        </Route>
      </Routes>
    </BrowserRouter>
    
      <Modal />
    </>
  );
}

export default App;