import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Sidenav from './components/Sidenav';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Team from './pages/Team';
import UserProfile from './pages/UserProfile';
import Signup from './pages/Signup';
import Login from './pages/Login';

function AppContent() {
  const location = useLocation();
  const hideSidebarRoutes = ['/signup', '/login'];
  const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {!shouldHideSidebar && <Sidenav />}

      <main className={`flex-1 p-10 ${!shouldHideSidebar ? 'ml-[260px]' : ''}`}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/team" element={<Team />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
