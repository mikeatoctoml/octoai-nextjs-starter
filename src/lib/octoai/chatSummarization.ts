"use server";

import { octoAIClient } from "@/lib/octoaiClient";
import { summarizeChat } from "./summarizeChat";

// Import types for chat state and messages from the chatCompletion module
import type { ChatState, Message } from "./chatCompletion";

/**
 * Handles chat summarization and generates AI responses
 * @param prevState - The previous chat state
 * @param formData - Form data containing the user's prompt
 * @returns A Promise resolving to the updated ChatState
 */
export async function chatSummarization(prevState: ChatState, formData: FormData): Promise<ChatState> {
  // Extract user prompt from form data
  const userPrompt = formData.get("userPrompt") as string;
  if (!userPrompt) {
    throw new Error("User prompt is required");
  }

  let chatSummary = "";

  // Summarize the chat if there's more than one message
  if (prevState.messages.length > 1) {
    const chatSummarization = await summarizeChat(prevState.messages);
    if (!chatSummarization.error) {
      chatSummary = chatSummarization.summary;
    }
  }

  // Add user message to the chat history
  const newMessages = [...prevState.messages, { role: "user", content: userPrompt }];

  // Generate AI response using OctoAI
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

  // Extract the AI response and add it to the chat history
  const responseMessage = chatResponse.choices[0].message.content;
  newMessages.push({ role: "assistant", content: responseMessage as string });

  // Return the updated chat state
  return { messages: newMessages as Message[] };
}
