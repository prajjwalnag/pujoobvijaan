import type { Metadata } from "next";
import { Geist, Geist_Mono, Abril_Fatface } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider, THEME_INIT_SCRIPT } from "@/components/ThemeProvider";
import { PointsProvider } from "@/components/PointsProvider";
import { PointsToast } from "@/components/PointsToast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const abrilFatface = Abril_Fatface({
  variable: "--font-abril-fatface",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pujo Obhijaan",
  description: "Plan, explore, and navigate Kolkata's Durga Puja pandals",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${abrilFatface.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
        <ThemeProvider>
          <PointsProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <PointsToast />
          </PointsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
