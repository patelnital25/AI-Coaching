/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Upload, Play, FileText, BarChart3, ClipboardCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface ControlPanelProps {
  onRunAnalysis: (transcriptContent: string | null) => void;
}

export default function ControlPanel({ onRunAnalysis }: ControlPanelProps) {
  const [file, setFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFileContent(event.target.result as string);
        }
      };
      reader.readAsText(selectedFile);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-nice-blue">AI Coaching Strategy Agent</h1>
      </div>

      <Card className="border-none shadow-lg bg-white">
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-nice-blue" />
            Agent Control Panel
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Team Selection</Label>
              <Select defaultValue="customer-service">
                <SelectTrigger>
                  <SelectValue placeholder="Select Team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer-service">Customer Service</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="billing">Billing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Time Period</Label>
              <Select defaultValue="30">
                <SelectTrigger>
                  <SelectValue placeholder="Select Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="60">Last 60 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-base font-semibold">Data Sources</Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2 bg-nice-gray-bg p-3 rounded-md border border-gray-200">
                <Checkbox id="transcripts" defaultChecked />
                <Label htmlFor="transcripts" className="cursor-pointer flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  Interaction Transcripts
                </Label>
              </div>
              <div className="flex items-center space-x-2 bg-nice-gray-bg p-3 rounded-md border border-gray-200">
                <Checkbox id="qa-scores" defaultChecked />
                <Label htmlFor="qa-scores" className="cursor-pointer flex items-center gap-2">
                  <ClipboardCheck className="w-4 h-4 text-gray-500" />
                  QA Scores
                </Label>
              </div>
              <div className="flex items-center space-x-2 bg-nice-gray-bg p-3 rounded-md border border-gray-200">
                <Checkbox id="kpi-trends" defaultChecked />
                <Label htmlFor="kpi-trends" className="cursor-pointer flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-gray-500" />
                  KPI Trends
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-base font-semibold">Upload Transcripts</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-nice-blue transition-colors cursor-pointer relative">
              <input 
                type="file" 
                className="absolute inset-0 opacity-0 cursor-pointer" 
                onChange={handleFileChange}
                accept=".csv,.json,.txt"
              />
              <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                {file ? `Selected: ${file.name}` : 'Drag and drop or click to upload transcript data'}
              </p>
              <p className="text-xs text-gray-400 mt-1">Supports CSV, JSON, TXT</p>
            </div>
          </div>

          <div className="pt-4">
            <Button 
              className="w-full bg-nice-blue hover:bg-nice-blue-dark text-white h-12 text-lg font-semibold shadow-md transition-all active:scale-[0.98]"
              onClick={() => onRunAnalysis(fileContent)}
            >
              <Play className="w-5 h-5 mr-2" />
              Run AI Analysis on Transcript Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
