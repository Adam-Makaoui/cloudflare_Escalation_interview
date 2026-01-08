import React from 'react';
import { Icon } from './Icon';

const TECH_STACK = [
  {
    name: 'Workers',
    icon: 'zap',
    description: 'Serverless execution at the edge. Deploy globally in seconds with no infrastructure management.',
    features: ['JavaScript/TypeScript runtime', '50ms from 95% of users worldwide', 'Standards-based Web APIs', 'Zero cold starts']
  },
  {
    name: 'Pages',
    icon: 'file-code',
    description: 'JAMstack platform with Git integration. Push to deploy with automatic builds and previews.',
    features: ['GitHub/GitLab integration', 'Automatic preview deployments', 'Free SSL & HTTP/3', 'Functions powered by Workers']
  },
  {
    name: 'D1',
    icon: 'database',
    description: 'SQLite-based serverless database. Query relational data at the edge with zero latency concerns.',
    features: ['Built on SQLite', 'SQL API compatibility', 'Automatic backups to R2', 'Local dev with Wrangler']
  },
  {
    name: 'Workers KV',
    icon: 'key',
    description: 'Global low-latency key-value storage. Perfect for configuration, sessions, and cached data.',
    features: ['Eventually consistent reads', 'Sub-millisecond latency', 'Unlimited reads', 'REST API & bindings']
  },
  {
    name: 'R2',
    icon: 'hard-drive',
    description: 'S3-compatible object storage with zero egress fees. Store unlimited data without bandwidth costs.',
    features: ['S3-compatible API', 'Zero egress charges', 'Global distribution', 'Perfect for media & backups']
  },
  {
    name: 'Durable Objects',
    icon: 'target',
    description: 'Stateful compute with strong consistency. Coordinate real-time apps, WebSockets, and distributed systems.',
    features: ['Global uniqueness guarantee', 'SQLite storage backend', 'Perfect for real-time apps', 'WebSocket support']
  }
];

export const DevPlatform: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-bold text-white mb-2">The Developer Platform 🚀</h2>
                <p className="text-slate-400">Building full-stack applications at the Edge.</p>
            </div>
            <a 
                href="https://developers.cloudflare.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#F38020] text-white rounded font-medium shadow-lg shadow-orange-900/20 hover:bg-[#fa9c4e] transition-colors flex items-center gap-2"
            >
                Start Building <Icon name="chevron-right" size={16} />
            </a>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TECH_STACK.map((tech) => (
                <div key={tech.name} className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-[#F38020] transition-colors group">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-700 group-hover:border-[#F38020] transition-colors">
                            <Icon name={tech.icon} className="text-[#F38020]" size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-white">{tech.name}</h3>
                    </div>
                    
                    <p className="text-slate-400 text-sm mb-6 min-h-[40px]">
                        {tech.description}
                    </p>

                    <ul className="space-y-2">
                        {tech.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-2 text-xs text-slate-300">
                                <div className="mt-0.5 min-w-[4px] h-1 w-1 rounded-full bg-blue-500"></div>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>

        {/* Stats Footer */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-lg p-8 mt-8">
            <h3 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
                Why This Platform Matters <Icon name="zap" size={20} className="text-yellow-400" />
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col">
                    <span className="text-4xl font-bold text-white mb-1">50ms</span>
                    <span className="text-sm text-slate-400">From 95% of users globally</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-4xl font-bold text-white mb-1">$0</span>
                    <span className="text-sm text-slate-400">Egress fees on R2 storage</span>
                </div>
                 <div className="flex flex-col">
                    <span className="text-4xl font-bold text-white mb-1">0ms</span>
                    <span className="text-sm text-slate-400">Cold starts on Workers</span>
                </div>
            </div>
        </div>
    </div>
  );
};