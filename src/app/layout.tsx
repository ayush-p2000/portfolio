import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Orbitron } from 'next/font/google';
import { Roboto } from 'next/font/google';
import { Inter } from 'next/font/google';
import Footer from "@/components/footer";
import React from "react";

const inter = Inter({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-inter',
});

const roboto = Roboto({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-roboto',
});

const orbitron = Orbitron({
    subsets: ['latin'],
    weight: ['600'],
    variable: '--font-orbitron',
});

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Ayush Portfolio",
    description: "Portfolio Website made by Ayush Portfolio using NextJS 15, Tailwind CSS v4, React, Typescript, NodeJS",
    icons: {
        icon: 'logo.svg'
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${roboto.variable} ${inter.variable} antialiased min-h-screen flex flex-col`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >

                    <main className="flex-grow">
                        {children}
                    </main>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}