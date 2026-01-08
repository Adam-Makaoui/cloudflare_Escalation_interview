import React, { useState, useRef, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { WorkerEditor } from './components/WorkerEditor';
import { DevPlatform } from './components/DevPlatform';
import { Tab } from './types';
import { Icon } from './components/Icon';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.OVERVIEW);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const notificationRef = useRef<HTMLDivElement>(null);

  const notifications = [
    { id: 1, title: 'Layer 7 Interview', msg: 'Status: Passed. Strong grasp of HTTP/3, WAF, and L7 protocols.', time: '2h ago', icon: 'check', color: 'text-green-400' },
    { id: 2, title: 'System Alert', msg: 'Worker script propagated to 310+ edge cities.', time: '3h ago', icon: 'zap', color: 'text-[#F38020]' },
    { id: 3, title: 'Dev Platform Interview', msg: 'Status: Passed. Demonstrated proficiency with Workers & Pages.', time: '1d ago', icon: 'check', color: 'text-green-400' },
    { id: 4, title: 'Zero Trust Interview', msg: 'Status: Passed. Verified Access & Gateway architecture knowledge.', time: '2d ago', icon: 'shield', color: 'text-green-400' },
    { id: 5, title: 'Hiring Manager Round', msg: 'Status: Passed. Endorsed for Onsite Escalation Engineer role.', time: '1w ago', icon: 'user', color: 'text-blue-400' },
    { id: 6, title: 'Recruiter Round', msg: 'Status: Passed. Cultural fit and background alignment verified.', time: '2w ago', icon: 'check', color: 'text-green-400' },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
        setUnreadCount(0);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-slate-300 font-sans selection:bg-[#F38020] selection:text-white">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-700 bg-slate-900/50 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between px-6">
            <div className="flex items-center gap-2 text-sm">
                <span 
                    onClick={() => setActiveTab(Tab.OVERVIEW)}
                    className="text-slate-400 hover:text-white cursor-pointer transition-colors"
                >
                    Adam Makaoui
                </span>
                <Icon name="chevron-right" size={14} className="text-slate-600" />
                <span 
                    onClick={() => setActiveTab(Tab.OVERVIEW)}
                    className="text-slate-400 hover:text-white cursor-pointer transition-colors"
                >
                    interview-app.pages.dev
                </span>
                <Icon name="chevron-right" size={14} className="text-slate-600" />
                <span className="font-medium text-white bg-slate-800 px-2 py-0.5 rounded text-xs border border-slate-700">
                    {activeTab}
                </span>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 text-xs border-r border-slate-700 pr-4">
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-green-500/10 text-green-400 rounded border border-green-500/20">
                        <Icon name="check" size={12} />
                        Pages: Active
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-blue-500/10 text-blue-400 rounded border border-blue-500/20">
                        <Icon name="zap" size={12} />
                        Workers: Bound
                    </div>
                </div>

                <a 
                    href="mailto:adam.makaoui@outlook.com"
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                >
                    <span className="text-xs font-medium">Feedback?</span>
                </a>
                <div className="h-4 w-px bg-slate-700"></div>
                
                {/* Notifications */}
                <div className="relative" ref={notificationRef}>
                    <button 
                        onClick={handleNotificationClick}
                        className={`text-slate-400 hover:text-white transition-colors relative ${showNotifications ? 'text-white' : ''}`}
                    >
                        <Icon name="bell" size={18} />
                        {unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#F38020] rounded-full ring-2 ring-slate-900 animate-pulse"></span>
                        )}
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 mt-3 w-80 bg-slate-800 border border-slate-700 rounded-lg shadow-xl py-2 animate-fade-in z-50">
                            <div className="px-4 py-2 border-b border-slate-700 flex justify-between items-center">
                                <h3 className="font-medium text-white text-sm">Notifications</h3>
                                <span className="text-xs text-slate-500">All caught up</span>
                            </div>
                            <div className="max-h-64 overflow-y-auto">
                                {notifications.map(notif => (
                                    <div key={notif.id} className="px-4 py-3 hover:bg-slate-700/50 transition-colors border-b border-slate-700/50 last:border-0 cursor-pointer">
                                        <div className="flex gap-3">
                                            <div className={`mt-0.5 ${notif.color}`}>
                                                <Icon name={notif.icon} size={16} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-slate-200">{notif.title}</p>
                                                <p className="text-xs text-slate-400 mt-0.5">{notif.msg}</p>
                                                <p className="text-[10px] text-slate-500 mt-1">{notif.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="px-4 py-2 border-t border-slate-700 bg-slate-800/50 text-center">
                                <button className="text-xs text-[#F38020] font-medium hover:text-[#fa9c4e]">View All Activity</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
             {activeTab === Tab.OVERVIEW && <Dashboard />}
             {activeTab === Tab.DEV_PLATFORM && <DevPlatform />}
             {activeTab === Tab.WORKER_EDITOR && <WorkerEditor />}
             {(activeTab === Tab.ANALYTICS || activeTab === Tab.SECURITY) && (
                 <div className="flex flex-col items-center justify-center h-96 text-center space-y-4 animate-fade-in">
                     <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
                         <Icon name="lock" size={32} className="text-slate-500" />
                     </div>
                     <h2 className="text-xl font-medium text-white">Access Restricted</h2>
                     <p className="text-slate-400 max-w-md">
                         This section is available to full-time employees only. <br/>
                         <span className="text-[#F38020] cursor-pointer hover:underline">Hire Adam</span> to unlock full dashboard access.
                     </p>
                 </div>
             )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;