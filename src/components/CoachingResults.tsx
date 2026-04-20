/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, Clock, User, Target, Lightbulb, AlertCircle, ArrowRight } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { MOCK_COACHING_OPPORTUNITIES } from '@/constants';
import { AgentCoachingOpportunity, ViewMode, AnalysisStep } from '@/types';
import { motion, AnimatePresence } from 'motion/react';

interface CoachingResultsProps {
  onGoToSummary: () => void;
  opportunities: AgentCoachingOpportunity[];
  isAnalyzing: boolean;
}

const ANALYSIS_STEPS: AnalysisStep[] = [
  { id: 1, label: 'Parsing transcript data', status: 'completed' },
  { id: 2, label: 'Identifying sentiment patterns', status: 'completed' },
  { id: 3, label: 'Correlating with KPI trends', status: 'completed' },
  { id: 4, label: 'Generating coaching recommendations', status: 'completed' },
];

export default function CoachingResults({ onGoToSummary, opportunities, isAnalyzing }: CoachingResultsProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('kpi');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isAnalyzing) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress(prev => (prev >= 100 ? 100 : prev + 5));
      }, 100);
      return () => clearInterval(interval);
    } else {
      setProgress(100);
    }
  }, [isAnalyzing]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Low': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const renderCards = () => {
    let displayData: AgentCoachingOpportunity[] = [];

    if (viewMode === 'agent') {
      // Flatten data to show individual agent cards
      opportunities.forEach(opp => {
        opp.agentsImpacted.forEach(agent => {
          displayData.push({
            ...opp,
            id: `${opp.id}-${agent}`,
            agentName: agent
          });
        });
      });
    } else {
      displayData = opportunities;
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {displayData.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="h-full flex flex-col hover:shadow-xl transition-shadow border-t-4 border-t-nice-blue">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start mb-2">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getPriorityColor(item.priority)}`}>
                    {item.priority} Priority
                  </span>
                  {viewMode === 'agent' && (
                    <div className="flex items-center gap-1 text-nice-blue font-semibold text-sm">
                      <User className="w-4 h-4" />
                      {item.agentName}
                    </div>
                  )}
                </div>
                <CardTitle className="text-lg font-bold leading-tight">{item.theme}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow space-y-4 pt-2">
                {viewMode === 'kpi' && (
                  <div className="space-y-1">
                    <Label className="text-xs text-gray-500 uppercase font-bold">Agents Impacted</Label>
                    <div className="flex flex-wrap gap-1">
                      {item.agentsImpacted.map(agent => (
                        <span key={agent} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs border border-gray-200">
                          {agent}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="space-y-1">
                  <Label className="text-xs text-gray-500 uppercase font-bold flex items-center gap-1">
                    <Target className="w-3 h-3" /> KPI Impact
                  </Label>
                  <p className="text-sm font-semibold text-red-600">{item.kpiImpact}</p>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs text-gray-500 uppercase font-bold flex items-center gap-1">
                    <Lightbulb className="w-3 h-3" /> Recommended Coaching
                  </Label>
                  <p className="text-sm text-gray-700 leading-relaxed">{item.recommendedCoaching}</p>
                </div>
              </CardContent>
              <CardFooter className="pt-4 border-t bg-gray-50/50">
                <Button variant="ghost" className="w-full text-nice-blue hover:text-nice-blue-dark hover:bg-nice-blue/5 text-xs font-bold uppercase tracking-wider">
                  View Full Analysis
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-nice-blue">Coaching Opportunity Results</h1>
          <p className="text-gray-500 text-sm">AI-driven insights based on recent interaction data</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label className="text-sm font-medium whitespace-nowrap">View By:</Label>
            <Select value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kpi">KPI Themes</SelectItem>
                <SelectItem value="agent">Individual Agents</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button 
            className="bg-nice-blue hover:bg-nice-blue-dark"
            onClick={onGoToSummary}
          >
            Analysis Summary
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isAnalyzing ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Clock className="w-5 h-5 text-nice-blue animate-spin" />
                      Agent Analysis Steps
                    </h3>
                    <span className="text-sm font-medium text-nice-blue">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {ANALYSIS_STEPS.map((step) => (
                      <div key={step.id} className="flex items-center gap-3 p-3 rounded-lg bg-nice-gray-bg border border-gray-100">
                        {progress > (step.id * 25) ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-300" />
                        )}
                        <span className={`text-sm ${progress > (step.id * 25) ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                          {step.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {renderCards()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
