'use client'

import Link from 'next/link'
import React from 'react'
import { Logo } from "@/components/logo";
import { ArrowLeft } from "lucide-react";


export const ContactHeader = () => {
    const [menuState] = React.useState(false)
    return (
        <header>
            <nav
                data-state={menuState ? 'active' : 'inactive'}
                className="bg-background/50 fixed z-20 w-full border-b backdrop-blur-3xl transition-all duration-300 ease-in-out"
            >
                <div className="mx-auto max-w-6xl px-6">
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
                            <Link
                                href="/"
                                className="mr-2 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-600 dark:text-neutral-400"
                                aria-label="Go back"
                            >
                                <ArrowLeft size={20} />
                            </Link>
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2"
                            >
                                <Logo />
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
