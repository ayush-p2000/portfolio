'use client'

import React, { useEffect, useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from "next/link"
import {
    motion,
    useAnimationControls,
    AnimatePresence,
    useMotionValue,
    animate
} from 'framer-motion'
import Cursor from '@/components/ui/cursor'
import DataIntro from "@/app/data-scientist/components/data-intro";

// --- Types ---
type MousePosition = {
    x: number;
    y: number;
}

type SkillBadge = {
    name: string;
}

// --- Hooks ---
const useIsTouchDevice = (): boolean => {
    const [isTouch, setIsTouch] = useState<boolean>(false);
    useEffect(() => {
        const check = typeof window !== 'undefined' &&
            ('ontouchstart' in window || navigator.maxTouchPoints > 0);
        setIsTouch(check);
    }, []);
    return isTouch;
};

export default function HeroData() {
    // --- Hooks Setup ---
    const isMobile = useIsTouchDevice();
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [mounted, setMounted] = useState<boolean>(false);
    const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
    const [particles, setParticles] = useState<any[]>([]);
    const [imageParticles, setImageParticles] = useState<any[]>([]);
    const sectionRef = useRef<HTMLElement>(null);

    // Animation Controls
    const titleControls = useAnimationControls();
    const introControls = useAnimationControls();
    const buttonControls = useAnimationControls();
    const imageAppearanceControls = useAnimationControls();
    const backgroundControls = useAnimationControls();
    const scrollIndicatorControls = useAnimationControls();

    // Motion Values
    const imageX = useMotionValue<number>(0);
    const imageY = useMotionValue<number>(0);

    // --- Data ---
    const skills: SkillBadge[] = [
        { name: "Python" },
        { name: "PyTorch" },
        { name: "SQL" },
        { name: "Tableau" },
        { name: "Azure" },
    ];

    // --- Effects ---
    useEffect(() => {
        setMounted(true);

        // Neural Particles
        const newParticles = [...Array(12)].map(() => ({
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            opacity: Math.random() * 0.4 + 0.2,
            scale: Math.random() * 0.6 + 0.2,
            drift: Math.random() * 120 + 60,
            duration: Math.random() * 12 + 18,
            delay: Math.random() * 8
        }));
        setParticles(newParticles);

        const newImageParticles = [...Array(10)].map(() => ({
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            duration: 2.0 + Math.random() * 3,
            delay: Math.random() * 5
        }));
        setImageParticles(newImageParticles);
    }, []);

    useEffect(() => {
        if (isMobile || typeof window === 'undefined') return;

        const handleMouseMove = (e: MouseEvent): void => {
            setMousePosition({
                x: e.clientX / window.innerWidth - 0.5,
                y: e.clientY / window.innerHeight - 0.5
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [isMobile]);

    useEffect(() => {
        setIsVisible(true);
        let floatAnimation: ReturnType<typeof animate> | null = null;

        const sequence = async (): Promise<void> => {
            await backgroundControls.start({ opacity: [0, 1], transition: { duration: 1.2 } });
            await titleControls.start({ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } });
            await introControls.start({ opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } });
            await buttonControls.start({ opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.2 } });
            await imageAppearanceControls.start({
                opacity: 1,
                scale: 1,
                transition: { duration: 0.8, ease: "easeOut" }
            });

            floatAnimation = animate(imageY, [0, -12, 0], {
                duration: 5.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop"
            });

            await scrollIndicatorControls.start({ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3, ease: "easeOut" } });
            scrollIndicatorControls.start({
                opacity: [1, 0.6, 1],
                transition: { repeat: Infinity, duration: 3, ease: "easeInOut" }
            });
        };

        sequence();
        return () => { floatAnimation?.stop(); };
    }, [backgroundControls, titleControls, introControls, buttonControls, imageAppearanceControls, scrollIndicatorControls, imageY]);

    useEffect(() => {
        let xAnimation: ReturnType<typeof animate> | null = null;
        let yAnimation: ReturnType<typeof animate> | null = null;

        if (!isMobile && isVisible) {
            xAnimation = animate(imageX, mousePosition.x * 35, { type: "spring", mass: 0.7, damping: 22 });
            yAnimation = animate(imageY, mousePosition.y * 35, { type: "spring", mass: 0.7, damping: 22 });
        } else {
            xAnimation = animate(imageX, 0, { type: "spring", damping: 15 });
        }

        return () => {
            xAnimation?.stop();
            yAnimation?.stop();
        };
    }, [mousePosition, isVisible, isMobile, imageX, imageY]);

    const handleScroll = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const buttonVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        hover: { scale: 1.05, boxShadow: "0px 4px 15px rgba(16, 185, 129, 0.2)" },
        tap: { scale: 0.95 }
    };

    return (
        <>
            {!isMobile && <Cursor />}
            <section id='home' ref={sectionRef} className="relative w-full min-h-screen overflow-hidden flex flex-col justify-center pt-32 pb-24 scroll-mt-0">
                {/* Background Components */}
                <motion.div className="absolute inset-0 z-[-2] pointer-events-none" initial={{ opacity: 0 }} animate={backgroundControls}>
                    <div className="absolute top-0 left-0 w-full h-full dark:bg-[#040d12] bg-white opacity-60" />
                </motion.div>

                {/* Emerald Particles */}
                {mounted && !isMobile && (
                    <div className="absolute inset-0 z-[-1] opacity-60 pointer-events-none">
                        {particles.map((p, index) => (
                            <motion.div
                                key={index}
                                className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400 dark:bg-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.4)]"
                                initial={{ x: p.x, y: p.y, opacity: p.opacity, scale: p.scale }}
                                animate={{ y: [null, `-${p.drift}px`], opacity: [null, 0] }}
                                transition={{ duration: p.duration, repeat: Infinity, ease: 'linear', delay: p.delay }}
                            />
                        ))}
                    </div>
                )}

                {/* Parallax Mountains */}
                <motion.div
                    className="absolute bottom-0 left-0 right-0 z-[-1] w-full"
                    style={{
                        y: isMobile ? 0 : mousePosition.y * -25,
                        x: isMobile ? 0 : mousePosition.x * -12,
                    }}
                    transition={{ type: "tween", ease: "easeOut", duration: 0.6 }}
                >
                    <div className="w-full h-auto">
                        <Image src="/mountains.png" alt="Mountains background" className="object-cover object-bottom dark:block hidden w-full opacity-40" width={2560} height={1200} priority />
                    </div>
                </motion.div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 min-h-screen flex flex-col">
                    <div className="flex-grow flex flex-col lg:flex-row items-center justify-between gap-12">
                        {/* Left Content */}
                        <section className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
                            <motion.h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-gray-900 dark:text-white leading-[1.1]">
                                <span className="block overflow-hidden pb-4 -mb-4">
                                    {"Data".split('').map((char, charIdx) => (
                                        <motion.span
                                            key={charIdx}
                                            initial={{ y: "100%", opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.8, delay: charIdx * 0.05 + 0.5, ease: [0.215, 0.61, 0.355, 1] }}
                                            className="inline-block"
                                        >
                                            {char === ' ' ? '\u00A0' : char}
                                        </motion.span>
                                    ))}
                                </span>
                                <span className="block text-emerald-600 dark:text-emerald-400 overflow-hidden pb-4 -mb-4">
                                    {"Scientist".split('').map((char, charIdx) => (
                                        <motion.span
                                            key={charIdx}
                                            initial={{ y: "100%", opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.8, delay: (4 + charIdx) * 0.05 + 0.7, ease: [0.215, 0.61, 0.355, 1] }}
                                            className="inline-block"
                                        >
                                            {char === ' ' ? '\u00A0' : char}
                                        </motion.span>
                                    ))}
                                </span>
                            </motion.h1>

                            <motion.div className="w-full mb-8 text-base sm:text-lg text-gray-600 dark:text-gray-200" initial={{ opacity: 0, y: 30 }} animate={introControls}>
                                <DataIntro />
                            </motion.div>

                            <motion.div
                                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full"
                                initial="hidden"
                                animate={buttonControls}
                                variants={{ visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }, hidden: { opacity: 0, y: 30 } }}
                            >
                                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                                    <Button className="w-full sm:w-auto px-8 py-3 text-base font-[Roboto Mono] bg-emerald-600 hover:bg-emerald-700 text-white border-0" onClick={() => handleScroll('projects')}>
                                        View Projects
                                    </Button>
                                </motion.div>
                                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                                    <Button variant="outline" className="w-full sm:w-auto px-8 py-3 text-base font-[Roboto Mono] border-emerald-500/50 hover:bg-emerald-50 text-emerald-700 dark:text-emerald-300 dark:border-emerald-700/50 dark:hover:bg-emerald-950/30" onClick={() => handleScroll('resume')}>
                                        Download Resume
                                    </Button>
                                </motion.div>
                            </motion.div>

                            {/* Tech Badges */}
                            <motion.div className="flex flex-wrap gap-3 mt-10 justify-center lg:justify-start" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 1.8, duration: 0.8 } }}>
                                {skills.map((skill) => (
                                    <motion.div
                                        key={skill.name}
                                        className="px-4 py-2 rounded-full text-sm font-medium bg-emerald-50 text-emerald-700 border border-emerald-100 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-800/50 shadow-sm"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {skill.name}
                                    </motion.div>
                                ))}
                            </motion.div>
                        </section>

                        {/* Right Content */}
                        <motion.section
                            className="w-full lg:w-1/2 mt-8 lg:mt-0 flex items-center justify-center relative"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={imageAppearanceControls}
                            style={{ x: imageX, y: imageY }}
                            whileHover={!isMobile ? { scale: 1.05 } : {}}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="relative h-64 sm:h-80 lg:h-[28rem] w-full">
                                <motion.div className="absolute inset-0">
                                    <Image src="/data-science.png" alt="Data Scientist Illustration" fill className="object-contain drop-shadow-2xl" priority sizes="(max-width: 1024px) 100vw, 50vw" />
                                </motion.div>
                                {/* Emerald Glow */}
                                <motion.div className="absolute -inset-10 rounded-full bg-emerald-400/20 dark:bg-emerald-600/20 blur-2xl z-[-1] pointer-events-none" animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
                                {/* Neural Sparks */}
                                {mounted && !isMobile && (
                                    imageParticles.map((p, i) => (
                                        <motion.div key={i} className="absolute w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 pointer-events-none shadow-[0_0_8px_rgba(16,185,129,0.6)]" initial={{ x: p.x, y: p.y, opacity: 0 }} animate={{ opacity: [0, 0.8, 0], scale: [0, 1.2, 0] }} transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }} />
                                    ))
                                )}
                            </div>
                        </motion.section>
                    </div>

                    {/* Scroll Indicator */}
                    <motion.section className="w-full flex justify-center pb-8 mt-auto pt-6" initial={{ opacity: 0, y: 20 }} animate={scrollIndicatorControls}>
                        <motion.div
                            className="flex flex-col items-center cursor-pointer px-4 py-2 rounded-xl group"
                            onClick={() => handleScroll('resume')}
                            whileHover={{ scale: 1.05 }}
                        >
                            <motion.div className="relative w-10 h-10 sm:w-12 sm:h-12 mb-2" animate={{ y: [0, 10, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
                                <Image src="/scroll-light.png" alt="Scroll" fill className="object-contain dark:hidden opacity-80" />
                                <Image src="/scroll-dark.png" alt="Scroll" fill className="object-contain hidden dark:block opacity-80" />
                                <motion.div className="absolute inset-0 -z-10 rounded-full bg-emerald-400/20 blur-md" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                            </motion.div>
                            <div className="text-lg font-mono text-gray-500 dark:text-gray-200 opacity-60 group-hover:opacity-100 transition-opacity">Scroll Down</div>
                            <div className="flex gap-1.5 mt-2">
                                {[...Array(3)].map((_, i) => (
                                    <motion.div key={i} className="h-1.5 w-1.5 bg-emerald-500 dark:bg-emerald-400 rounded-full" animate={{ scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }} />
                                ))}
                            </div>
                        </motion.div>
                    </motion.section>
                </div>
                {/* Decorative Elements (Desktop Only) */}
                {!isMobile && (
                    <div className="hidden sm:block">
                        <motion.div className="absolute top-24 left-12 w-28 h-28 pointer-events-none opacity-10 dark:opacity-20 text-emerald-500" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: [0, 0.4, 0.2, 0.4], scale: [0.8, 1], rotate: [0, 90] }} transition={{ opacity: { duration: 6, repeat: Infinity, repeatType: "reverse" }, scale: { duration: 1.5, delay: 2 }, rotate: { duration: 45, repeat: Infinity, ease: "linear" } }}>
                            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
                                <circle cx="50" cy="15" r="5" fill="currentColor" />
                                <circle cx="85" cy="50" r="5" fill="currentColor" />
                                <circle cx="50" cy="85" r="5" fill="currentColor" />
                                <circle cx="15" cy="50" r="5" fill="currentColor" />
                                <path d="M50 15 L85 50 L50 85 L15 50 Z" stroke="currentColor" strokeWidth="1" />
                            </svg>
                        </motion.div>
                        <motion.div className="absolute bottom-32 right-12 w-24 h-24 pointer-events-none opacity-10 dark:opacity-20 text-emerald-400" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: [0, 0.3, 0.5, 0.3], scale: [0.9, 1.1], rotate: [0, -45] }} transition={{ opacity: { duration: 8, repeat: Infinity, repeatType: "reverse" }, scale: { duration: 2, delay: 2.5 }, rotate: { duration: 35, repeat: Infinity, ease: "linear" } }}>
                            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="10" y="10" width="80" height="80" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                                <path d="M10 30 H90 M10 50 H90 M10 70 H90 M30 10 V90 M50 10 V90 M70 10 V90" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
                                <circle cx="30" cy="30" r="3" fill="currentColor" />
                                <circle cx="70" cy="70" r="3" fill="currentColor" />
                                <circle cx="50" cy="50" r="5" fill="currentColor" />
                            </svg>
                        </motion.div>
                    </div>
                )}
            </section>
        </>
    );
}
