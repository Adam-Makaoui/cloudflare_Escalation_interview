import { ChartDataPoint, LogEntry, MetricData, EdgeNode } from './types';

export const METRICS: MetricData[] = [
  {
    label: "Gratitude Level",
    value: "100%",
    change: "+15% vs last interview",
    isPositive: true,
    icon: 'zap'
  },
  {
    label: "Questions Answered",
    value: "42",
    change: "Zero packet loss",
    isPositive: true,
    icon: 'cpu'
  },
  {
    label: "Latency (Response Time)",
    value: "< 10ms",
    change: "Edge optimized",
    isPositive: true,
    icon: 'globe'
  },
  {
    label: "Threats Mitigated",
    value: "All",
    change: "Nerves blocked",
    isPositive: true,
    icon: 'shield'
  }
];

export const CHART_DATA: ChartDataPoint[] = [
  { time: 'Intro', enthusiasm: 65, technicalDepth: 40 },
  { time: 'Tech Screen', enthusiasm: 75, technicalDepth: 85 },
  { time: 'System Design', enthusiasm: 85, technicalDepth: 90 },
  { time: 'Culture Fit', enthusiasm: 95, technicalDepth: 88 },
  { time: 'Final Round', enthusiasm: 98, technicalDepth: 95 },
  { time: 'Offer Stage', enthusiasm: 100, technicalDepth: 100 },
];

export const MOCK_LOGS: LogEntry[] = [
  { id: '1', timestamp: '10:00:01', method: 'GET', status: 200, message: 'Initiating handshake with Recruiters', location: 'SFO' },
  { id: '2', timestamp: '10:00:05', method: 'POST', status: 200, message: 'Delivering technical_assessment.json', location: 'LHR' },
  { id: '3', timestamp: '10:01:12', method: 'PUT', status: 201, message: 'Updating candidate_status: "Impressed"', location: 'SIN' },
  { id: '4', timestamp: '10:02:45', method: 'GET', status: 200, message: 'Fetching Cloudflare values...', location: 'IAD' },
  { id: '5', timestamp: '10:03:00', method: 'WAF', status: 403, message: 'Blocked "Imposter Syndrome" attack', location: 'Global' },
  { id: '6', timestamp: '10:04:20', method: 'WORKER', status: 200, message: 'Executed function sayThankYou()', location: 'Edge' },
];

export const EDGE_NODES: EdgeNode[] = [
  { code: 'SFO', city: 'San Francisco', latency: 4, status: 'operational' },
  { code: 'IAD', city: 'Ashburn', latency: 12, status: 'operational' },
  { code: 'LHR', city: 'London', latency: 28, status: 'operational' },
  { code: 'SIN', city: 'Singapore', latency: 45, status: 'operational' },
  { code: 'SYD', city: 'Sydney', latency: 52, status: 'operational' },
  { code: 'NRT', city: 'Tokyo', latency: 38, status: 'operational' },
  { code: 'GRU', city: 'São Paulo', latency: 60, status: 'operational' },
  { code: 'FRA', city: 'Frankfurt', latency: 22, status: 'operational' },
];

export const WORKER_CODE = `
import { WorkerEntrypoint } from "cloudflare:workers";

interface Env {
  APPRECIATION_KV: KVNamespace;
  AI: Ai;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // 1. Check for malicious intent (nerves, imposter syndrome)
    if (request.headers.get("x-nerves") === "high") {
       return new Response("Relax. You got this.", { status: 418 });
    }

    // 2. Retrieve interview highlights from KV
    const highlights = await env.APPRECIATION_KV.get("INTERVIEW_NOTES", "json");

    // 3. Construct the gratitude payload
    const responsePayload = {
      candidate: "The Best Option",
      gratitude_level: "MAX_SAFE_INTEGER",
      message: "Thank you to the team for the thoughtful questions!",
      cultural_fit: true,
      technically_proficient: true,
      ready_to_deploy: true
    };

    // 4. Return via the Edge
    return new Response(JSON.stringify(responsePayload, null, 2), {
      headers: {
        "content-type": "application/json",
        "x-powered-by": "Cloudflare Workers",
        "x-hiring-decision": "HIRE_IMMEDIATELY"
      },
    });
  },
} satisfies ExportedHandler<Env>;
`;