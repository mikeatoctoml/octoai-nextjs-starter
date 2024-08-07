import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OctoAI NextJS Boilerplate",
  description:
    "Get started quickly using our image gen and text gen endpoints.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          inter.className
        )}
      >
        {children}

        <div className="left-0 right-0 top-0 -z-50 fixed">
          <img
            className="object-fit h-[100vh] w-full bg-universal"
            src="/bg-gradient.png"
            alt=""
          />
        </div>
      </body>
    </html>
  );
}
