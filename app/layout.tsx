import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import { absoluteUrl } from "@/utils/url";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { ReactNode } from "react";

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: {
    default: "NoteHub",
    template: "%s | NoteHub",
  },
  description: "Manage your notes with tags, filters and search",
  openGraph: {
    title: "NoteHub",
    description: "Manage your notes with tags, filters and search",
    url: absoluteUrl("/"),
    siteName: "NoteHub",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children, modal, }: { children: ReactNode; modal?: ReactNode; }) {
  return (
    <html lang="en">
      
      <body className={roboto.className}>
        <TanStackProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          {modal}
        </TanStackProvider>
      </body>
    </html>
  );
}