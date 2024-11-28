
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SessionProviderWrapper from '@/components/SessionProviderWrapper'; 
import Main from "@/components/Main";
import { AnimalsProvider } from "@/components/AnimalContext";

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
  title: "Adote-app",
  description: "Plataforma para adoção de animais na região de Visconde de Mauá.",
  keywords: ["adoção", "animais", "Visconde de Mauá", "pets"],
  
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
//Toda a aplicaçãop está envolvida com suporte a autenticação
  return (
    <html lang="pt-br">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SessionProviderWrapper>
          <AnimalsProvider>
            <Main>
                {children}
            </Main>
          </AnimalsProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
