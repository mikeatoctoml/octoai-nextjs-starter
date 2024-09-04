"use client";
import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { ChatInput } from "@/components/ChatInput";
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
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-between py-24 px-4 md:px-8">
      <form action={formAction} className="w-full">
        <ChatContent messages={state.messages}>
          <h2 className="text-3xl font-bold tracking-tight mb-4">Hello!</h2>
          <p className="mb-4">
            This file can be found in the{" "}
            <b>src/app/chat-completion/page.tsx</b>
          </p>
          <p className="mb-4">
            The form submits a form action to
            <b> src/lib/octoai/chatCompletion.ts,</b>
            which keeps track of previous chat history.
          </p>
          <p>
            Before submitting the new request to OctoAI we also use an
            additional model to summarize the chat so far using
            <b> src/lib/octoai/summarizeChat.ts</b>
          </p>
        </ChatContent>

        <div ref={messagesEndRef} />

        <ChatInput />
      </form>
    </main>
  );
}
