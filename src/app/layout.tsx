import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OctoAI NextJS Boilerplate",
  description: "Get started quickly using our image gen and text gen endpoints.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn("min-h-screen bg-background antialiased", inter.className)}>
        <main className="container mx-auto flex min-h-screen flex-col items-center gap-12 pt-12 px-4 md:px-8">
          <Link href="/" target="">
            <Image src="/octoai.png" width={200} height={100} alt="OctoAI Logo" />
          </Link>
          {children}
        </main>
      </body>
    </html>
  );
}
