import React, { useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const NavItem = ({ label, icon, path, active }) => (
  <Link to={path} className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all group ${active ? 'bg-white/10 text-white' : 'hover:bg-white/10'}`}>
    <span className={`${active ? 'text-white' : 'text-gray-400 group-hover:text-white'} transition-colors`}>
      {icon}
    </span>
    <span className={`text-sm font-medium ${active ? 'text-white' : 'text-gray-300 group-hover:text-white'} transition-colors`}>
      {label}
    </span>
    {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />}
  </Link>
);

const NavIcon = ({ path }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

export default function Sidenav() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('taskflow_user')) || {}; } catch { return {}; }
  }, []);

  const navItems = [
    {
      label: 'Dashboard',
      path: '/',
      icon: <NavIcon path="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z" />
    },
    {
      label: 'Projects',
      path: '/projects',
      icon: <NavIcon path="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-19.5 0A2.25 2.25 0 004.5 15h15a2.25 2.25 0 002.25-2.25m-19.5 0v.25A2.25 2.25 0 004.5 17.5h15a2.25 2.25 0 002.25-2.25v-.25m-19.5 1.75V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-1.25" />
    },
    {
      label: 'Team Members',
      path: '/team',
      icon: <NavIcon path="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] bg-gray-950 border-r border-white/5 flex flex-col justify-between py-8 px-6 text-white shadow-2xl z-40">
      <div>
        <div className="flex items-center gap-3 px-2 mb-10">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-600/20">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight">TaskFlow</h1>
        </div>

        <nav className="space-y-1">
          {navItems.map((item, idx) => (
            <NavItem key={idx} label={item.label} icon={item.icon} path={item.path} active={isActive(item.path)} />
          ))}
        </nav>
      </div>

      <div className="pt-6 border-t border-white/10">
        <Link to="/profile" className={`flex items-center gap-4 px-2 py-2 rounded-lg transition-colors cursor-pointer ${isActive('/profile') ? 'bg-white/10' : 'hover:bg-white/5'}`}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 p-0.5 shadow-md">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.fullName || 'User'}`}
              alt="Avatar"
              className="w-full h-full rounded-full bg-gray-900 border border-white/10"
            />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">{user.fullName || 'User'}</h3>
            <p className="text-xs text-gray-500 font-medium truncate max-w-[140px]">{user.email || 'Login to continue'}</p>
          </div>
        </Link>
        <button
          onClick={() => {
            localStorage.removeItem('taskflow_isLoggedIn');
            navigate('/login');
          }}
          className="mt-4 w-full flex items-center gap-3 px-4 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer border border-red-500/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
}
