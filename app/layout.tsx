import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from './providers';
import { Toaster } from "@/components/ui/toaster";
import MobileWarning from '@/components/mobile-warning';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BlockCMD Inspect",
  description: "Interactive frontend for onchain contracts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <main className="flex flex-col gap-8 items-center justify-center py-12 px-4 lg:p-36">
            <div className="hidden lg:flex lg:flex-col lg:gap-12 max-w-5xl">
              {children}
              <Toaster />
            </div>
            <MobileWarning />
          </main>
        </Providers>
      </body>
    </html>
  );
}