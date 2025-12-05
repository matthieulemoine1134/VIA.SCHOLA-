import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Tu es l'assistant virtuel intelligent de "Via Schola", une agence de soutien scolaire basée à Narbonne.
Ton rôle est de rassurer les parents, d'expliquer les services et le fonctionnement du crédit d'impôt.

Informations clés à connaître :
- Localisation : Narbonne (Aude).
- Services : Soutien scolaire hebdomadaire, stages vacances, préparation aux examens (Bac, Brevet).
- Avantage fiscal : Avance immédiate du crédit d'impôt (les parents ne paient que 50% tout de suite).
- B2B : Partenariat Hexa Coop pour les professionnels.
- Approche : "Phygital" (Humain + Digital), proximité, bienveillance.

Règles de réponse :
- Sois bref, chaleureux et professionnel.
- Mets en avant l'ancrage local à Narbonne.
- Si on te demande des tarifs précis, invite l'utilisateur à demander un devis ou un bilan gratuit.
- Ne mentionne pas de concurrents.
`;

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return "Je suis désolé, je ne suis pas connecté pour le moment (Clé API manquante).";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Using a simpler model for quick chat interactions
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        maxOutputTokens: 150, 
      },
    });

    return response.text || "Désolé, je n'ai pas pu générer de réponse.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Une erreur est survenue lors de la communication avec le conseiller virtuel.";
  }
};