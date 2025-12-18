
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async summarizeJustification(text: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Summarize the following justification for a height breach in a State Significant Development application. Focus on planning arguments and technical mitigation strategies: \n\n ${text}`,
        config: {
          systemInstruction: "You are an expert Australian urban planner. Provide concise, evidentiary summaries for assessment reports.",
          temperature: 0.2
        }
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Unable to generate summary at this time.";
    }
  }

  async suggestCondition(precedent: string, requirements: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Based on this precedent condition: "${precedent}", draft a new condition for the following requirement: "${requirements}". Adapt the decibel limits and monitoring frequency for a high-density tech hub.`,
        config: {
          systemInstruction: "You are a specialized legal drafter for NSW Conditions of Consent. Ensure wording is enforceable, precise, and follows the NSW Planning standards.",
          temperature: 0.3
        }
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Unable to suggest condition at this time.";
    }
  }

  async draftSecondmentStatement(userProfile: string, auditHighlights: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Draft a one-page EOI secondment statement for a Senior Planner role focusing on AI implementation in SSD. 
        User Profile: ${userProfile}. 
        Key Performance Data: ${auditHighlights}. 
        The role involves: shaping use cases, solution validation, and technology championship. 
        Address the statement to the Executive Director.`,
        config: {
          systemInstruction: "You are a professional career coach for public servants in NSW. Write in a tone that is confident, expert, and aligned with NSW Planning values of transparency and integrity.",
          temperature: 0.7
        }
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Unable to draft statement at this time.";
    }
  }
}

export const geminiService = new GeminiService();
