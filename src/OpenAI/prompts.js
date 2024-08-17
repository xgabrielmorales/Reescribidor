import { gptAssistant } from "./openai.js";

export const spellingAndGrammar = async (message) => {
  return await gptAssistant([
    {
      role: "system",
      content:
        "Corrige la ortografía y la gramática del siguiente texto, manteniendo un tono informal y amigable. Asegúrate de que el mensaje se mantenga claro y accesible.",
    },
    {
      role: "user",
      content: message,
    },
  ]);
};
