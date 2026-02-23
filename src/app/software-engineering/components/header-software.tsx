
'use client'

import { SmoothScrollLink } from '@/components/smooth-scroll-link';
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Menu, X, ArrowLeft } from 'lucide-react'
import React, { useState } from 'react'
import { ModeToggle } from "@/components/mode-toggle";
import { useActiveSection } from '@/hooks/use-active-section';
import { motion } from 'framer-motion';

const menuItems = [
    { name: 'Home', href: '#home', section: 'home' },
    { name: 'Resume', href: '#resume', section: 'resume' },
    { name: 'Experience', href: '#experience', section: 'experience' },
    { name: 'Projects', href: '#projects', section: 'projects' },
    { name: 'Contact', href: '/contact', section: 'contact' }
]

export const SoftwareHeader = () => {
    const [menuState, setMenuState] = useState(false)
    const { activeSection, manualSetActive } = useActiveSection(menuItems.map(item => item.section));

    const handleMenuItemClick = (section: string) => {
        manualSetActive(section)
        setMenuState(false)
    }

    return (
        <header>
            <nav
                data-state={menuState ? 'active' : 'inactive'}
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out"
            >
                <div className="mx-auto max-w-6xl px-6 py-4">
                    <div className="relative flex items-center justify-between gap-6 px-6 py-3 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-2xl rounded-2xl border border-white/20 dark:border-neutral-800/50 shadow-2xl">
                        <div className="flex items-center gap-12">
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

                            <ModeToggle />

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer rounded-full p-2.5 transition-colors hover:bg-foreground/10 lg:hidden"
                            >
                                <Menu
                                    className={`m-auto size-6 transition-all duration-300 ease-in-out ${menuState ? 'rotate-180 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
                                        }`}
                                />
                                <X
                                    className={`absolute inset-0 m-auto size-6 transition-all duration-300 ease-in-out ${menuState ? 'rotate-0 scale-100 opacity-100' : '-rotate-180 scale-0 opacity-0'
                                        }`}
                                />
                            </button>
                        </div>

                        {/* Mobile menu with RGB highlight */}
                        <div
                            className={`fixed left-0 right-0 top-[calc(100%-1px)] z-10 mb-6 w-full flex-wrap items-center justify-end
                space-y-8 p-6 transition-all duration-700 ease-in-out
                md:flex-nowrap lg:static lg:m-0 lg:flex lg:w-fit
                lg:gap-6 lg:space-y-0 lg:p-0
                ${menuState
                                    ? 'scale-100 rotate-0 opacity-100'
                                    : 'scale-0 rotate-45 opacity-0 origin-bottom-right lg:scale-100 lg:rotate-0 lg:opacity-100'
                                }
              `}
                        >
                            <div className="lg:hidden">
                                <div className="relative">
                                    {/* RGB Border Effect */}
                                    <div className="absolute -inset-1 rounded-lg runningRGB opacity-75 blur"></div>
                                    {/* Menu Container */}
                                    <div className="relative rounded-lg bg-background p-6 shadow-lg">
                                        <ul className="space-y-6 text-base">
                                            {menuItems.map((item) => (
                                                <li key={item.section}>
                                                    <SmoothScrollLink
                                                        href={item.href}
                                                        onClick={() => handleMenuItemClick(item.section)}
                                                        className={`block transition-all duration-300 ${activeSection === item.section
                                                            ? 'text-accent-foreground font-medium scale-105'
                                                            : 'text-muted-foreground hover:text-foreground'
                                                            }`}
                                                    >
                                                        <span className="relative">
                                                            {item.name}
                                                            {activeSection === item.section && (
                                                                <motion.span
                                                                    layoutId="software-active-mobile"
                                                                    className="absolute left-0 bottom-0 h-0.5 w-full bg-accent rounded-full"
                                                                ></motion.span>
                                                            )}
                                                        </span>
                                                    </SmoothScrollLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <div className="hidden lg:block">
                                    <ul className="flex gap-8 text-sm">
                                        {menuItems.map((item) => (
                                            <li key={item.section}>
                                                <SmoothScrollLink
                                                    href={item.href}
                                                    onClick={() => handleMenuItemClick(item.section)}
                                                    className={`relative px-1 py-2 transition-all duration-300 ${activeSection === item.section
                                                        ? 'text-accent-foreground font-medium'
                                                        : 'text-muted-foreground hover:text-foreground'
                                                        }`}
                                                >
                                                    <span>
                                                        {item.name}
                                                        {activeSection === item.section && (
                                                            <motion.span
                                                                layoutId="software-active-desktop"
                                                                className="absolute left-0 bottom-0 h-0.5 w-full bg-accent rounded-full"
                                                            ></motion.span>
                                                        )}
                                                    </span>
                                                </SmoothScrollLink>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Add some styles for the active state */}
            <style jsx global>{`

                @keyframes runningRGB {
                    0% {
                        background-position: 0 50%;
                    }
                    100% {
                        background-position: 100% 50%;
                    }
                }
            `}</style>
        </header>
    )
}