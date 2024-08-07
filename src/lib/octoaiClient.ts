import { OctoAIClient } from "@octoai/sdk";
export const octoAIClient = new OctoAIClient({
  apiKey: process.env.OCTOAI_KEY,
});
