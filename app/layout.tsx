import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AppWrapper } from "@/components/providers/app-wrapper";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  title: "Genevid",
  description: "Générateur d'images et de vidéos basé sur Nano Banana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body className={`${poppins.className} h-full antialiased bg-[#131314] text-[#e3e3e3]`}>
        <AppWrapper>
          {children}
        </AppWrapper>
      </body>
    </html>
  );
}