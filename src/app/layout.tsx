import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { GlobalThemeProvider } from "@/Providers/GlobalThemeProvider";
import ReactQueryProvider from "@/Providers/ReactQueryProvider";
import { AuthProvider } from "@/Providers/AuthProvider";
import Head from "next/head";



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
  title: "Cinema Manager",
  description: "Online & Offline Cinema ",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  `}
      >
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ReactQueryProvider>
          <GlobalThemeProvider>
            <AuthProvider>

              {children}
            </AuthProvider>

          </GlobalThemeProvider>
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
        </ReactQueryProvider>
      </body>
    </html >
  );
}
