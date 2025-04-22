'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { motion, useAnimationControls } from 'framer-motion'
import Cursor from '@/components/ui/cursor'
import DataIntro from "@/app/data-scientist/components/data-intro";
import Link from "next/link";

export default function HeroData() {
    const [isVisible, setIsVisible] = useState(false);
    const controls = useAnimationControls();
    const imageControls = useAnimationControls();
    const scrollImageControls = useAnimationControls();
    const scrollTextControls = useAnimationControls();

    useEffect(() => {
        setIsVisible(true);

        controls.start({
            opacity: 1,
            y: 0,
            transition: { duration: 0.8 },
        });

        imageControls
            .start({
                opacity: [0, 1],
                x: [100, 0],
                y: [0, 0],
                transition: { duration: 0.8, delay: 0.5 },
            })
            .then(() => {
                imageControls.start({
                    y: [0, -15, 0],
                    transition: {
                        repeat: Infinity,
                        repeatType: 'reverse',
                        duration: 3,
                        ease: 'easeInOut',
                    },
                });
            });

        scrollImageControls
            .start({
                x: [200, 0],
                opacity: [0, 1],
                transition: {
                    duration: 0.8,
                    ease: 'easeOut',
                },
            })
            .then(() => {
                scrollImageControls.start({
                    y: [0, 15, 0],
                    transition: {
                        repeat: Infinity,
                        duration: 2,
                        ease: 'easeInOut',
                    },
                });
            });

        const textDelay = 1.0;
        scrollTextControls
            .start({
                opacity: [0, 1],
                y: [20, 0],
                transition: {
                    duration: 0.5,
                    delay: textDelay,
                    ease: 'easeOut',
                },
            })
            .then(() => {
                scrollTextControls.start({
                    opacity: [1, 0.4, 1],
                    y: [0, 5, 0],
                    transition: {
                        repeat: Infinity,
                        duration: 2.5,
                        ease: 'easeInOut',
                        times: [0, 0.5, 1],
                    },
                });
            });
    }, [controls, imageControls, scrollImageControls, scrollTextControls]);

    const scrollText = 'Scroll Down';

    return (
        <>
            <Cursor />
            <section id='home' className="relative w-full min-h-screen overflow-hidden">
                {/* Animated Gradient Background */}
                <div className="absolute top-0 left-0 right-0 bottom-0 z-[-2] bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 dark:from-indigo-800 dark:via-purple-900 dark:to-blue-900 bg-[length:400%_400%] w-full h-full" />

                {/* Mountains Background - Full Width and Full Height */}
                <div className="absolute bottom-0 left-0 right-0 z-[-1] w-full">
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
                </div>

                <div className="container mx-auto px-6 pt-24 pb-12 min-h-screen flex flex-col">
                    {/* Responsive layout using Tailwind classes */}
                    <div className="flex-grow flex flex-col md:flex-row items-center justify-between gap-8">
                        {/* Left Content */}
                        <section className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={controls}
                                className="w-full"
                            >
                                <div className="text-6xl md:text-5xl lg:text-7xl mb-6 font-medium font-[Roboto Mono] text-blue-600 dark:text-blue-300">
                                    Data Scientist
                                </div>

                                <div className="mb-8">
                                    <div className="text-base md:text-lg text-gray-600 dark:text-gray-200">
                                        <DataIntro />
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                    <Button className="px-6 py-3 text-base font-[Roboto Mono]">
                                        <Link href="#projects" className="scroll-smooth">
                                            View Projects
                                        </Link>
                                    </Button>
                                    <Button variant="outline" className="px-6 py-3 text-base font-[Roboto Mono]">
                                        <Link href="#resume" className="scroll-smooth">
                                            Download Resume
                                        </Link>
                                    </Button>
                                </div>
                            </motion.div>
                        </section>

                        {/* Right Image */}
                        <motion.section
                            className="w-full md:w-1/2 mt-8 md:mt-0 flex items-center justify-center"
                            initial={{ opacity: 0, x: 100 }}
                            animate={imageControls}
                        >
                            <motion.div
                                className="relative h-64 md:h-80 lg:h-96 w-full"
                                animate={{ y: [0, -30, 0] }}
                                transition={{
                                    repeat: Infinity,
                                    repeatType: 'reverse',
                                    duration: 3,
                                    ease: 'easeInOut',
                                    delay: 1.3,
                                }}
                            >
                                <Image
                                    src="/data-science.png"
                                    alt="Data Science Illustration"
                                    fill
                                    className="object-contain"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </motion.div>
                        </motion.section>
                    </div>

                    {/* Scroll Down Indicator */}
                    <section className="w-full flex justify-center pb-8 mt-auto pt-6">
                        <div
                            className="flex flex-col items-center cursor-pointer px-4 py-2"
                            onClick={() =>
                                window.scrollBy({ top: window.innerHeight - 100, behavior: 'smooth' })
                            }
                        >
                            <motion.div
                                className="relative w-12 h-12 mb-3 opacity-80"
                                initial={{ x: 200, opacity: 0 }}
                                animate={scrollImageControls}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
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
                            </motion.div>

                            <motion.div
                                className="flex overflow-hidden text-lg font-mono text-gray-500 dark:text-gray-400"
                                animate={{
                                    opacity: [1, 0.5, 1],
                                    y: [0, -15, 0],
                                }}
                                transition={{
                                    opacity: {
                                        duration: 2,
                                        ease: 'easeInOut',
                                        repeat: Infinity,
                                        repeatType: 'reverse',
                                    },
                                    y: {
                                        duration: 4,
                                        ease: 'easeInOut',
                                        repeat: Infinity,
                                        repeatType: 'reverse',
                                    },
                                }}
                                style={{ marginBottom: '10px', marginTop: '15px' }}
                            >
                                {scrollText.split('').map((char, index) => (
                                    <span key={index} className={char === ' ' ? 'w-2' : ''}>
                                        {char}
                                    </span>
                                ))}
                            </motion.div>

                            <motion.div
                                className="h-1 w-8 bg-red-500 dark:bg-red-400 rounded-full mt-2"
                                initial={{ opacity: 0, scaleX: 0 }}
                                animate={{
                                    opacity: [0, 0.7, 0],
                                    scaleX: [0.3, 1, 0.3],
                                }}
                                transition={{
                                    delay: 1.5,
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatType: 'reverse',
                                    ease: 'easeInOut',
                                }}
                            />
                        </div>
                    </section>
                </div>
            </section>
        </>
    );
}