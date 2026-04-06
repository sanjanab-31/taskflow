import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import ProjectModal from '../components/ProjectModal';

const statusBadge = {
  'Not Started': 'bg-gray-100 text-gray-600',
  'In Progress': 'bg-blue-50 text-blue-600',
  'Completed': 'bg-green-50 text-green-600'
};

export default function Projects() {
  const navigate = useNavigate();
  const { projects, tasks, deleteProject } = useAppContext();
  const [view, setView] = useState('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const openCreate = () => { setEditingProject(null); setIsModalOpen(true); };
  const openEdit = (e, project) => { e.stopPropagation(); setEditingProject(project); setIsModalOpen(true); };
  const handleDelete = (e, id) => { e.stopPropagation(); setConfirmDelete(id); };

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Projects</h1>
          <p className="mt-1 text-gray-500 font-medium">Manage and track all your projects.</p>
        </div>
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex items-center bg-gray-100 rounded-xl p-1">
            <button onClick={() => setView('grid')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${view === 'grid' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            </button>
            <button onClick={() => setView('list')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${view === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>
          <button onClick={openCreate} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
            New Project
          </button>
        </div>
      </header>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-400">
          <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" /></svg>
          <p className="text-lg font-semibold text-gray-500">No projects yet</p>
          <p className="text-sm mt-1 mb-4">Create your first project to get started.</p>
          <button onClick={openCreate} className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-all">
            Create Project
          </button>
        </div>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map(project => {
            const projectTasks = tasks.filter(t => t.projectId === project.id);
            const done = projectTasks.filter(t => t.status === 'Done').length;
            const total = projectTasks.length;
            const progress = total > 0 ? Math.round((done / total) * 100) : 0;
            return (
              <div key={project.id} onClick={() => navigate(`/projects/${project.id}`)}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all p-6 cursor-pointer group">
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${statusBadge[project.status] || 'bg-gray-100 text-gray-600'}`}>{project.status}</span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={(e) => openEdit(e, project)} className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    </button>
                    <button onClick={(e) => handleDelete(e, project.id)} className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">{project.name}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{project.description}</p>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>{done}/{total} tasks</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  {project.deadline && (
                    <span className="text-xs text-gray-400 font-medium">📅 {new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  )}
                  <div className="flex -space-x-2">
                    {project.members?.slice(0, 3).map(m => (
                      <img key={m.id} src={m.avatar} alt={m.name} title={m.name} className="w-7 h-7 rounded-full border-2 border-white shadow-sm" />
                    ))}
                    {project.members?.length > 3 && <span className="w-7 h-7 rounded-full bg-gray-200 text-xs font-bold flex items-center justify-center text-gray-500 border-2 border-white">+{project.members.length - 3}</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {projects.map((project, idx) => {
            const projectTasks = tasks.filter(t => t.projectId === project.id);
            const done = projectTasks.filter(t => t.status === 'Done').length;
            const total = projectTasks.length;
            return (
              <div key={project.id} onClick={() => navigate(`/projects/${project.id}`)}
                className={`flex items-center gap-6 p-5 cursor-pointer hover:bg-gray-50 transition-colors ${idx !== 0 ? 'border-t border-gray-100' : ''}`}>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-gray-900 truncate hover:text-indigo-600 transition-colors">{project.name}</h3>
                  <p className="text-xs text-gray-400 truncate mt-0.5">{project.description}</p>
                </div>
                <span className={`flex-shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold ${statusBadge[project.status] || 'bg-gray-100 text-gray-600'}`}>{project.status}</span>
                <span className="text-xs text-gray-400 flex-shrink-0">{done}/{total} tasks</span>
                <div className="flex -space-x-2 flex-shrink-0">
                  {project.members?.slice(0, 3).map(m => (
                    <img key={m.id} src={m.avatar} alt={m.name} className="w-6 h-6 rounded-full border-2 border-white" />
                  ))}
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button onClick={(e) => openEdit(e, project)} className="w-7 h-7 rounded-lg hover:bg-gray-200 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  </button>
                  <button onClick={(e) => handleDelete(e, project.id)} className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirm Dialog */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setConfirmDelete(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-sm mx-4 animate-slideDown">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Project?</h3>
            <p className="text-sm text-gray-500 mb-6">This will permanently delete this project and all its tasks. This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setConfirmDelete(null)} className="px-4 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-50 rounded-xl transition-all">Cancel</button>
              <button onClick={() => { deleteProject(confirmDelete); setConfirmDelete(null); }} className="px-4 py-2 text-sm font-bold text-white bg-red-500 rounded-xl hover:bg-red-600 transition-all">Delete</button>
            </div>
          </div>
        </div>
      )}

      <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} project={editingProject} />
    </div>
  );
}
