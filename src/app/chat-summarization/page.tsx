"use client";
import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { UserPrompt } from "@/components/UserPrompt";
import { chatSummarization } from "@/lib/octoai/chatSummarization";
import { ChatContent } from "@/components/ChatContent";

export default function Home() {
  const [state, formAction] = useFormState(chatSummarization, { messages: [] });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.messages]);

  return (
    <form action={formAction} className="w-full">
      <ChatContent messages={state.messages}>
        <Card>
          <CardHeader>
            <CardTitle>Chat Summarization</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              This file can be found in the <b>app/chat-completion/page.tsx</b>
            </p>
            <p className="mb-4">
              The form submits a form action to
              <b> lib/octoai/chatCompletion.ts,</b>
              which keeps track of previous chat history.
            </p>
            <p>
              Before submitting the new request to OctoAI we also use an additional model to summarize the chat so far
              using
              <b> lib/octoai/summarizeChat.ts</b>
            </p>
          </CardContent>
        </Card>
      </ChatContent>

      <div ref={messagesEndRef} />

      <UserPrompt />
    </form>
  );
}
