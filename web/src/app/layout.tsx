import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import WhatsAppFab from "@/components/WhatsAppFab";
import contactData from "../../public/information/contact.json";
import Footer from "@/components/Footer";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["200", "300", "400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: "AirPlus Nepal — Travels & Treks",
  description:
    "Discover Nepal with AirPlus Nepal: curated treks, cultural tours, and unforgettable Himalayan adventures.",
  metadataBase: new URL("https://airplusnepal.com"),
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth" suppressHydrationWarning>
      <body className={`${plusJakarta.variable} antialiased min-h-screen bg-background text-foreground`}>
        <Navbar />
        {children}
        <Footer />
        <WhatsAppFab phone={(contactData as { headOffice?: { whatsapp?: string } }).headOffice?.whatsapp} />
      </body>
    </html>
  );
}
