import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

export default function TaskModal({ isOpen, onClose, task = null, projectId }) {
  const { addTask, updateTask, teamMembers } = useAppContext();
  const isEditing = !!task;

  const [form, setForm] = useState({
    title: '', description: '', status: 'To Do', priority: 'Medium', deadline: '', assignedTo: null
  });

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'To Do',
        priority: task.priority || 'Medium',
        deadline: task.deadline || '',
        assignedTo: task.assignedTo || null
      });
    } else {
      setForm({ title: '', description: '', status: 'To Do', priority: 'Medium', deadline: '', assignedTo: null });
    }
  }, [task, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateTask(task.id, form);
    } else {
      addTask({ ...form, projectId });
    }
    onClose();
  };

  const selectAssignee = (member) => {
    setForm(prev => ({
      ...prev,
      assignedTo: prev.assignedTo?.id === member.id ? null : { id: member.id, name: member.name, avatar: member.avatar }
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white w-full max-w-lg mx-4 rounded-2xl shadow-2xl border border-gray-100 animate-slideDown overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">{isEditing ? 'Edit Task' : 'Create New Task'}</h2>
            <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors">
              <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Task Title */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Task Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))}
              placeholder="e.g. Design landing page"
              className="w-full h-11 rounded-xl bg-gray-50 px-4 text-sm border border-gray-100 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))}
              placeholder="Task details..."
              rows={3}
              className="w-full rounded-xl bg-gray-50 px-4 py-3 text-sm border border-gray-100 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all resize-none"
            />
          </div>

          {/* Status, Priority, Deadline */}
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Status</label>
              <select value={form.status} onChange={(e) => setForm(p => ({ ...p, status: e.target.value }))}
                className="w-full h-11 rounded-xl bg-gray-50 px-3 text-sm border border-gray-100 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all">
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Priority</label>
              <select value={form.priority} onChange={(e) => setForm(p => ({ ...p, priority: e.target.value }))}
                className="w-full h-11 rounded-xl bg-gray-50 px-3 text-sm border border-gray-100 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Deadline</label>
              <input type="date" value={form.deadline} onChange={(e) => setForm(p => ({ ...p, deadline: e.target.value }))}
                className="w-full h-11 rounded-xl bg-gray-50 px-3 text-sm border border-gray-100 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" />
            </div>
          </div>

          {/* Assign To */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Assign To</label>
            <div className="flex flex-wrap gap-2">
              {teamMembers.map(member => {
                const selected = form.assignedTo?.id === member.id;
                return (
                  <button key={member.id} type="button" onClick={() => selectAssignee(member)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                      selected ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-indigo-300'
                    }`}>
                    <img src={member.avatar} alt={member.name} className="w-5 h-5 rounded-full" />
                    {member.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-all">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all">
              {isEditing ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
