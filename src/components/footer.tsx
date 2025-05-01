'use client'

import { motion, Variants } from 'framer-motion'
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react'
import React, { useState } from 'react'


type SocialLink = {
    name: string
    url: string
    icon: React.ReactNode
    hoverColor: string
}

export default function Footer() {
    const [, setActiveLink] = useState<string | null>(null)

    // Animation variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100 }
        },
        hover: {
            y: -3,
            backgroundColor: 'var(--hover-bg)',
            transition: { duration: 0.2 }
        }
    }

    const iconVariants: Variants = {
        hover: {
            scale: 1.2,
            color: 'var(--icon-hover)',
            transition: { type: 'spring', stiffness: 300 }
        }
    }

    const socialLinks: SocialLink[] = [
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/ayush-prajapati-89b22a224',
            icon: <Linkedin className="size-4 sm:size-5 text-gray-700 dark:text-gray-300" />,
            hoverColor: 'rgb(10, 102, 194)'
        },
        {
            name: 'GitHub',
            url: 'https://github.com/ayush-p2000',
            icon: <Github className="size-4 sm:size-5 text-gray-700 dark:text-gray-300" />,
            hoverColor: 'rgb(36, 41, 46)'
        },
        {
            name: 'Email',
            url: `/contact`,
            icon: <Mail className="size-4 sm:size-5 text-gray-700 dark:text-gray-300" />,
            hoverColor: 'rgb(219, 68, 55)'
        },
        {
            name: 'Contact',
            url: `/contact`,
            icon: <Phone className="size-4 sm:size-5 text-gray-700 dark:text-gray-300" />,
            hoverColor: 'rgb(52, 168, 83)'
        },
        {
            name: 'Location',
            url: 'https://www.google.com/maps/place/Sheffield',
            icon: <MapPin className="size-4 sm:size-5 text-gray-700 dark:text-gray-300" />,
            hoverColor: 'rgb(103, 58, 183)'
        }
    ]

    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-6 sm:py-8 px-4 relative overflow-hidden mt-auto">
            {/* Animated background gradient */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `linear-gradient(
            135deg,
            rgba(255, 0, 0, 0.3) 0%,
            rgba(0, 255, 0, 0.3) 50%,
            rgba(0, 0, 255, 0.3) 100%
          )`
                }}
            />

            <div className="max-w-6xl mx-auto">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6 sm:mb-8"
                >
                    {socialLinks.map((link) => (
                        <motion.a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            variants={itemVariants}
                            whileHover="hover"
                            onHoverStart={() => setActiveLink(link.name)}
                            onHoverEnd={() => setActiveLink(null)}
                            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm sm:text-base font-medium text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
                            style={{
                                '--hover-bg': 'rgba(0, 0, 0, 0.05)',
                                '--dark-hover-bg': 'rgba(255, 255, 255, 0.05)',
                                '--icon-hover': link.hoverColor,
                            } as React.CSSProperties}
                        >
                            <motion.span variants={iconVariants}>
                                {link.icon}
                            </motion.span>
                            <span>{link.name}</span>
                        </motion.a>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400"
                >
                    <p>© {new Date().getFullYear()} Ayush Prajapati. All rights reserved.</p>
                    <motion.p
                        className="mt-1"
                        whileHover={{ scale: 1.02 }}
                    >
                        Crafted with care and passion
                    </motion.p>
                </motion.div>
            </div>
        </footer>
    )
}