import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../public/globals.css";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PixelPixies Tutor",
  icons: "/favicon.png",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " h-screen"}>
        <Header />
        <main className="h-[calc(100%_-_96px)]">{children}</main>
      </body>
    </html>
  );
}
