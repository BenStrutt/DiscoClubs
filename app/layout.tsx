import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";

const montserrat = Montserrat({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "DiscoClubs",
  description: "Discover discussion clubs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) { 
  return (
    <html
      lang="en"
      className={cn('h-full antialiased', "font-sans", montserrat.variable)}
    >
      <body>{children}</body>
    </html>
  );
}
