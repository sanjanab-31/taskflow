import React from 'react';
import { useAppContext } from '../context/AppContext';

const roleBadge = { Admin: 'bg-indigo-50 text-indigo-600', Member: 'bg-gray-100 text-gray-600' };

export default function Team() {
  const { teamMembers, projects } = useAppContext();

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Team Members</h1>
        <p className="mt-1 text-gray-500 font-medium">Collaborate with your team and manage roles effectively.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {teamMembers.map(member => {
          const memberProjects = projects.filter(p => p.members?.some(m => m.id === member.id));
          return (
            <div key={member.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:-translate-y-1 transition-all group">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 p-0.5 shadow-md flex-shrink-0">
                  <img src={member.avatar} alt={member.name} className="w-full h-full rounded-[10px] bg-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">{member.name}</h3>
                  <p className="text-xs text-gray-400 truncate">{member.email}</p>
                  <span className={`inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${roleBadge[member.role] || 'bg-gray-100 text-gray-600'}`}>
                    {member.role}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                  <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="text-xs text-gray-500 font-medium">{member.department || 'Not assigned'}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                  <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                  </svg>
                  <span className="text-xs text-gray-500 font-medium">{memberProjects.length} project{memberProjects.length !== 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>
          );
        })}

        {teamMembers.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-24 text-gray-400">
            <p className="text-lg font-semibold text-gray-500">No team members yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
