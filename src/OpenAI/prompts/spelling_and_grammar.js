import { gptAssistant } from "../openai.js";

export const spellingAndGrammar = async (message) => {
  return await gptAssistant({
    temperature: 1.0,
    frequency_penalty: 1.0,
    messages: [
      {
        role: "system",
        content:
          "Eres un asistente de corrección de textos. Por favor, corrige el siguiente texto. Asegúrate de corregir la ortografía y la gramática, y también aborda cualquier problema de coherencia y cohesión. El texto corregido debe estar en el mismo idioma que el original. Quiero que solo me des el texto corregido y nada más.",
      },
      {
        role: "user",
        content: message,
      },
    ],
  });
};
