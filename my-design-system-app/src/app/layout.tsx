import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Seminar Discover",
  description: "Figma-implemented mobile event discovery experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
