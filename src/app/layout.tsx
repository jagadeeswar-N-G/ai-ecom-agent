import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI E-Commerce Optimization Agent",
  description: "AI-powered e-commerce optimization dashboard for Shopify stores",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-white text-black font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
