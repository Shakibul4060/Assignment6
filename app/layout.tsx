import type { Metadata } from "next";


import "./globals.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ToastProvider from "../components/ToastProvider";
import { AppProvider } from "../context/AppContext";

export const metadata: Metadata = {
  title: "FitLog",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <ToastProvider />

          <Navbar />

          {children}

          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}