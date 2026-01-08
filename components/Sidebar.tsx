import React from 'react';
import { Tab } from '../types';
import { Icon } from './Icon';

interface SidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const NAV_ITEMS = [
  { label: Tab.OVERVIEW, icon: 'dashboard' },
  { label: Tab.DEV_PLATFORM, icon: 'layers' },
  { label: Tab.WORKER_EDITOR, icon: 'code' },
  { label: Tab.ANALYTICS, icon: 'activity' },
  { label: Tab.SECURITY, icon: 'lock' },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-slate-700 bg-slate-900 h-screen sticky top-0">
      <div className="p-6 border-b border-slate-700 flex items-center gap-3">
        <div className="w-8 h-8 bg-[#F38020] rounded flex items-center justify-center relative overflow-hidden">
          <svg className="w-5 h-5 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.9 13.5l-2.6 6.8c-.3.8-1.5.8-1.8 0l-2.6-6.8H2.1c-.9 0-1.4-1.1-.7-1.7l5.3-4.5-2-6.5c-.3-.9.9-1.7 1.6-1.2l5.7 4.9 5.7-4.9c.7-.5 1.9.3 1.6 1.2l-2 6.5 5.3 4.5c.7.6.2 1.7-.7 1.7h-9z" transform="scale(0.8) translate(3,3)"/>
            <path d="M17.5 19c0 1.9-1.6 3.5-3.5 3.5S10.5 20.9 10.5 19H17.5z" opacity="0.5"/> 
          </svg>
        </div>
        <div className="flex flex-col">
            <span className="font-bold text-lg text-white tracking-tight leading-none">Cloudflare</span>
            <span className="text-[10px] text-slate-400 font-mono">PAGES</span>
        </div>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.label}
            onClick={() => setActiveTab(item.label)}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === item.label
                ? 'bg-slate-800 text-[#F38020]'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
            }`}
          >
            <Icon name={item.icon} size={18} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F38020] to-orange-600 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-orange-900/20">
            AM
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Adam Makaoui</p>
            <p className="text-xs text-slate-500 truncate">Onsite Escalation Engineer</p>
          </div>
        </div>
      </div>
    </aside>
  );
};