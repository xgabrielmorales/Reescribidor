import { gptAssistant } from "../openai.js";

export const spellingAndGrammar = async (message) => {
  return await gptAssistant({
    temperature: 1.0,
    frequency_penalty: 1.0,
    messages: [
      {
        role: "system",
        content:
          "Corrige la ortografía y la gramática del siguiente texto, manteniendo un tono informal y amigable. Asegúrate de que el mensaje se mantenga claro y accesible.",
      },
      {
        role: "user",
        content: message,
      },
    ],
  });
};
