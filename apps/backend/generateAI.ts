import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
        timeout: 30000,
    },
});

export async function generateResponse(content: string) {
    const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: content,
    });

    return response.text;
}