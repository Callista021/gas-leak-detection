
import { GoogleGenAI } from "@google/genai";

// Fixed: Initializing GoogleGenAI inside the function to ensure the latest API key is used
// and strictly following the required initialization format: new GoogleGenAI({ apiKey: process.env.API_KEY })
export const getSafetyAdvice = async (ppm: number, language: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const prompt = `As a gas safety expert in Nepal, provide 3 brief, actionable safety tips for someone currently measuring a gas level of ${ppm} PPM. 
    The tone should be professional and urgent if needed. Respond in ${language === 'en' ? 'English' : 'Nepali'}.
    Include context specific to Nepal (e.g., mention LPG cylinders, local emergency contacts if PPM is high).
    Return as a simple bulleted list.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "No advice available at the moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Ensure proper ventilation and check your cylinder connections regularly.";
  }
};
