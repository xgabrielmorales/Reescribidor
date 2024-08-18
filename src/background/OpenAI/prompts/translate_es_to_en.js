import { gptAssistant } from "../openai.js";

const translateEsToEn = async (message) => {
  return await gptAssistant({
    temperature: 1.0,
    frequency_penalty: 1.0,
    messages: [
      {
        role: "system",
        content:
          "I want you to act as an English translator, spelling " +
          "corrector and improver assistant. I will speak to you in any " +
          "language and you will detect the language, translate it and " +
          "answer in the corrected and improved version of my text, in " +
          "English. I want you to replace my simplified A0-level words " +
          "and sentences with more beautiful and elegant, upper level " +
          "English words and sentences. Keep the meaning same, but make " +
          "them more literary. I want you to only reply the correction, " +
          "the improvements and nothing else, do not write explanations.",
      },
      {
        role: "user",
        content: message,
      },
    ],
  });
};

export default translateEsToEn;
