import React, { useEffect, useRef, useState } from 'react';
import { MOCK_LOGS } from '../constants';
import { LogEntry } from '../types';
import { Icon } from './Icon';

interface DisplayLogEntry extends LogEntry {
  uid: string;
}

export const Terminal: React.FC = () => {
  const [logs, setLogs] = useState<DisplayLogEntry[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      // Guard clause: reset if we've gone through all logs
      if (currentIndex >= MOCK_LOGS.length) {
        setLogs([]);
        currentIndex = 0;
        return;
      }

      const nextLog = MOCK_LOGS[currentIndex];
      
      if (nextLog) {
        setLogs(prev => [
          ...prev, 
          { 
            ...nextLog, 
            // Generate stable key at creation time rather than render time
            uid: `${nextLog.id}-${Date.now()}` 
          }
        ]);
        currentIndex++;
      } else {
        // Fallback reset
        currentIndex = 0;
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      // Use requestAnimationFrame to ensure clean scroll after DOM update
      requestAnimationFrame(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      });
    }
  }, [logs]);

  return (
    <div className="bg-slate-950 border border-slate-700 rounded-lg overflow-hidden shadow-xl flex flex-col h-full">
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
            <Icon name="terminal" size={16} className="text-[#F38020]" />
            <span className="text-xs font-mono text-slate-300">Workers Logs (Tail)</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
        </div>
      </div>
      <div ref={scrollRef} className="p-4 font-mono text-xs overflow-y-auto h-64 scrollbar-hide space-y-2">
        {logs.length === 0 && <span className="text-slate-500 animate-pulse">Waiting for traffic...</span>}
        {logs.map((log) => (
          <div key={log.uid} className="flex gap-3 text-slate-300 border-l-2 border-slate-800 pl-2 hover:border-[#F38020] transition-colors">
            <span className="text-slate-500 w-16 shrink-0">{log.timestamp}</span>
            <span className={`w-12 shrink-0 font-bold ${
                log.status >= 400 ? 'text-red-400' : 
                log.method === 'WORKER' ? 'text-purple-400' : 'text-blue-400'
            }`}>
              {log.method}
            </span>
            <span className={`w-10 shrink-0 ${log.status >= 400 ? 'text-red-400' : 'text-green-400'}`}>
              {log.status}
            </span>
            <span className="flex-1 truncate text-slate-200">{log.message}</span>
            <span className="text-slate-600 w-12 text-right shrink-0">{log.location}</span>
          </div>
        ))}
      </div>
    </div>
  );
};