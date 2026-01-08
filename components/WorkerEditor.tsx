import React, { useState } from 'react';
import { WORKER_CODE } from '../constants';
import { Icon } from './Icon';

export const WorkerEditor: React.FC = () => {
  const [deployStatus, setDeployStatus] = useState<'idle' | 'deploying' | 'deployed'>('idle');
  const [showOutput, setShowOutput] = useState(false);
  const [outputContent, setOutputContent] = useState('');

  const handleTestRequest = () => {
    setShowOutput(true);
    setOutputContent('Executing worker...');
    
    setTimeout(() => {
        setOutputContent(JSON.stringify({
            candidate: "The Best Option",
            gratitude_level: "MAX_SAFE_INTEGER",
            message: "Thank you to the team for the thoughtful questions!",
            cultural_fit: true,
            technically_proficient: true,
            ready_to_deploy: true
        }, null, 2));
    }, 600);
  };

  const handleDeploy = () => {
    if (deployStatus === 'deploying' || deployStatus === 'deployed') return;
    
    setDeployStatus('deploying');
    
    // Simulate network delay
    setTimeout(() => {
        setDeployStatus('deployed');
        setTimeout(() => setDeployStatus('idle'), 3000); // Reset after 3s
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] animate-fade-in relative">
        <div className="flex items-center justify-between mb-4">
            <div>
                <h2 className="text-xl font-semibold text-white">thank-you-worker.ts</h2>
                <p className="text-sm text-slate-400">Deployed to Cloudflare Workers • Latest version</p>
            </div>
            <div className="flex gap-2">
                <button 
                    onClick={handleTestRequest}
                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 text-sm transition-colors active:scale-95"
                >
                    <Icon name="play" size={14} />
                    Test Request
                </button>
                <button 
                    onClick={handleDeploy}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm font-medium transition-all shadow-lg active:scale-95 min-w-[100px] justify-center ${
                        deployStatus === 'deployed' 
                            ? 'bg-green-600 text-white shadow-green-900/20' 
                            : deployStatus === 'deploying'
                            ? 'bg-slate-700 text-slate-300 cursor-wait'
                            : 'bg-[#F38020] hover:bg-[#fa9c4e] text-white shadow-orange-900/20'
                    }`}
                >
                    {deployStatus === 'idle' && (
                        <>
                            <Icon name="globe" size={14} />
                            Deploy
                        </>
                    )}
                    {deployStatus === 'deploying' && (
                        <>
                           <span className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                           Deploying
                        </>
                    )}
                     {deployStatus === 'deployed' && (
                        <>
                           <Icon name="check" size={14} />
                           Deployed!
                        </>
                    )}
                </button>
            </div>
        </div>

        <div className="flex-1 bg-[#1e1e1e] border border-slate-700 rounded-lg overflow-hidden flex flex-col font-mono text-sm relative shadow-2xl">
            {/* Editor Header */}
            <div className="bg-[#252526] px-4 py-2 border-b border-[#333] flex gap-4 text-xs">
                <div className="flex items-center gap-1.5 text-white bg-[#1e1e1e] px-2 py-1 rounded-t border-t-2 border-[#F38020]">
                    <span className="text-blue-400">TS</span>
                    <span>src/index.ts</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 py-1">
                    <span>wrangler.toml</span>
                </div>
            </div>

            {/* Editor Body */}
            <div className="flex-1 relative overflow-auto p-4 leading-relaxed">
                {/* Line Numbers */}
                <div className="absolute left-0 top-4 bottom-0 w-10 text-right pr-3 text-slate-600 select-none font-mono text-xs leading-relaxed">
                    {WORKER_CODE.trim().split('\n').map((_, i) => (
                        <div key={i}>{i + 1}</div>
                    ))}
                </div>
                
                {/* Code Content */}
                <div className="ml-10 whitespace-pre font-mono text-[#d4d4d4]">
                    {WORKER_CODE.trim().split('\n').map((line, i) => {
                        const highlight = (text: string) => {
                            if (text.startsWith('import') || text.startsWith('export') || text.startsWith('return') || text.startsWith('async') || text.startsWith('interface')) 
                                return <span className="text-[#c586c0]">{text}</span>;
                            if (text.includes('//')) 
                                return <span className="text-[#6a9955]">{text}</span>;
                            if (text.includes('"')) 
                                return <span className="text-[#ce9178]">{text}</span>;
                            if (text.includes('Env') || text.includes('Request') || text.includes('Response'))
                                return <span className="text-[#4ec9b0]">{text}</span>;
                            return <span>{text}</span>;
                        };
                        return <div key={i}>{highlight(line)}</div>;
                    })}
                </div>
            </div>
            
            {/* Status Bar */}
            <div className="bg-[#F38020] text-white text-xs px-3 py-1 flex justify-between items-center">
                <div className="flex gap-4">
                    <span>Ready</span>
                    <span>Ln 24, Col 12</span>
                </div>
                <div>
                    <span>TypeScript React</span>
                </div>
            </div>

            {/* Simulated Output Panel Overlay */}
            {showOutput && (
                <div className="absolute bottom-8 left-0 right-0 bg-[#0f172a] border-t border-slate-700 p-0 shadow-2xl animate-slide-up h-48 flex flex-col">
                     <div className="flex items-center justify-between px-4 py-1 bg-slate-800 border-b border-slate-700">
                        <span className="text-xs font-semibold text-slate-300">Terminal Output - HTTP 200 OK</span>
                        <button onClick={() => setShowOutput(false)} className="text-slate-400 hover:text-white">
                            <Icon name="x" size={14} className="rotate-45" /> {/* Using x icon or simulated close */}
                            ✕
                        </button>
                     </div>
                     <div className="p-4 font-mono text-xs overflow-auto text-green-400 whitespace-pre">
                        {outputContent}
                     </div>
                </div>
            )}
        </div>
    </div>
  );
};