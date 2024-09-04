"use server";

import { octoAIClient } from "@/lib/octoaiClient";
import { summarizeChat } from "./summarizeChat";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface ChatState {
  messages: Message[];
}

export async function chatSummarization(
  prevState: { messages: Message[] },
  formData: FormData
): Promise<ChatState> {
  const userPrompt = formData.get("userPrompt");
  let chatSummary = "";

  if (prevState.messages.length > 1) {
    const chatSummarization = await summarizeChat(prevState.messages);
    if (!chatSummarization.error) {
      chatSummary = chatSummarization.summary;
    }
  }

  // Add user message to the chat history
  const newMessages = [
    ...prevState.messages,
    { role: "user", content: userPrompt },
  ];

  const chatResponse = await octoAIClient.textGen.createChatCompletion({
    model: "meta-llama-3.1-8b-instruct",
    maxTokens: 128,
    messages: [
      {
        role: "system",
        content: `You are a helpful assistant. Here is a summary of the chat so far: ${chatSummary}`,
      },
      {
        role: "user",
        content: JSON.stringify(userPrompt),
      },
    ],
  });

  const responseMessage = chatResponse.choices[0].message.content;
  newMessages.push({ role: "assistant", content: responseMessage });

  return { messages: newMessages };
}
