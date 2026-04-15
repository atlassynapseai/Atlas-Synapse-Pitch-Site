import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/app-providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Atlas Synapse | The HR Department for Your AI",
  description:
    "Monitor, evaluate, and manage your AI agents in plain English. Know when they fail. Know if they're worth it.",
  metadataBase: new URL("https://atlassynapseai.com"),
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "64x64" },
    ],
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    url: "https://atlassynapseai.com",
    title: "Atlas Synapse | The HR Department for Your AI",
    description:
      "Monitor, evaluate, and manage your AI agents in plain English. Know when they fail. Know if they're worth it.",
    siteName: "Atlas Synapse",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Atlas Synapse",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Atlas Synapse | The HR Department for Your AI",
    description:
      "Monitor, evaluate, and manage your AI agents in plain English. Know when they fail. Know if they're worth it.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" sizes="64x64" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className={`${inter.variable} min-h-screen font-sans antialiased`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
