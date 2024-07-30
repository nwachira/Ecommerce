"use client";

import { Inter, Dosis, Lusitana } from "next/font/google";
import "./ui/globals.css";
import Navbar from "./ui/navbar/page";
import Footer from "./ui/footer/page";


import { useState } from "react";
import { StoreProvider } from "./lib/Store";

const inter = Inter({ subsets: ["latin"] });
const dosis = Dosis({ subsets: ["latin"] });
const lusitana = Lusitana({ subsets: ["latin"], weight: ["400", "700"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  const handleOrderPopup = () => {
    // Your order popup logic here
    console.log("Order popup triggered!"); // Example: Log a message
  };

  return (
    <html lang="en">
      <body className={inter.className}>
       <StoreProvider>
        <Navbar   />
        {children}
        <Footer />
        </StoreProvider>
       
      </body>
    </html>
  );
}
