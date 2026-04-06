import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const StatCard = ({ label, value, icon, color, subtext }) => (
  <div className={`bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group`}>
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{subtext}</span>
    </div>
    <p className="text-4xl font-bold text-gray-900 tracking-tight group-hover:text-indigo-600 transition-colors">{value}</p>
    <p className="mt-1 text-sm font-medium text-gray-500">{label}</p>
  </div>
);

const priorityColor = { High: 'text-red-500 bg-red-50', Medium: 'text-yellow-600 bg-yellow-50', Low: 'text-green-600 bg-green-50' };
const statusColor = { 'Done': 'text-green-600 bg-green-50', 'In Progress': 'text-blue-600 bg-blue-50', 'To Do': 'text-gray-600 bg-gray-100' };

export default function Dashboard() {
  const navigate = useNavigate();
  const { projects, tasks, teamMembers } = useAppContext();

  const user = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('taskflow_user')) || {}; } catch { return {}; }
  }, []);

  const completedTasks = tasks.filter(t => t.status === 'Done').length;
  const pendingTasks = tasks.filter(t => t.status !== 'Done').length;
  const inProgressProjects = projects.filter(p => p.status === 'In Progress').length;

  const recentTasks = [...tasks]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Welcome back, {user.fullName?.split(' ')[0] || 'User'} 👋
        </h1>
        <p className="mt-2 text-gray-500 font-medium">
          Here's what's happening with your projects today.
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <StatCard
          label="Total Projects"
          value={projects.length}
          subtext="All time"
          color="bg-indigo-50"
          icon={
            <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
            </svg>
          }
        />
        <StatCard
          label="Tasks Completed"
          value={completedTasks}
          subtext="Finished"
          color="bg-green-50"
          icon={
            <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          label="Tasks Pending"
          value={pendingTasks}
          subtext="In queue"
          color="bg-amber-50"
          icon={
            <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          label="Team Members"
          value={teamMembers.length}
          subtext="Active"
          color="bg-purple-50"
          icon={
            <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Tasks */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Recent Tasks</h2>
            <button onClick={() => navigate('/projects')} className="text-xs font-semibold text-indigo-600 hover:underline">
              View All →
            </button>
          </div>
          {recentTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-gray-400">
              <p className="font-medium">No tasks yet.</p>
              <p className="text-sm mt-1">Create a project and add tasks to get started.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentTasks.map(task => {
                const project = projects.find(p => p.id === task.projectId);
                return (
                  <div key={task.id} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className={`flex-shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold ${priorityColor[task.priority] || 'text-gray-500 bg-gray-100'}`}>
                      {task.priority}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">{task.title}</p>
                      <p className="text-xs text-gray-400 truncate">{project?.name || 'Unknown Project'}</p>
                    </div>
                    <div className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold ${statusColor[task.status] || 'text-gray-600 bg-gray-100'}`}>
                      {task.status}
                    </div>
                    {task.assignedTo && (
                      <img src={task.assignedTo.avatar} alt={task.assignedTo.name} className="w-7 h-7 rounded-full border-2 border-white shadow-sm" />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Actions + Projects Summary */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/projects')}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-all hover:-translate-y-0.5 shadow-lg shadow-indigo-600/20"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Project
              </button>
              <button
                onClick={() => navigate('/team')}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-gray-50 text-gray-700 font-semibold text-sm hover:bg-gray-100 transition-all border border-gray-200"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                View Team
              </button>
            </div>
          </div>

          {/* Active Projects */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Projects</h2>
              <span className="text-xs font-semibold text-gray-400">{inProgressProjects} active</span>
            </div>
            <div className="space-y-3">
              {projects.slice(0, 4).map(project => {
                const projectTasks = tasks.filter(t => t.projectId === project.id);
                const done = projectTasks.filter(t => t.status === 'Done').length;
                const total = projectTasks.length;
                const progress = total > 0 ? Math.round((done / total) * 100) : 0;
                return (
                  <div key={project.id} className="cursor-pointer group" onClick={() => navigate(`/projects/${project.id}`)}>
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors truncate">{project.name}</p>
                      <span className="text-xs text-gray-400 ml-2 flex-shrink-0">{progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                );
              })}
              {projects.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">No projects yet. Create one!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
