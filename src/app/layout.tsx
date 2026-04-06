import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthContext";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.nakesid.com'),
  title: "Nakes - Jaringan Profesional Kesehatan Indonesia",
  description: "Platform jaringan profesional untuk tenaga kesehatan Indonesia. Temukan kolega, lowongan kerja, dan peluang pengembangan karir.",
  openGraph: {
    title: "Nakes - Jaringan Profesional Kesehatan Indonesia",
    description: "Platform jaringan profesional untuk tenaga kesehatan Indonesia. Temukan kolega, lowongan kerja, dan peluang pengembangan karir.",
    url: "https://www.nakesid.com",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" data-v="2">
      <body className={`${inter.className} bg-gray-50 text-gray-900 min-h-screen`}>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
