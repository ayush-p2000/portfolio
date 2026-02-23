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
                <div className="mx-auto max-w-6xl px-4 md:px-6">
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4 md:px-6">
                        <div className="flex w-full items-center justify-between lg:w-auto lg:gap-12">
                            <div className="flex items-center gap-2 lg:gap-12">
                                <Link
                                    href="/"
                                    className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-600 dark:text-neutral-400"
                                    aria-label="Go back"
                                >
                                    <ArrowLeft size={18} />
                                </Link>
                                <Link
                                    href="/"
                                    aria-label="home"
                                    className="flex items-center"
                                >
                                    <Logo />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
