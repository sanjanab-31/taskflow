import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import TaskModal from '../components/TaskModal';

const priorityBadge = { High: 'bg-red-50 text-red-500', Medium: 'bg-yellow-50 text-yellow-600', Low: 'bg-green-50 text-green-600' };
const columnColors = {
  'To Do': { bg: 'bg-gray-50', border: 'border-gray-200', dot: 'bg-gray-400' },
  'In Progress': { bg: 'bg-blue-50/50', border: 'border-blue-200', dot: 'bg-blue-500' },
  'Done': { bg: 'bg-green-50/50', border: 'border-green-200', dot: 'bg-green-500' },
};

export default function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { projects, tasks, updateTask, deleteTask } = useAppContext();

  const project = projects.find(p => p.id === projectId);
  const projectTasks = tasks.filter(t => t.projectId === projectId);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [newTaskStatus, setNewTaskStatus] = useState('To Do');
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center py-24">
        <p className="text-lg font-semibold text-gray-500 mb-4">Project not found</p>
        <button onClick={() => navigate('/projects')} className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-all">
          Back to Projects
        </button>
      </div>
    );
  }

  const columns = ['To Do', 'In Progress', 'Done'];

  const openCreate = (status) => {
    setEditingTask(null);
    setNewTaskStatus(status);
    setIsTaskModalOpen(true);
  };

  const openEdit = (task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  // Drag handlers
  const onDragStart = (e, taskId) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = 'move';
  };
  const onDragOver = (e, column) => {
    e.preventDefault();
    setDragOverColumn(column);
  };
  const onDragLeave = () => setDragOverColumn(null);
  const onDrop = (e, column) => {
    e.preventDefault();
    if (draggedTaskId) {
      updateTask(draggedTaskId, { status: column });
    }
    setDraggedTaskId(null);
    setDragOverColumn(null);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-8">
        <button onClick={() => navigate('/projects')} className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 font-medium mb-3 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back to Projects
        </button>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{project.name}</h1>
            <p className="mt-1 text-gray-500 font-medium">{project.description}</p>
            <div className="flex items-center gap-4 mt-3">
              {project.deadline && (
                <span className="text-xs text-gray-400 font-medium">📅 {new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              )}
              <div className="flex -space-x-2">
                {project.members?.slice(0, 5).map(m => (
                  <img key={m.id} src={m.avatar} alt={m.name} title={m.name} className="w-7 h-7 rounded-full border-2 border-white shadow-sm" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map(column => {
          const colTasks = projectTasks.filter(t => t.status === column);
          const colors = columnColors[column];
          const isDragOver = dragOverColumn === column;
          return (
            <div
              key={column}
              onDragOver={(e) => onDragOver(e, column)}
              onDragLeave={onDragLeave}
              onDrop={(e) => onDrop(e, column)}
              className={`rounded-2xl border-2 transition-all ${isDragOver ? `${colors.border} border-dashed scale-[1.01] shadow-lg` : 'border-transparent'} ${colors.bg} p-4 min-h-[300px]`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${colors.dot}`} />
                  <h3 className="text-sm font-bold text-gray-700">{column}</h3>
                  <span className="text-xs font-semibold text-gray-400 bg-white rounded-full w-5 h-5 flex items-center justify-center">{colTasks.length}</span>
                </div>
                <button onClick={() => openCreate(column)} className="w-6 h-6 rounded-lg hover:bg-white flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>

              {/* Task Cards */}
              <div className="space-y-3">
                {colTasks.map(task => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => onDragStart(e, task.id)}
                    onClick={() => openEdit(task)}
                    className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-grab hover:shadow-md hover:-translate-y-0.5 transition-all group ${draggedTaskId === task.id ? 'opacity-50 scale-95' : ''}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${priorityBadge[task.priority] || 'bg-gray-100 text-gray-500'}`}>
                        {task.priority}
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); setConfirmDelete(task.id); }}
                        className="w-6 h-6 rounded-lg hover:bg-red-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg className="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-1">{task.title}</h4>
                    {task.description && <p className="text-xs text-gray-400 line-clamp-2 mb-3">{task.description}</p>}
                    <div className="flex items-center justify-between">
                      {task.deadline ? (
                        <span className="text-[10px] text-gray-400 font-medium">📅 {new Date(task.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      ) : <span />}
                      {task.assignedTo && (
                        <img src={task.assignedTo.avatar} alt={task.assignedTo.name} title={task.assignedTo.name} className="w-6 h-6 rounded-full border-2 border-white shadow-sm" />
                      )}
                    </div>
                  </div>
                ))}
                {colTasks.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                    <p className="text-xs font-medium">No tasks</p>
                    <button onClick={() => openCreate(column)} className="text-xs text-indigo-500 hover:underline mt-1">+ Add task</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Delete Confirm */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setConfirmDelete(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-sm mx-4 animate-slideDown">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Task?</h3>
            <p className="text-sm text-gray-500 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setConfirmDelete(null)} className="px-4 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-50 rounded-xl transition-all">Cancel</button>
              <button onClick={() => { deleteTask(confirmDelete); setConfirmDelete(null); }} className="px-4 py-2 text-sm font-bold text-white bg-red-500 rounded-xl hover:bg-red-600 transition-all">Delete</button>
            </div>
          </div>
        </div>
      )}

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        task={editingTask}
        projectId={projectId}
      />
    </div>
  );
}
