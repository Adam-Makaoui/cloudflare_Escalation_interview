import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
// @ts-ignore
import confetti from 'canvas-confetti';
import { CHART_DATA, METRICS } from '../constants';
import { Icon } from './Icon';
import { Terminal } from './Terminal';
import { EdgeMap } from './EdgeMap';

export const Dashboard: React.FC = () => {
  const [offerStatus, setOfferStatus] = useState<'pending' | 'ready'>('pending');

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;
    const colors = ['#F38020', '#3b82f6', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
        zIndex: 9999
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
        zIndex: 9999
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const handleOfferClick = () => {
      setOfferStatus('ready');
      triggerConfetti();
      setTimeout(() => setOfferStatus('pending'), 5000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Intro Hero */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F38020] opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:opacity-10 transition-opacity"></div>
        <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F38020] text-white uppercase tracking-wider">Pages</span>
                <span className="text-slate-500 text-sm">+</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white uppercase tracking-wider">Workers</span>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Deployed: "Thank You" Application</h2>
            <p className="text-slate-400 max-w-2xl">
            This dashboard is served via Cloudflare Pages with server-side logic powered by Cloudflare Workers. 
            It represents my appreciation for the team's time interviewing me for the Onsite Escalation Engineer role, engineered for performance and scalability.
            </p>
            <div className="mt-4 flex gap-3">
                <button 
                    onClick={handleOfferClick}
                    className={`px-4 py-2 text-white text-sm font-medium rounded transition-all flex items-center gap-2 shadow-lg ${
                        offerStatus === 'ready' 
                        ? 'bg-green-600 shadow-green-900/20 scale-105' 
                        : 'bg-[#F38020] hover:bg-[#fa9c4e] shadow-orange-900/20'
                    }`}
                >
                    <Icon name={offerStatus === 'ready' ? 'check' : 'check'} size={16} />
                    {offerStatus === 'pending' ? 'Offer Status: Pending' : 'Ready to Join!'}
                </button>
                <button 
                  onClick={triggerConfetti}
                  className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-900 text-sm font-bold rounded transition-colors border border-slate-200 flex items-center gap-2 active:scale-95"
                >
                    <Icon name="zap" size={16} className="text-[#F38020] fill-[#F38020]" />
                    Send Appreciation
                </button>
            </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS.map((metric) => (
          <div key={metric.label} className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:border-slate-500 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400 font-medium">{metric.label}</span>
              <Icon name={metric.icon} size={16} className="text-slate-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{metric.value}</span>
              <span className={`text-xs font-medium ${metric.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-slate-800 border border-slate-700 rounded-lg p-5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-white">Interview Progression Analytics</h3>
            <div className="flex gap-2">
                <span className="px-2 py-1 text-xs font-medium text-[#F38020] bg-[#F38020]/10 rounded border border-[#F38020]/20">Last 30 Days</span>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA}>
                <defs>
                  <linearGradient id="colorEnthusiasm" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F38020" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F38020" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTech" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis 
                    dataKey="time" 
                    stroke="#94a3b8" 
                    tick={{fill: '#94a3b8', fontSize: 12}} 
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis 
                    stroke="#94a3b8" 
                    tick={{fill: '#94a3b8', fontSize: 12}} 
                    tickLine={false}
                    axisLine={false}
                />
                <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f1f5f9' }}
                    itemStyle={{ color: '#e2e8f0' }}
                />
                <Area 
                    type="monotone" 
                    dataKey="enthusiasm" 
                    name="Enthusiasm"
                    stroke="#F38020" 
                    fillOpacity={1} 
                    fill="url(#colorEnthusiasm)" 
                    strokeWidth={2}
                />
                <Area 
                    type="monotone" 
                    dataKey="technicalDepth" 
                    name="Tech Depth Shared"
                    stroke="#3b82f6" 
                    fillOpacity={1} 
                    fill="url(#colorTech)" 
                    strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Edge Map & Terminal Column */}
        <div className="lg:col-span-1 space-y-6">
            <div className="h-64">
                <EdgeMap />
            </div>
            <div className="h-64">
                <Terminal />
            </div>
        </div>
      </div>
    </div>
  );
};