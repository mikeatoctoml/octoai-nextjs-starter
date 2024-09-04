"use client";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import Link from "next/link";

export default function Index() {
  return (
    <main className="container mx-auto py-12 px-4 md:px-8">
      <div className="w-full flex justify-center mb-8">
        <Image src="/octoai.png" width={200} height={100} alt="OctoAI Logo" />
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <Link href="chat-completion">
          <Card>
            <CardHeader>
              <CardTitle>Text Gen</CardTitle>
              <CardDescription>
                Generate text using our open source models
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="image-gen">
          <Card>
            <CardHeader>
              <CardTitle>Image Gen</CardTitle>
              <CardDescription>
                Generate images using our open source models
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </main>
  );
}
