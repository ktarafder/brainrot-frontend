import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { BrainrotProvider } from "@/context/BrainrotContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Brainrot Scanner",
  description: "Don pollo skibidi amogus temu rizzlord add site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BrainrotProvider>
        {children}
        </BrainrotProvider>
      </body>
    </html>
  );
}
