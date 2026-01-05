import { GoogleGenAI } from "@google/genai";
import { InspectionReport, ChecklistCategory, Question, Answer, Facility, ComplianceStatus } from "../types";
import { CHECKLIST_DATA } from "../constants";

// The API key must be obtained exclusively from the environment variable process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeInspectionReport = async (
  report: InspectionReport,
  facility: Facility,
  language: 'en' | 'ar'
): Promise<string> => {
  // Assume process.env.API_KEY is pre-configured and valid.

  try {
    // Construct a textual representation of the report
    let reportSummary = `Facility: ${facility.nameEn} (${facility.type})\n`;
    reportSummary += `Date: ${new Date(report.date).toLocaleDateString()}\n`;
    reportSummary += `Inspector ID: ${report.inspectorId}\n\nFindings:\n`;

    report.answers.forEach(ans => {
      // Find question text
      let questionText = "Unknown Question";
      let categoryTitle = "";
      
      for(const cat of CHECKLIST_DATA) {
        const q = cat.questions.find(q => q.id === ans.questionId);
        if (q) {
          questionText = q.textEn;
          categoryTitle = cat.titleEn;
          break;
        }
      }

      if (ans.status !== ComplianceStatus.COMPLIANT) {
        reportSummary += `[${categoryTitle}] ${questionText}: ${ans.status.toUpperCase()}`;
        if (ans.note) reportSummary += ` (Note: ${ans.note})`;
        reportSummary += "\n";
      }
    });

    const prompt = `
      Act as a senior medical facility inspector in Egypt enforcing Law 51/1981 and its amendment by Law 153/2004 regarding regulations for non-governmental medical establishments.
      Review the following inspection findings for a ${facility.type}.
      
      Report Data:
      ${reportSummary}

      Task:
      Provide a concise executive summary in ${language === 'ar' ? 'Arabic' : 'English'}.
      1. Highlight critical violations regarding Infection Control, Hazardous Waste, and Administrative Licensing.
      2. Recommend immediate actions (e.g., Warning, Closure, Fine) based on Egyptian MoH regulations.
      3. Identify if the facility lacks essential life-saving equipment (Crash cart, Oxygen).
      
      Format plain text, bullet points.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Could not generate analysis.";

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "Error generating AI analysis. Please check network.";
  }
};