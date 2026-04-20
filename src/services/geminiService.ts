/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Type } from "@google/genai";
import { AgentCoachingOpportunity } from "@/types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeTranscripts(transcripts: string): Promise<{
  opportunities: AgentCoachingOpportunity[];
  insights: string[];
}> {
  const prompt = `
    Analyze the following customer service interaction transcripts and identify coaching opportunities for the agents.
    
    Transcripts:
    ${transcripts}
    
    Return the analysis in JSON format with the following structure:
    {
      "opportunities": [
        {
          "id": "unique_id",
          "theme": "The main coaching theme (e.g., Empathy, Technical Knowledge)",
          "agentsImpacted": ["Agent Name 1", "Agent Name 2"],
          "kpiImpact": "The KPI affected and estimated impact (e.g., CSAT -10%)",
          "recommendedCoaching": "Specific coaching advice",
          "priority": "High" | "Medium" | "Low"
        }
      ],
      "insights": ["Strategic insight 1", "Strategic insight 2"]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            opportunities: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  theme: { type: Type.STRING },
                  agentsImpacted: { type: Type.ARRAY, items: { type: Type.STRING } },
                  kpiImpact: { type: Type.STRING },
                  recommendedCoaching: { type: Type.STRING },
                  priority: { type: Type.STRING, enum: ["High", "Medium", "Low"] }
                },
                required: ["id", "theme", "agentsImpacted", "kpiImpact", "recommendedCoaching", "priority"]
              }
            },
            insights: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["opportunities", "insights"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    return {
      opportunities: result.opportunities || [],
      insights: result.insights || []
    };
  } catch (error) {
    console.error("Error analyzing transcripts:", error);
    return { opportunities: [], insights: [] };
  }
}
