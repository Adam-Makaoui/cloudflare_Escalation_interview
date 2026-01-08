import React from 'react';
import { 
  Zap, 
  Shield, 
  Globe, 
  Cpu, 
  LayoutDashboard, 
  Activity, 
  Server, 
  Lock, 
  ChevronRight, 
  Bell, 
  User,
  Terminal,
  Code2,
  CheckCircle,
  Play,
  Layers,
  Database,
  Key,
  HardDrive,
  FileCode,
  Target
} from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, className, size = 20 }) => {
  const props = { className, size };
  
  switch (name) {
    case 'zap': return <Zap {...props} />;
    case 'shield': return <Shield {...props} />;
    case 'globe': return <Globe {...props} />;
    case 'cpu': return <Cpu {...props} />;
    case 'dashboard': return <LayoutDashboard {...props} />;
    case 'activity': return <Activity {...props} />;
    case 'server': return <Server {...props} />;
    case 'lock': return <Lock {...props} />;
    case 'chevron-right': return <ChevronRight {...props} />;
    case 'bell': return <Bell {...props} />;
    case 'user': return <User {...props} />;
    case 'terminal': return <Terminal {...props} />;
    case 'code': return <Code2 {...props} />;
    case 'check': return <CheckCircle {...props} />;
    case 'play': return <Play {...props} />;
    case 'layers': return <Layers {...props} />;
    case 'database': return <Database {...props} />;
    case 'key': return <Key {...props} />;
    case 'hard-drive': return <HardDrive {...props} />;
    case 'file-code': return <FileCode {...props} />;
    case 'target': return <Target {...props} />;
    default: return <Zap {...props} />;
  }
};