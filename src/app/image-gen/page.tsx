"use client";

import { UserPrompt } from "@/components/UserPrompt";
import { Badge, Skeleton } from "@/components/ui";
import { CardHeader, Card, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { generateImage } from "@/lib/octoai/generateImage";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Image } from "./Image";

export default function ImageGen() {
  const [state, formAction] = useFormState(generateImage, { image: "" });

  return (
    <form action={formAction}>
      <Image state={state} />
      <UserPrompt />
    </form>
  );
}
