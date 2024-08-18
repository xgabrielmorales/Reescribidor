import { gptAssistant } from "../openai.js";

const summary = async (message) => {
  return await gptAssistant({
    temperature: 1.0,
    frequency_penalty: 1.0,
    messages: [
      {
        role: "system",
        content:
          "Eres un asistente de resumen de textos. Por favor, resume " +
          "el siguiente texto. El texto resumido debe estar en el " +
          "mismo idioma que el original. Quiero que mantengas la " +
          "misma estructura que el original. Por último, quiero que " +
          "solo me des el texto corregido y nada más.",
      },
      {
        role: "user",
        content: message,
      },
    ],
  });
};

export default summary;
