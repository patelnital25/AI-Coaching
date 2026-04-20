/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AgentCoachingOpportunity, PerformanceMetric } from './types';

export const MOCK_AGENTS = ['John Smith', 'Sarah Johnson', 'Michael Brown', 'Emily Davis', 'David Wilson'];

export const MOCK_COACHING_OPPORTUNITIES: AgentCoachingOpportunity[] = [
  {
    id: '1',
    theme: 'Empathy & Active Listening',
    agentsImpacted: ['John Smith', 'Sarah Johnson'],
    kpiImpact: 'CSAT (-12%)',
    recommendedCoaching: 'Role-play exercises focused on validating customer frustration and using empathetic phrases.',
    priority: 'High'
  },
  {
    id: '2',
    theme: 'Technical Troubleshooting',
    agentsImpacted: ['Michael Brown'],
    kpiImpact: 'FCR (-15%)',
    recommendedCoaching: 'Review updated knowledge base articles for Internet Modem connectivity issues.',
    priority: 'High'
  },
  {
    id: '3',
    theme: 'Closing & Next Steps',
    agentsImpacted: ['Emily Davis', 'David Wilson'],
    kpiImpact: 'AHT (+45s)',
    recommendedCoaching: 'Training on clear call wrap-up procedures and setting expectations for follow-up.',
    priority: 'Medium'
  },
  {
    id: '4',
    theme: 'Billing Explanation',
    agentsImpacted: ['Sarah Johnson', 'Emily Davis'],
    kpiImpact: 'Billing Adjustments (+8%)',
    recommendedCoaching: 'Deep dive into the new pricing structure and how to explain prorated charges.',
    priority: 'Medium'
  }
];

export const MOCK_PERFORMANCE_DATA: PerformanceMetric[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toISOString().split('T')[0],
    score: Math.floor(Math.random() * 20) + 75,
    avgScore: 82,
    agentName: MOCK_AGENTS[i % MOCK_AGENTS.length]
  };
});

export const MOCK_TRANSCRIPT_DATA = [
  { id: 1, agent: 'John Smith', customer: 'Alice', transcript: 'Customer: I am very frustrated with my bill. Agent: I understand, let me look into that for you...' },
  { id: 2, agent: 'Sarah Johnson', customer: 'Bob', transcript: 'Customer: My internet is down again. Agent: Okay, have you tried restarting the modem?' },
  // ... more mock transcripts
];

export const downloadTranscript = () => {
  const data = JSON.stringify(MOCK_TRANSCRIPT_DATA, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'coaching_transcripts.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
