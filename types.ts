export interface MetricData {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: 'zap' | 'shield' | 'globe' | 'cpu';
}

export interface ChartDataPoint {
  time: string;
  enthusiasm: number;
  technicalDepth: number;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  method: string;
  status: number;
  message: string;
  location: string;
}

export interface EdgeNode {
  code: string;
  city: string;
  latency: number;
  status: 'operational' | 'rerouted' | 'maintenance';
}

export enum Tab {
  OVERVIEW = 'Overview',
  DEV_PLATFORM = 'Dev Platform',
  WORKER_EDITOR = 'Worker Editor',
  ANALYTICS = 'Analytics',
  SECURITY = 'Security',
}