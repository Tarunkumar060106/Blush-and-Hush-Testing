import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { tanHeadline } from "../../public/fonts";
import { cn } from "@/lib/utils";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blush & Hush",
  description: "Architecture and Interiors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "antialiased",
          tanHeadline.variable,
          playfairDisplay.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
