import "@/styles/globals.css";
import { Metadata } from "next";
import clsx from "clsx";

import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/config/site";
import { fontMontserrat } from "@/config/fonts";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="uk">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontMontserrat.variable
        )}
      >
        <div className="flex min-h-screen flex-col overflow-hidden w-full">
          <Header />

          <main className="flex column flex-grow overflow-hidden w-full">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
