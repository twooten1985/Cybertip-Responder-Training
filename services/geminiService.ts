
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAdvisorResponse = async (messages: ChatMessage[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      })),
      config: {
        systemInstruction: `You are a Lead Digital Crimes Investigator and Field Training Officer (FTO) specializing in NCMEC Cybertip processing. 
        Your goal is to train law enforcement officers. 
        Context: The training uses a fictional report (Report 145592831) involving a suspect named Samual Vance and a victim named Taylor Quinn.
        Always maintain a professional, authoritative law enforcement tone.
        Focus on:
        1. Legal Procedure (18 U.S.C. § 2258A and 18 U.S.C. § 2703).
        2. Technical Evidence (IP Addresses, UTC conversion, NAT, MD5/SHA1 hashes).
        3. Documentation (How to write specific facts into an affidavit).
        Do not use real-world sensitive data. If the user asks about real people from the PDF screenshot, remind them that for training we only use the fictional identities provided in the tutorial modules.`,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The investigative database is currently offline. Please refer to your Field Manual or contact the ICAC Technical Lead.";
  }
};
