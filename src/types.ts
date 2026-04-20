/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AgentCoachingOpportunity {
  id: string;
  theme: string;
  agentsImpacted: string[];
  kpiImpact: string;
  recommendedCoaching: string;
  priority: 'High' | 'Medium' | 'Low';
  agentName?: string; // For individual view
}

export interface AnalysisStep {
  id: number;
  label: string;
  status: 'pending' | 'processing' | 'completed';
}

export interface PerformanceMetric {
  date: string;
  score: number;
  avgScore: number;
  agentName: string;
}

export type ViewMode = 'agent' | 'kpi';
