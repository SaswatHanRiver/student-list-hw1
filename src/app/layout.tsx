import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { AppHeader } from "@/components/app-header/app-header";
import "@/styles/style.scss";

export const metadata: Metadata = {
  title: "Students | Riverside Academy Admin",
  description: "AI Frontend Training - Homework 1 (Students list)",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// Root layout: wraps every page with the header
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppHeader />
        {children}
      </body>
    </html>
  );
}
