import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Shell from "@/components/Shell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MRE",
  description: "Minimal Reproducible Example",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="fr" className="h-full bg-white">
        <body className="h-full">{children}</body>
      </html>
    </ClerkProvider>
  );
}
