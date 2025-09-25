import "./globals.css";
import { AppLayout } from "@/components/layout/app-layout";

// export const metadata: Metadata = {
//   title: "NaBank - The Future of Digital Banking",
//   description:
//     "Experience seamless banking with instant transfers, smart savings, and business solutions designed for the modern world. FDIC insured, bank-grade security.",
//   icons: {
//     icon: "/NaBank-Icon.png",
//     shortcut: "/NaBank-Icon.png",
//     apple: "/NaBank-Icon.png",
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppLayout>{children}</AppLayout>;
}
