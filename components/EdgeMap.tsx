import React, { useEffect, useState } from 'react';
import { EDGE_NODES } from '../constants';
import { Icon } from './Icon';

export const EdgeMap: React.FC = () => {
  const [activeNodeIndex, setActiveNodeIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNodeIndex((prev) => (prev + 1) % EDGE_NODES.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-white">Global Appreciation Network</h3>
        <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs text-green-400 font-medium">Operational</span>
        </div>
      </div>
      
      <div className="flex-1 space-y-3">
        {EDGE_NODES.map((node, idx) => {
            const isActive = idx === activeNodeIndex;
            return (
                <div key={node.code} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isActive ? 'bg-[#F38020] scale-125 shadow-[0_0_10px_#F38020]' : 'bg-slate-600'}`}></div>
                        <span className={`font-mono text-sm ${isActive ? 'text-white' : 'text-slate-400'}`}>{node.code}</span>
                        <span className="text-sm text-slate-500 hidden sm:block">- {node.city}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-1.5 w-24 bg-slate-700 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-green-500 rounded-full transition-all duration-500" 
                                style={{ width: `${100 - (node.latency)}%` }}
                            ></div>
                        </div>
                        <span className="font-mono text-xs text-slate-400 w-12 text-right">{node.latency}ms</span>
                    </div>
                </div>
            )
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-700">
        <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Requests Processed: 1</span>
            <span>Avg Latency: 32ms</span>
        </div>
      </div>
    </div>
  );
};