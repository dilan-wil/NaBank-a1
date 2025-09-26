import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";
import { Toaster } from "@/components/ui/sonner";
import GoogleMapsProvider from "@/components/google-maps-provider";
import Head from "next/head";

export const metadata: Metadata = {
  title: "NaBank - The Future of Digital Banking",
  description:
    "Experience seamless banking with instant transfers, smart savings, and business solutions designed for the modern world. FDIC insured, bank-grade security.",
  icons: {
    icon: "/NaBank-Icon.png",
    shortcut: "/NaBank-Icon.png",
    apple: "/NaBank-Icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        />
      </Head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <AuthProvider>
          <GoogleMapsProvider>{children}</GoogleMapsProvider>
          <Toaster richColors theme="light" toastOptions={{}} />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
