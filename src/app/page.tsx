"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import Link from "next/link";

export default function Index() {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <Link href="chat-completion">
        <Card>
          <CardHeader>
            <CardTitle>Chat Completion</CardTitle>
            <CardDescription>
              Use OctoAI's chat completions API to generate text using our open source models
            </CardDescription>
          </CardHeader>
        </Card>
      </Link>
      <Link href="chat-summarization">
        <Card>
          <CardHeader>
            <CardTitle>Chat Summarization</CardTitle>
            <CardDescription>
              Use this exmaple to summarize a chat transcript and keep the conversation going while reducing the context
              length.
            </CardDescription>
          </CardHeader>
        </Card>
      </Link>
      <Link href="image-gen">
        <Card>
          <CardHeader>
            <CardTitle>Image Gen</CardTitle>
            <CardDescription>
              Create stunning visuals with our cutting-edge AI-powered image generation models
            </CardDescription>
          </CardHeader>
        </Card>
      </Link>
    </div>
  );
}
