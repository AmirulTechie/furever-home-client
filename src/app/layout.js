import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Home/NavBar";
import Footer from "@/components/Shared/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Furever Home",
  description: "Furever Home is a pet adoption website that connects loving families with their perfect furry companions. Our mission is to provide a safe and compassionate platform for pet adoption, making it easier for animals in need to find their forever homes. Whether you're looking to adopt a dog, cat, or other pets, Furever Home is here to help you find your new best friend.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Navbar></Navbar>
        {children}
        <Footer></Footer>
        </body>
    </html>
  );
}
