import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('taskflow_data');
    if (savedData) {
      return JSON.parse(savedData);
    }
    // Default seed data
    return {
      projects: [
        {
          id: '1',
          name: 'Website Redesign',
          description: 'Revamping the main company website with new branding.',
          deadline: '2026-05-01',
          status: 'In Progress',
          members: [
            { id: '1', name: 'Sanjana B', email: 'sanjana.b@taskflow.com', role: 'Admin', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sanjana' },
            { id: '2', name: 'Alex Johnson', email: 'alex@example.com', role: 'Member', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' }
          ]
        },
        {
          id: '2',
          name: 'Mobile App MVP',
          description: 'Initial release of the iOS and Android applications.',
          deadline: '2026-06-15',
          status: 'Not Started',
          members: [
            { id: '1', name: 'Sanjana B', email: 'sanjana.b@taskflow.com', role: 'Admin', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sanjana' }
          ]
        }
      ],
      tasks: [
        {
          id: '1',
          projectId: '1',
          title: 'Design System Update',
          description: 'Update the core design system components in Figma.',
          status: 'Done',
          priority: 'High',
          deadline: '2026-04-10',
          assignedTo: { id: '1', name: 'Sanjana B', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sanjana' }
        },
        {
          id: '2',
          projectId: '1',
          title: 'Homepage Layout',
          description: 'Implement the new homepage layout based on approved designs.',
          status: 'In Progress',
          priority: 'Medium',
          deadline: '2026-04-15',
          assignedTo: { id: '2', name: 'Alex Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' }
        },
        {
          id: '3',
          projectId: '1',
          title: 'Copywriting',
          description: 'Draft the new copy for the about us and services pages.',
          status: 'To Do',
          priority: 'Low',
          deadline: '2026-04-20',
          assignedTo: null
        }
      ],
      teamMembers: [
        { id: '1', name: 'Sanjana B', email: 'sanjana.b@taskflow.com', role: 'Admin', department: 'Engineering', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sanjana' },
        { id: '2', name: 'Alex Johnson', email: 'alex@example.com', role: 'Member', department: 'Design', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
        { id: '3', name: 'Maria Garcia', email: 'maria@example.com', role: 'Member', department: 'Marketing', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria' }
      ]
    };
  });

  useEffect(() => {
    localStorage.setItem('taskflow_data', JSON.stringify(data));
  }, [data]);

  // --- Project Actions ---
  const addProject = (project) => {
    setData(prev => ({
      ...prev,
      projects: [...prev.projects, { ...project, id: Date.now().toString() }]
    }));
  };

  const updateProject = (id, updatedProject) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => (p.id === id ? { ...p, ...updatedProject } : p))
    }));
  };

  const deleteProject = (id) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id),
      tasks: prev.tasks.filter(t => t.projectId !== id) // Cascade delete tasks
    }));
  };

  // --- Task Actions ---
  const addTask = (task) => {
    setData(prev => ({
      ...prev,
      tasks: [...prev.tasks, { ...task, id: Date.now().toString() }]
    }));
  };

  const updateTask = (id, updatedTask) => {
    setData(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => (t.id === id ? { ...t, ...updatedTask } : t))
    }));
  };

  const deleteTask = (id) => {
    setData(prev => ({
      ...prev,
      tasks: prev.tasks.filter(t => t.id !== id)
    }));
  };

  const value = {
    projects: data.projects,
    tasks: data.tasks,
    teamMembers: data.teamMembers,
    addProject,
    updateProject,
    deleteProject,
    addTask,
    updateTask,
    deleteTask
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
