import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CVCraft — International ATS-Friendly CV Builder",
  description:
    "Build a professional, ATS-friendly CV for free. Choose from Academic, Corporate, Tech, or Creative templates. No account required, zero data stored.",
  keywords: "CV builder, resume builder, ATS friendly, free CV, international CV",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
