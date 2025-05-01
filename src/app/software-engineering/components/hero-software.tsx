'use client'

import React, { useEffect, useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { motion, useAnimationControls, AnimatePresence } from 'framer-motion'
import Cursor from '@/components/ui/cursor'
import Link from "next/link"
import SoftwareIntro from "@/app/software-engineering/components/software-intro";

// Define types for component
type MousePosition = {
    x: number;
    y: number;
}

type SkillBadge = {
    name: string;
    color?: string;
}

const HeroSoftware: React.FC = () => {
    // State management with TypeScript types
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
    const [activeButton, setActiveButton] = useState<number | null>(null)

    // Refs and hooks
    const sectionRef = useRef<HTMLElement>(null)
    // const isInView = useInView(sectionRef, { once: false, threshold: 0.1 })

    // Animation controls
    const titleControls = useAnimationControls()
    const introControls = useAnimationControls()
    const buttonControls = useAnimationControls()
    const imageControls = useAnimationControls()
    const backgroundControls = useAnimationControls()
    const scrollIndicatorControls = useAnimationControls()

    // Skills data
    const skills: SkillBadge[] = [
        { name: "Javascript", color: "blue" },
        { name: "Python", color: "green" },
        { name: "Java", color: "purple" },
        { name: "SQL", color: "red" },
    ]

    // Handle mouse movement for parallax effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent): void => {
            setMousePosition({
                x: e.clientX / window.innerWidth - 0.5,
                y: e.clientY / window.innerHeight - 0.5
            })
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    // Handle animations on initial load
    useEffect(() => {
        setIsVisible(true)

        // Staggered animation sequence
        const sequence = async (): Promise<void> => {
            // First animate the background
            await backgroundControls.start({
                opacity: [0, 1],
                transition: { duration: 1.2 }
            })

            // Then animate the title with a type effect
            await titleControls.start({
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.8,
                    ease: "easeOut"
                }
            })

            // Then animate the intro text
            await introControls.start({
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.6,
                    ease: "easeOut",
                }
            })

            // Then animate the buttons
            await buttonControls.start({
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.5,
                    ease: "easeOut",
                    staggerChildren: 0.2
                }
            })

            // Finally, animate the image
            await imageControls.start({
                opacity: 1,
                scale: 1,
                y: 0,
                transition: {
                    duration: 0.8,
                    ease: "easeOut"
                }
            })

            // Start the floating animation for the image
            imageControls.start({
                y: [0, -20, 0],
                rotateZ: [0, 2, 0, -2, 0],
                transition: {
                    y: {
                        repeat: Infinity,
                        duration: 4,
                        ease: "easeInOut"
                    },
                    rotateZ: {
                        repeat: Infinity,
                        duration: 8,
                        ease: "easeInOut"
                    }
                }
            })

            // Start the scroll indicator animation
            scrollIndicatorControls.start({
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.5,
                    delay: 0.3,
                    ease: "easeOut"
                }
            })

            // Start the pulsing animation for the scroll indicator
            scrollIndicatorControls.start({
                y: [0, 10, 0],
                opacity: [1, 0.7, 1],
                transition: {
                    repeat: Infinity,
                    duration: 2.5,
                    ease: "easeInOut"
                }
            })
        }

        sequence()
    }, [titleControls, introControls, buttonControls, imageControls, backgroundControls, scrollIndicatorControls])

    // Handle parallax effect based on mouse position
    useEffect(() => {
        if (isVisible) {
            // Subtle parallax movement for image
            imageControls.start({
                x: mousePosition.x * 30,
                y: mousePosition.y * 30,
                transition: { type: "spring", mass: 0.6, damping: 20 }
            })
        }
    }, [mousePosition, isVisible, imageControls])

    // Scroll to next section
    const scrollToNextSection = (): void => {
        window.scrollBy({
            top: window.innerHeight - 50,
            behavior: 'smooth'
        })
    }

    // Button hover animations
    const handleButtonHover = (index: number): void => {
        setActiveButton(index)
    }

    const handleButtonLeave = (): void => {
        setActiveButton(null)
    }

    // Animation variants
    const buttonVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        },
        hover: {
            scale: 1.1,
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
            transition: { duration: 0.2 }
        },
        tap: {
            scale: 0.95,
            transition: { duration: 0.1 }
        }
    }

    return (
        <>
            <Cursor />
            <section
                id='home'
                ref={sectionRef}
                className="relative w-full min-h-screen overflow-hidden flex flex-col justify-center"
            >
                {/* Animated Gradient Background */}
                <motion.div
                    className="absolute top-0 left-0 right-0 bottom-0 z-[-2] bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-indigo-900 dark:via-purple-900 dark:to-blue-950 bg-[length:400%_400%] w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                        backgroundPosition: ['0% 0%', '100% 100%'],
                        transition: {
                            backgroundPosition: {
                                duration: 20,
                                repeat: Infinity,
                                repeatType: 'reverse',
                                ease: 'linear'
                            }
                        }
                    }}
                >
                    {/* Gradient orbs for visual interest */}
                    <motion.div
                        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-400/20 dark:bg-blue-500/20 blur-3xl"
                        animate={{
                            x: [0, 50, 0],
                            y: [0, 30, 0],
                            scale: [1, 1.2, 1],
                            opacity: [0.4, 0.7, 0.4],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            ease: 'easeInOut',
                        }}
                    />
                    <motion.div
                        className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-purple-400/20 dark:bg-purple-500/20 blur-3xl"
                        animate={{
                            x: [0, -40, 0],
                            y: [0, 40, 0],
                            scale: [1, 1.3, 1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 18,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            ease: 'easeInOut',
                            delay: 1
                        }}
                    />
                </motion.div>

                {/* Animated Particles */}
                <div className="absolute inset-0 z-[-1] opacity-60 pointer-events-none">
                    {[...Array(15)].map((_, index) => (
                        <motion.div
                            key={index}
                            className="absolute w-2 h-2 rounded-full bg-blue-400 dark:bg-blue-300"
                            initial={{
                                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                                opacity: Math.random() * 0.5 + 0.3,
                                scale: Math.random() * 0.8 + 0.2
                            }}
                            animate={{
                                y: [null, `-${Math.random() * 200 + 100}px`],
                                opacity: [null, 0],
                                transition: {
                                    duration: Math.random() * 8 + 12,
                                    repeat: Infinity,
                                    ease: 'linear',
                                    delay: Math.random() * 5
                                }
                            }}
                        />
                    ))}
                </div>

                {/* Mountains Background with Parallax */}
                <motion.div
                    className="absolute bottom-0 left-0 right-0 z-[-1] w-full"
                    animate={{
                        y: mousePosition.y * -20,
                        x: mousePosition.x * -10,
                        transition: { type: "tween", ease: "easeOut", duration: 0.5 }
                    }}
                >
                    <div className="w-full h-full">
                        <Image
                            src="/mountains.png"
                            alt="Mountains background"
                            className="object-cover object-bottom dark:block hidden w-full"
                            width={2560}
                            height={1200}
                            priority
                            sizes="100vw"
                            style={{
                                width: '100vw',
                                height: 'auto',
                                position: 'relative',
                                left: '50%',
                                transform: 'translateX(-50%)',
                            }}
                        />
                    </div>
                </motion.div>

                <div className="container mx-auto px-4 sm:px-6 md:px-8 pt-24 pb-12 min-h-screen flex flex-col">
                    {/* Main content with responsive layout */}
                    <div className="flex-grow flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
                        {/* Left Content */}
                        <section className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
                            <motion.div
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 sm:mb-6 font-medium font-[Roboto Mono] text-blue-600 dark:text-blue-300"
                                initial={{ opacity: 0, y: 50 }}
                                animate={titleControls}
                                whileHover={{
                                    textShadow: "0px 0px 8px rgba(59, 130, 246, 0.5)",
                                    transition: { duration: 0.2 }
                                }}
                            >
                                <AnimatePresence>
                                    {"Software Engineer".split('').map((char, index) => (
                                        <motion.span
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{
                                                opacity: 1,
                                                y: 0
                                            }}
                                            transition={{
                                                duration: 0.3,
                                                delay: 0.05 * index + 0.5
                                            }}
                                            className="inline-block"
                                        >
                                            {char === ' ' ? '\u00A0' : char}
                                        </motion.span>
                                    ))}
                                </AnimatePresence>
                            </motion.div>

                            <motion.div
                                className="w-full mb-8"
                                initial={{ opacity: 0, y: 30 }}
                                animate={introControls}
                            >
                                <div className="text-base sm:text-lg text-gray-600 dark:text-gray-200">
                                    <SoftwareIntro />
                                </div>
                            </motion.div>

                            <motion.div
                                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full"
                                initial={{ opacity: 0, y: 30 }}
                                animate={buttonControls}
                            >
                                <motion.div
                                    variants={buttonVariants}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    <Button
                                        className="w-full sm:w-auto px-6 py-3 text-base font-[Roboto Mono] relative overflow-hidden group cursor-pointer"
                                        onMouseEnter={() => handleButtonHover(0)}
                                        onMouseLeave={handleButtonLeave}
                                    >
                                        <Link href="#projects" className="scroll-smooth flex items-center justify-center w-full">
                                            View Projects
                                            <motion.span
                                                className="absolute inset-0 bg-white/20 dark:bg-white/10"
                                                initial={{ scale: 0, borderRadius: "100%" }}
                                                animate={activeButton === 0 ? {
                                                    scale: 1.5,
                                                    opacity: 0,
                                                    transition: { duration: 0.6 }
                                                } : { scale: 0 }}
                                            />
                                        </Link>
                                    </Button>
                                </motion.div>

                                <motion.div
                                    variants={buttonVariants}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    <Button
                                        variant="outline"
                                        className="w-full sm:w-auto px-6 py-3 text-base font-[Roboto Mono] relative overflow-hidden group cursor-pointer"
                                        onMouseEnter={() => handleButtonHover(1)}
                                        onMouseLeave={handleButtonLeave}
                                    >
                                        <Link href="#resume" className="scroll-smooth flex items-center justify-center w-full">
                                            Download Resume
                                            <motion.span
                                                className="absolute inset-0 bg-blue-400/20 dark:bg-blue-500/30"
                                                initial={{ scale: 0, borderRadius: "100%" }}
                                                animate={activeButton === 1 ? {
                                                    scale: 1.5,
                                                    opacity: 0,
                                                    transition: { duration: 0.6 }
                                                } : { scale: 0 }}
                                            />
                                        </Link>
                                    </Button>
                                </motion.div>
                            </motion.div>

                            {/* Additional animated badges */}
                            <motion.div
                                className="flex flex-wrap gap-3 mt-8 justify-center lg:justify-start"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                    transition: { delay: 1.8, duration: 0.8 }
                                }}
                            >
                                {skills.map((skill, index) => (
                                    <motion.div
                                        key={skill.name}
                                        className={`
                        px-4 py-2 rounded-full text-sm font-medium
                        bg-gray-100 text-gray-600 border border-gray-200
                        dark:bg-gray-800/80 dark:text-gray-300 dark:border-gray-700
                        transition-colors duration-200
                        hover:bg-blue-100 dark:hover:bg-blue-900
                    `}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                            transition: { delay: 1.8 + index * 0.1, duration: 0.5 }
                                        }}
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        {skill.name}
                                    </motion.div>
                                ))}
                            </motion.div>
                        </section>

                        {/* Right Image */}
                        <motion.section
                            className="w-full lg:w-1/2 mt-8 lg:mt-0 flex items-center justify-center relative"
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={imageControls}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 w-full">
                                {/* Main image with dynamic effects */}
                                <motion.div
                                    className="absolute inset-0"
                                    animate={{
                                        rotateZ: [0, 2, 0, -2, 0],
                                        transition: {
                                            duration: 8,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }
                                    }}
                                >
                                    <Image
                                        src="/software.png"
                                        alt="Software Engineer Illustration"
                                        fill
                                        className="object-contain"
                                        priority
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </motion.div>

                                {/* Circular glow effect */}
                                <motion.div
                                    className="absolute -inset-10 rounded-full bg-blue-400/20 dark:bg-blue-600/20 blur-xl z-[-1]"
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        opacity: [0.5, 0.7, 0.5],
                                        transition: {
                                            duration: 4,
                                            repeat: Infinity,
                                            repeatType: "reverse",
                                            ease: "easeInOut"
                                        }
                                    }}
                                />

                                {/* Data points animation */}
                                {[...Array(12)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-2 h-2 rounded-full bg-blue-500"
                                        initial={{
                                            x: `${Math.random() * 100}%`,
                                            y: `${Math.random() * 100}%`,
                                            opacity: 0
                                        }}
                                        animate={{
                                            opacity: [0, 0.8, 0],
                                            scale: [0, 1, 0],
                                            transition: {
                                                duration: 2 + Math.random() * 2,
                                                repeat: Infinity,
                                                delay: Math.random() * 5
                                            }
                                        }}
                                    />
                                ))}
                            </div>
                        </motion.section>
                    </div>

                    {/* Enhanced Scroll Down Indicator */}
                    <motion.section
                        className="w-full flex justify-center pb-8 mt-auto pt-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={scrollIndicatorControls}
                    >
                        <motion.div
                            className="flex flex-col items-center cursor-pointer px-4 py-2 rounded-xl hover:bg-gray-100/30 dark:hover:bg-gray-800/30 transition-colors"
                            onClick={scrollToNextSection}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.div
                                className="relative w-10 h-10 sm:w-12 sm:h-12 mb-2 opacity-80"
                                animate={{
                                    y: [0, 8, 0],
                                    transition: {
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }
                                }}
                            >
                                <Image
                                    src="/scroll-light.png"
                                    alt="Scroll Down"
                                    fill
                                    className="object-contain dark:hidden"
                                />
                                <Image
                                    src="/scroll-dark.png"
                                    alt="Scroll Down"
                                    fill
                                    className="object-contain hidden dark:block"
                                />

                                {/* Animated circle behind scroll icon */}
                                <motion.div
                                    className="absolute inset-0 -z-10 rounded-full bg-blue-400/20 dark:bg-blue-500/20 blur-md"
                                    animate={{
                                        scale: [1, 1.3, 1],
                                        opacity: [0.6, 0.8, 0.6],
                                        transition: {
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }
                                    }}
                                />
                            </motion.div>

                            <motion.div
                                className="text-lg font-mono text-gray-500 dark:text-gray-100"
                                animate={{
                                    opacity: [0.7, 1, 0.7],
                                    transition: {
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }
                                }}
                            >
                                Scroll Down
                            </motion.div>

                            <motion.div
                                className="flex gap-1 mt-2"
                                animate={{
                                    opacity: [0.3, 1, 0.3],
                                    transition: {
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }
                                }}
                            >
                                {[...Array(3)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="h-1 w-1 bg-red-500 dark:bg-red-400 rounded-full"
                                        animate={{
                                            scale: [1, 1.5, 1],
                                            opacity: [0.7, 1, 0.7],
                                            transition: {
                                                duration: 1.5,
                                                delay: i * 0.2,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }
                                        }}
                                    />
                                ))}
                            </motion.div>
                        </motion.div>
                    </motion.section>
                </div>

                {/* Additional decorative elements */}
                <div className="hidden sm:block">
                    {/* Corner decorations */}
                    <motion.div
                        className="absolute top-20 left-10 w-24 h-24 pointer-events-none opacity-20 dark:opacity-40"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0, 0.2, 0.4, 0.2],
                            scale: [0, 1],
                            rotate: [0, 180],
                            transition: {
                                opacity: { duration: 5, repeat: Infinity, repeatType: "reverse" },
                                scale: { duration: 1, delay: 2 },
                                rotate: { duration: 40, repeat: Infinity, ease: "linear" }
                            }
                        }}
                    >
                        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" />
                            <path d="M50 10 L50 90" stroke="currentColor" strokeWidth="2" />
                            <path d="M10 50 L90 50" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </motion.div>

                    <motion.div
                        className="absolute bottom-20 right-10 w-20 h-20 pointer-events-none opacity-20 dark:opacity-40"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0, 0.2, 0.4, 0.2],
                            scale: [0, 1],
                            rotate: [0, -180],
                            transition: {
                                opacity: { duration: 5, repeat: Infinity, repeatType: "reverse" },
                                scale: { duration: 1, delay: 2.5 },
                                rotate: { duration: 40, repeat: Infinity, ease: "linear" }
                            }
                        }}
                    >
                        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="20" y="20" width="60" height="60" stroke="currentColor" strokeWidth="2" />
                            <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </motion.div>
                </div>
            </section>
        </>
    );
}

export default HeroSoftware;