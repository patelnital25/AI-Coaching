/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Legend, AreaChart, Area 
} from 'recharts';
import { Download, TrendingUp, AlertTriangle, CheckCircle, ArrowLeft, Lightbulb } from 'lucide-react';
import { MOCK_PERFORMANCE_DATA, downloadTranscript } from '@/constants';
import { motion } from 'motion/react';

interface AnalysisSummaryProps {
  insights: string[];
}

export default function AnalysisSummary({ insights }: AnalysisSummaryProps) {
  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-nice-blue">Analysis Summary</h1>
          <p className="text-gray-500 text-sm">Performance trends and key insights over the last 30 days</p>
        </div>
        <Button 
          variant="outline" 
          className="border-nice-blue text-nice-blue hover:bg-nice-blue/5"
          onClick={downloadTranscript}
        >
          <Download className="w-4 h-4 mr-2" />
          Download Transcript Data
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-green-50 border-green-100">
          <CardContent className="pt-6 flex items-start gap-4">
            <div className="p-2 bg-green-500 rounded-lg text-white">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-800">Overall Performance</p>
              <h3 className="text-2xl font-bold text-green-900">+4.2%</h3>
              <p className="text-xs text-green-700 mt-1">Improvement vs last period</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-amber-50 border-amber-100">
          <CardContent className="pt-6 flex items-start gap-4">
            <div className="p-2 bg-amber-500 rounded-lg text-white">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-amber-800">Critical Outliers</p>
              <h3 className="text-2xl font-bold text-amber-900">3 Agents</h3>
              <p className="text-xs text-amber-700 mt-1">Requiring immediate coaching</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-100">
          <CardContent className="pt-6 flex items-start gap-4">
            <div className="p-2 bg-blue-500 rounded-lg text-white">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800">Coaching Completion</p>
              <h3 className="text-2xl font-bold text-blue-900">88%</h3>
              <p className="text-xs text-blue-700 mt-1">Target: 95%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Agent Performance Trend (30 Days)</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_PERFORMANCE_DATA}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#006699" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#006699" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  tick={{fontSize: 10}} 
                  tickFormatter={(val) => val.split('-').slice(1).join('/')}
                />
                <YAxis domain={[60, 100]} tick={{fontSize: 10}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#006699" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorScore)" 
                  name="Agent Score"
                />
                <Line 
                  type="monotone" 
                  dataKey="avgScore" 
                  stroke="#94a3b8" 
                  strokeDasharray="5 5" 
                  name="Team Average"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">KPI Impact by Theme</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: 'Empathy', impact: 12, target: 5 },
                  { name: 'Technical', impact: 15, target: 8 },
                  { name: 'Closing', impact: 8, target: 4 },
                  { name: 'Billing', impact: 10, target: 6 },
                ]}
                layout="vertical"
                margin={{ left: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" tick={{fontSize: 12, fontWeight: 500}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="impact" fill="#006699" radius={[0, 4, 4, 0]} name="Current Gap (%)" />
                <Bar dataKey="target" fill="#94a3b8" radius={[0, 4, 4, 0]} name="Target Improvement (%)" />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-l-4 border-l-nice-blue">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-nice-blue" />
            Strategic Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {insights.length > 0 ? (
            insights.map((insight, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-nice-blue/10 text-nice-blue flex items-center justify-center flex-shrink-0 font-bold text-xs">{idx + 1}</div>
                <p className="text-sm text-gray-700">{insight}</p>
              </div>
            ))
          ) : (
            <>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-nice-blue/10 text-nice-blue flex items-center justify-center flex-shrink-0 font-bold text-xs">1</div>
                  <p className="text-sm text-gray-700">
                    <strong>Technical Knowledge Gap:</strong> 40% of low FCR calls are related to the new "Internet Modem X-500" series. Recommend immediate targeted training for the Billing and Tech Support teams.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-nice-blue/10 text-nice-blue flex items-center justify-center flex-shrink-0 font-bold text-xs">2</div>
                  <p className="text-sm text-gray-700">
                    <strong>Sentiment Correlation:</strong> There is a strong correlation (0.82) between negative customer sentiment in the first 30 seconds and overall CSAT scores. Empathy training should be prioritized.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-nice-blue/10 text-nice-blue flex items-center justify-center flex-shrink-0 font-bold text-xs">3</div>
                  <p className="text-sm text-gray-700">
                    <strong>AHT Outliers:</strong> Emily Davis and David Wilson show significantly higher AHT (+25% above average) during billing inquiries. This suggests a need for better navigation tools in the billing CRM.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-nice-blue/10 text-nice-blue flex items-center justify-center flex-shrink-0 font-bold text-xs">4</div>
                  <p className="text-sm text-gray-700">
                    <strong>Positive Trend:</strong> Sarah Johnson has shown a 15% improvement in empathy scores following the last coaching session, leading to a 5% boost in her personal CSAT.
                  </p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
