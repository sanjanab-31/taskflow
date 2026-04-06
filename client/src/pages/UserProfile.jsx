import React, { useMemo } from 'react';
import { useAppContext } from '../context/AppContext';

export default function UserProfile() {
  const { projects, tasks } = useAppContext();

  const user = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('taskflow_user')) || {}; } catch { return {}; }
  }, []);

  const assignedTasks = tasks.filter(t => t.assignedTo?.name === user.fullName);
  const completedTasks = assignedTasks.filter(t => t.status === 'Done').length;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
          <div className="absolute -bottom-12 left-8">
            <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-lg">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.fullName || 'User'}`}
                alt="Avatar"
                className="w-full h-full rounded-xl bg-gray-50"
              />
            </div>
          </div>
        </div>

        <div className="pt-16 px-8 pb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{user.fullName || 'User'}</h1>
              <p className="text-sm text-gray-500 font-medium mt-0.5">{user.email || 'No email set'}</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-600 uppercase tracking-wider">Admin</span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
              <p className="text-xs text-gray-500 font-medium mt-0.5">Projects</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{assignedTasks.length}</p>
              <p className="text-xs text-gray-500 font-medium mt-0.5">Tasks</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{completedTasks}</p>
              <p className="text-xs text-gray-500 font-medium mt-0.5">Completed</p>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-gray-600 font-medium">{user.email || 'Not set'}</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-sm text-gray-600 font-medium">{user.fullName || 'Not set'}</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm text-gray-600 font-medium">Role: Admin</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
