import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast'
import Authprovider from "@/components/Authprovider/Authprovider";
import localFont from "next/font/local";

export const proFont = localFont({
  src: "../../public/fonts/SFpro.ttf",
  variable: "--localFont",
});
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={(proFont.variable)}>
        <Authprovider>
        <Toaster position="top-center" />
        {children}
        </Authprovider>
      </body>
    </html>
  );
}
