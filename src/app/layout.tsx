import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import MotionWrapper from "@/components/Wrappers/MotionWrapper";
import { GlobalThemeProvider } from "@/Providers/GlobalThemeProvider";
import ReactQueryProvider from "@/Providers/ReactQueryProvider";



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
  description: "We can Help You to organize Your Cinema ",
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
        <GlobalThemeProvider>
          <ReactQueryProvider>
    
              {children}
      
          </ReactQueryProvider>
        </GlobalThemeProvider>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </body>
    </html>
  );
}
