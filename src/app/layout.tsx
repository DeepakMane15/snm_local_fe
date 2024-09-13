import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import 'simplebar-react/dist/simplebar.min.css';
import "./css/globals.css";
import { Flowbite, ThemeModeScript } from "flowbite-react";
import customTheme from "@/utils/theme/custom-theme";
import ReactQueryProvider from "@/utils/theme/provider/queryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MaterialM-Nextjs-Free",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <ThemeModeScript />
      </head>
      <body className={`${inter.className}`}>
        <ReactQueryProvider>
          <Flowbite theme={{ theme: customTheme }}>{children}</Flowbite>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
