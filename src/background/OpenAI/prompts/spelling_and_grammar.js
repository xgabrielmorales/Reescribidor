import { gptAssistant } from "../openai.js";

const spellingAndGrammar = async (message) => {
  return await gptAssistant({
    temperature: 1.0,
    frequency_penalty: 1.0,
    messages: [
      {
        role: "system",
        content:
          "You are a text correction assistant. Please correct the following " +
          "text. Make sure to address spelling and grammar, and also tackle " +
          "any issues of coherence and cohesion. The corrected text should " +
          "be in the same language as the original. I want you to give me " +
          "only the corrected text and nothing more.",
      },
      {
        role: "user",
        content: message,
      },
    ],
  });
};

export default spellingAndGrammar;
