/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Header from './components/Header';
import ControlPanel from './components/ControlPanel';
import CoachingResults from './components/CoachingResults';
import AnalysisSummary from './components/AnalysisSummary';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { analyzeTranscripts } from './services/geminiService';
import { AgentCoachingOpportunity } from './types';
import { MOCK_COACHING_OPPORTUNITIES } from './constants';

type Screen = 'control' | 'results' | 'summary';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('control');
  const [opportunities, setOpportunities] = useState<AgentCoachingOpportunity[]>(MOCK_COACHING_OPPORTUNITIES);
  const [insights, setInsights] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleRunAnalysis = async (transcriptContent: string | null) => {
    setCurrentScreen('results');
    if (!transcriptContent) return;

    setIsAnalyzing(true);
    try {
      const result = await analyzeTranscripts(transcriptContent);
      if (result.opportunities.length > 0) {
        setOpportunities(result.opportunities);
      }
      if (result.insights.length > 0) {
        setInsights(result.insights);
      }
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const goToNext = () => {
    if (currentScreen === 'control') setCurrentScreen('results');
    else if (currentScreen === 'results') setCurrentScreen('summary');
  };

  const goToPrev = () => {
    if (currentScreen === 'results') setCurrentScreen('control');
    else if (currentScreen === 'summary') setCurrentScreen('results');
  };

  return (
    <div className="min-h-screen bg-nice-gray-bg font-sans">
      <Header />
      
      <main className="container mx-auto py-4">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between px-6 mb-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={goToPrev}
              disabled={currentScreen === 'control'}
              className="flex items-center gap-1 text-sm font-medium text-nice-blue disabled:text-gray-400 disabled:cursor-not-allowed hover:underline"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
            
            <Tabs 
              value={currentScreen === 'summary' ? 'results' : currentScreen} 
              onValueChange={(v) => setCurrentScreen(v as Screen)}
              className="w-auto"
            >
              <TabsList className="bg-white border shadow-sm">
                <TabsTrigger value="control" className="data-[state=active]:bg-nice-blue data-[state=active]:text-white">
                  Control Panel
                </TabsTrigger>
                <TabsTrigger value="results" className="data-[state=active]:bg-nice-blue data-[state=active]:text-white">
                  Coaching Results
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <button 
              onClick={goToNext}
              disabled={currentScreen === 'summary'}
              className="flex items-center gap-1 text-sm font-medium text-nice-blue disabled:text-gray-400 disabled:cursor-not-allowed hover:underline"
            >
              Forward
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="text-xs text-gray-400 font-medium">
            August 19, 2025 | 249,960 Total Interactions Result
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {currentScreen === 'control' && (
              <ControlPanel onRunAnalysis={handleRunAnalysis} />
            )}
            {currentScreen === 'results' && (
              <CoachingResults 
                onGoToSummary={() => setCurrentScreen('summary')} 
                opportunities={opportunities}
                isAnalyzing={isAnalyzing}
              />
            )}
            {currentScreen === 'summary' && (
              <AnalysisSummary insights={insights} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
