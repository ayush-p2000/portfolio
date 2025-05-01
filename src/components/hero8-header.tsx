'use client'
import Link from 'next/link'
import { Logo } from './logo'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'
import { ModeToggle } from "@/components/mode-toggle";

const menuItems = [
    { name: 'Contact', href: '/contact' }
]

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)

    const handleMenuItemClick = () => {
        setMenuState(false)
    }

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
                                aria-label="home"
                                className="flex items-center space-x-2"
                            >
                                <Logo />
                            </Link>

                            <ModeToggle />

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
                            >
                                <Menu
                                    className={`m-auto size-6 transition-all duration-300 ease-in-out ${
                                        menuState ? 'rotate-180 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
                                    }`}
                                />
                                <X
                                    className={`absolute inset-0 m-auto size-6 transition-all duration-300 ease-in-out ${
                                        menuState ? 'rotate-0 scale-100 opacity-100' : '-rotate-180 scale-0 opacity-0'
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
                                    <div className="relative rounded-lg bg-background p-6 shadow-lg dark:bg-gray-900 bg-gray-200">
                                        <ul className="space-y-6 text-base">
                                            {menuItems.map((item, index) => (
                                                <li key={index}>
                                                    <Link
                                                        href={item.href}
                                                        onClick={handleMenuItemClick}
                                                        className="text-dark dark:text-muted-foreground hover:text-accent-foreground block transition-colors duration-150"
                                                    >
                                                        <span>{item.name}</span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <div className="hidden lg:block">
                                    <ul className="flex gap-8 text-sm">
                                        {menuItems.map((item, index) => (
                                            <li key={index}>
                                                <Link
                                                    href={item.href}
                                                    className="text-dark dark:text-muted-foreground hover:text-accent-foreground block transition-colors duration-150"
                                                >
                                                    <span>{item.name}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
