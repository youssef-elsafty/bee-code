import type { Metadata, Viewport } from "next";
import { Cairo, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/providers/QueryProvider";
import Navbar from "@/components/layout/Navbar";
import PwaMobileHeader from "@/components/layout/PwaMobileHeader";
import MobileBottomBar from "@/components/layout/MobileBottomBar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";

import PwaRegister from "@/components/common/PwaRegister";
import InstallPrompt from "@/components/common/InstallPrompt";
import SplashScreen from "@/components/common/SplashScreen";
import MobileFab from "@/components/common/MobileFab";
import MobileSectionNav from "@/components/layout/MobileSectionNav";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F59E0B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Bee Code | أكاديمية البرمجة للبكالوريا المصرية",
  description:
    "Bee Code — أكاديمية برمجة متميزة لطلاب البكالوريا المصرية (الهندسة وعلوم الحاسب). تأسيس عملي شامل يضمن التفوق والنجاح.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Bee Code",
    startupImage: [
      {
        url: "/apple-touch-icon.png",
        media: "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  keywords: [
    "Bee Code",
    "بكالوريا مصرية",
    "برمجة",
    "بايثون",
    "هندسة",
    "علوم الحاسب",
  ],
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "Bee Code | أكاديمية البرمجة",
    description:
      "تأسيس برمجي شامل لطلاب البكالوريا المصرية. احجز مكانك الآن.",
    type: "website",
    locale: "ar_EG",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-[#0B0D10] text-slate-100 antialiased font-cairo select-none touch-manipulation overflow-x-hidden" suppressHydrationWarning>
        <QueryProvider>
          <SplashScreen />
          <PwaRegister />
          <div className="relative z-10 flex min-h-screen flex-col pb-16 md:pb-0">
            <Navbar />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
            <FloatingWhatsApp />
            <MobileFab />
          </div>
          <MobileBottomBar />
          <Toaster
            position="top-center"
            toastOptions={{
              className: "font-cairo !bg-[#111318] !text-white !border !border-amber-500/20",
              style: {
                background: "#111318",
                color: "#fff",
                border: "1px solid rgba(245,158,11,0.2)",
                fontFamily: "var(--font-cairo)",
              },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}
