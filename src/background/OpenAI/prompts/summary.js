import { gptAssistant } from "../openai.js";

const summary = async (message) => {
  return await gptAssistant({
    temperature: 1.0,
    frequency_penalty: 1.0,
    messages: [
      {
        role: "system",
        content:
          "You are an assistant for summarizing texts. Please summarize the " +
          "following text. The summary must be in the same language as the " +
          "original. I want you to maintain the same structure as the " +
          "original. Finally, I want you to give me only the corrected text " +
          "and nothing more.",
      },
      {
        role: "user",
        content: message,
      },
    ],
  });
};

export default summary;
