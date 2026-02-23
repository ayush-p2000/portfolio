'use client'

import React, { useEffect, useState, useRef } from 'react'
import { Button } from '@/components/ui/button' // Assuming Button component exists
import Image from 'next/image'
import Link from "next/link"
import {
    motion,
    useAnimationControls,
    AnimatePresence,
    useMotionValue, // <-- Import hook for motion values
    animate        // <-- Import animation function
} from 'framer-motion'
import Cursor from '@/components/ui/cursor' // Assuming Cursor component exists
import SoftwareIntro from "@/app/software-engineering/components/software-intro"; // Assuming SoftwareIntro exists

// --- Types ---
type MousePosition = {
    x: number;
    y: number;
}

type SkillBadge = {
    name: string;
}

type Particle = {
    x: number;
    y: number;
    opacity: number;
    scale: number;
    drift: number;
    duration: number;
    delay: number;
};

type ImageParticle = {
    x: string | number;
    y: string | number;
    duration: number;
    delay: number;
};

// --- Hooks ---

// Simple hook to check for touch device
const useIsTouchDevice = (): boolean => {
    const [isTouch, setIsTouch] = useState<boolean>(false);
    useEffect(() => {
        // Check runs once on client-side mount
        const check = typeof window !== 'undefined' &&
            ('ontouchstart' in window || navigator.maxTouchPoints > 0);
        setIsTouch(check);
    }, []);
    return isTouch;
};

// --- Component ---
const HeroSoftware: React.FC = () => {
    // --- Hooks Setup ---
    const isMobile = useIsTouchDevice();
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [mounted, setMounted] = useState<boolean>(false);
    const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
    const [particles, setParticles] = useState<Particle[]>([]);
    const [imageParticles, setImageParticles] = useState<ImageParticle[]>([]);
    const sectionRef = useRef<HTMLElement>(null);

    // Animation Controls (for non-transform or sequenced animations)
    const titleControls = useAnimationControls();
    const introControls = useAnimationControls();
    const buttonControls = useAnimationControls();
    const imageAppearanceControls = useAnimationControls(); // For opacity/scale
    const backgroundControls = useAnimationControls();
    const scrollIndicatorControls = useAnimationControls();

    // Motion Values (for direct style manipulation, especially transforms)
    const imageX = useMotionValue<number>(0);
    const imageY = useMotionValue<number>(0);

    // --- Data ---
    const skills: SkillBadge[] = [
        { name: "Javascript" },
        { name: "Python" },
        { name: "Java" },
        { name: "SQL" },
    ];

    // --- Effects ---

    useEffect(() => {
        setMounted(true);

        // Pre-calculate particles to avoid Math.random() in render phase
        const newParticles = [...Array(10)].map(() => ({
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            opacity: Math.random() * 0.4 + 0.2,
            scale: Math.random() * 0.6 + 0.2,
            drift: Math.random() * 150 + 80,
            duration: Math.random() * 10 + 15,
            delay: Math.random() * 7
        }));
        setParticles(newParticles);

        const newImageParticles = [...Array(8)].map(() => ({
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            duration: 2.5 + Math.random() * 2.5,
            delay: Math.random() * 6
        }));
        setImageParticles(newImageParticles);
    }, []);

    // Effect for Mouse Movement Listener (Desktop only)
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

    // Effect for Initial Animation Sequence
    useEffect(() => {
        setIsVisible(true);
        let floatAnimation: ReturnType<typeof animate> | null = null;

        const sequence = async (): Promise<void> => {
            // 1. Background fade-in
            await backgroundControls.start({ opacity: [0, 1], transition: { duration: 1.2 } });

            // 2. Title animation
            await titleControls.start({ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } });

            // 3. Intro text animation
            await introControls.start({ opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } });

            // 4. Buttons animation
            await buttonControls.start({ opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.2 } });

            // 5. Image appearance animation (opacity, scale)
            await imageAppearanceControls.start({
                opacity: 1,
                scale: 1,
                transition: { duration: 0.8, ease: "easeOut" }
            });

            // 6. Start Image Floating Animation (on Y motion value)
            // Animate imageY between 0 and -10 infinitely
            floatAnimation = animate(imageY, [0, -10, 0], {
                duration: 5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop" // Loop ensures smooth transition
            });

            // 7. Scroll Indicator animation
            await scrollIndicatorControls.start({ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3, ease: "easeOut" } });

            // 8. Start Scroll Indicator Pulsing (ongoing)
            scrollIndicatorControls.start({
                opacity: [1, 0.7, 1],
                transition: { repeat: Infinity, duration: 2.5, ease: "easeInOut" }
            });
        };

        sequence();

        // Cleanup function: Stop the float animation when component unmounts or deps change
        return () => {
            floatAnimation?.stop();
        };

    }, [ // Dependencies for the sequence effect
        backgroundControls, titleControls, introControls, buttonControls,
        imageAppearanceControls, scrollIndicatorControls, imageY // imageY included as it's animated here
    ]);

    // Effect for Parallax (Desktop only)
    useEffect(() => {
        let xAnimation: ReturnType<typeof animate> | null = null;
        let yAnimation: ReturnType<typeof animate> | null = null;

        if (!isMobile && isVisible) {
            // Animate imageX based on mouse position
            xAnimation = animate(imageX, mousePosition.x * 30, {
                type: "spring", mass: 0.6, damping: 20
            });

            // Animate imageY based on mouse position (adds vertical parallax)
            // NOTE: This combines with the float animation. If it looks jittery, remove this Y animation.
            yAnimation = animate(imageY, mousePosition.y * 30, {
                type: "spring", mass: 0.6, damping: 20
            });

        } else {
            // Reset X position smoothly if mobile or not visible
            xAnimation = animate(imageX, 0, { type: "spring", damping: 15 });
            // Optional: Reset Y spring if vertical parallax was enabled and caused drift
            // yAnimation = animate(imageY, 0, { type: "spring", damping: 15 });
        }

        // Cleanup function: Stop animations started by this effect instance
        return () => {
            xAnimation?.stop();
            yAnimation?.stop();
        };

    }, [mousePosition, isVisible, isMobile, imageX, imageY]); // Dependencies for parallax effect


    // --- Helper Functions ---
    const handleScroll = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const scrollToNextSection = (): void => {
        handleScroll('resume');
    };

    // --- Animation Variants ---
    const buttonVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        hover: { scale: 1.05, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)" },
        tap: { scale: 0.95 }
    };

    // Disable hover effect for mobile
    const mobileButtonVariants = {
        ...buttonVariants,
        hover: {} // Override hover state to do nothing
    };

    // --- JSX ---
    return (
        <>
            {/* Conditionally render custom cursor for non-touch devices */}
            {!isMobile && <Cursor />}

            <section
                id='home'
                ref={sectionRef}
                className="relative w-full min-h-screen overflow-hidden flex flex-col justify-center scroll-mt-0 pt-32 pb-24"
            >
                {/* 1. Background Elements */}
                {/* Animated Gradient */}
                <motion.div
                    className="absolute inset-0 z-[-2] pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={backgroundControls}
                >
                    {/* Atmospheric orbs */}
                    <div className="absolute top-0 left-0 w-full h-full dark:bg-[#020617] bg-white opacity-50" />
                </motion.div>

                {/* Particles (Desktop Only & Reduced) */}
                {mounted && !isMobile && (
                    <div className="absolute inset-0 z-[-1] opacity-50 pointer-events-none">
                        {particles.map((p, index) => (
                            <motion.div
                                key={index}
                                className="absolute w-1.5 h-1.5 rounded-full bg-blue-400 dark:bg-blue-300"
                                initial={{ x: p.x, y: p.y, opacity: p.opacity, scale: p.scale }}
                                animate={{ y: [null, `-${p.drift}px`], opacity: [null, 0] }}
                                transition={{ duration: p.duration, repeat: Infinity, ease: 'linear', delay: p.delay }}
                            />
                        ))}
                    </div>
                )}

                {/* Mountains Background (Conditional Parallax) */}
                <motion.div
                    className="absolute bottom-0 left-0 right-0 z-[-1] w-full"
                    style={{ // Directly use mousePosition for mountains parallax (simpler than separate motionValue)
                        y: isMobile ? 0 : mousePosition.y * -20,
                        x: isMobile ? 0 : mousePosition.x * -10,
                    }}
                    transition={{ type: "tween", ease: "easeOut", duration: 0.5 }} // Smooth transition
                >
                    <div className="w-full h-auto">
                        <Image src="/mountains.png" alt="Mountains background" className="object-cover object-bottom dark:block hidden w-full max-w-none" width={2560} height={1200} priority sizes="100vw" style={{ width: '100%', height: 'auto' }} />
                        {/* Consider adding a light mode image if needed */}
                    </div>
                </motion.div>

                {/* 2. Main Content Area */}
                <div className="container mx-auto px-4 sm:px-6 md:px-8 pt-24 pb-12 min-h-screen flex flex-col">
                    <div className="flex-grow flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">

                        {/* 2a. Left Content Block */}
                        <section className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
                            {/* CLEAN HERO TITLE */}
                            <motion.h1
                                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-gray-900 dark:text-white leading-[1.1]"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <span className="block overflow-hidden pb-4 -mb-4">
                                    {"Software".split('').map((char, charIdx) => (
                                        <motion.span
                                            key={charIdx}
                                            initial={{ y: "100%", opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{
                                                duration: 0.8,
                                                delay: charIdx * 0.05 + 0.5,
                                                ease: [0.215, 0.61, 0.355, 1]
                                            }}
                                            className="inline-block"
                                        >
                                            {char === ' ' ? '\u00A0' : char}
                                        </motion.span>
                                    ))}
                                </span>
                                <span className="block text-blue-600 dark:text-blue-400 overflow-hidden pb-4 -mb-4">
                                    {"Engineer".split('').map((char, charIdx) => (
                                        <motion.span
                                            key={charIdx}
                                            initial={{ y: "100%", opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{
                                                duration: 0.8,
                                                delay: (8 + charIdx) * 0.05 + 0.8,
                                                ease: [0.215, 0.61, 0.355, 1]
                                            }}
                                            className="inline-block"
                                        >
                                            {char === ' ' ? '\u00A0' : char}
                                        </motion.span>
                                    ))}
                                </span>
                            </motion.h1>

                            {/* Intro Text */}
                            <motion.div
                                className="w-full mb-8 text-base sm:text-lg text-gray-600 dark:text-gray-200"
                                initial={{ opacity: 0, y: 30 }}
                                animate={introControls}
                            >
                                <SoftwareIntro />
                            </motion.div>

                            {/* Buttons */}
                            <motion.div
                                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full"
                                initial="hidden" // Use variants for initial state here
                                animate={buttonControls} // Controls orchestration if needed, or just 'visible'
                                variants={{ visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }, hidden: { opacity: 0, y: 30 } }}
                            >
                                <motion.div variants={isMobile ? mobileButtonVariants : buttonVariants} whileHover="hover" whileTap="tap">
                                    <Button
                                        className="w-full sm:w-auto px-6 py-3 text-base font-[Roboto Mono]"
                                        onClick={() => handleScroll('projects')}
                                    >
                                        View Projects
                                    </Button>
                                </motion.div>
                                <motion.div variants={isMobile ? mobileButtonVariants : buttonVariants} whileHover="hover" whileTap="tap">
                                    <Button
                                        variant="outline"
                                        className="w-full sm:w-auto px-6 py-3 text-base font-[Roboto Mono]"
                                        onClick={() => handleScroll('resume')}
                                    >
                                        Download Resume
                                    </Button>
                                </motion.div>
                            </motion.div>

                            {/* Skill Badges */}
                            <motion.div
                                className="flex flex-wrap gap-3 mt-8 justify-center lg:justify-start"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { delay: 1.8, duration: 0.8, staggerChildren: 0.05 } }}
                            >
                                {skills.map((skill) => (
                                    <motion.div
                                        key={skill.name}
                                        className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-600 border border-gray-200 dark:bg-gray-800/80 dark:text-gray-300 dark:border-gray-700 transition-colors duration-200 active:bg-blue-100 dark:active:bg-blue-900"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        whileHover={!isMobile ? { scale: 1.1 } : {}}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ duration: 0.3 }} // Add transition for hover/tap
                                    >
                                        {skill.name}
                                    </motion.div>
                                ))}
                            </motion.div>
                        </section>

                        {/* 2b. Right Image Block */}
                        <motion.section
                            className="w-full lg:w-1/2 mt-8 lg:mt-0 flex items-center justify-center relative"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={imageAppearanceControls} // Controls opacity/scale
                            style={{ x: imageX, y: imageY }} // Apply motion values for position
                            whileHover={!isMobile ? { scale: 1.05 } : {}}
                            transition={{ duration: 0.3 }} // Add transition for hover scale
                        >
                            <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 w-full">
                                {/* Image Container */}
                                <motion.div className="absolute inset-0">
                                    <Image src="/software.png" alt="Software Engineer Illustration" fill className="object-contain" priority sizes="(max-width: 1024px) 100vw, 50vw" />
                                </motion.div>
                                {/* Glow Effect */}
                                <motion.div className="absolute -inset-10 rounded-full bg-blue-400/20 dark:bg-blue-600/20 blur-xl z-[-1] pointer-events-none" animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.6, 0.4] }} transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }} />
                                {/* Data Points (Desktop Only & Reduced) */}
                                {mounted && !isMobile && (
                                    imageParticles.map((p, i) => (
                                        <motion.div key={i} className="absolute w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 pointer-events-none" initial={{ x: p.x, y: p.y, opacity: 0 }} animate={{ opacity: [0, 0.7, 0], scale: [0, 1, 0] }} transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }} />
                                    ))
                                )}
                            </div>
                        </motion.section>
                    </div>

                    {/* 3. Scroll Down Indicator */}
                    <motion.section
                        className="w-full flex justify-center pb-8 mt-auto pt-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={scrollIndicatorControls} // Controls appearance + ongoing opacity pulse
                    >
                        <motion.div
                            className="flex flex-col items-center cursor-pointer px-4 py-2 rounded-xl hover:bg-gray-100/30 dark:hover:bg-gray-800/30 transition-colors"
                            onClick={scrollToNextSection}
                            whileHover={!isMobile ? { scale: 1.05 } : {}}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* Icon + Bobbing Animation */}
                            <motion.div className="relative w-10 h-10 sm:w-12 sm:h-12 mb-2 opacity-80" animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
                                <Image src="/scroll-light.png" alt="Scroll Down" fill className="object-contain dark:hidden" />
                                <Image src="/scroll-dark.png" alt="Scroll Down" fill className="object-contain hidden dark:block" />
                                {/* Icon Glow */}
                                <motion.div className="absolute inset-0 -z-10 rounded-full bg-blue-400/20 dark:bg-blue-500/20 blur-md" animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.8, 0.6] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
                            </motion.div>
                            {/* Text */}
                            <motion.div className="text-lg font-mono text-gray-500 dark:text-gray-100"> Scroll Down </motion.div>
                            {/* Dots */}
                            <motion.div className="flex gap-1 mt-2">
                                {[...Array(3)].map((_, i) => (<motion.div key={i} className="h-1 w-1 bg-red-500 dark:bg-red-400 rounded-full" animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }} />))}
                            </motion.div>
                        </motion.div>
                    </motion.section>
                </div>

                {/* 4. Decorative Elements (Desktop Only) */}
                {!isMobile && (
                    <div className="hidden sm:block">
                        <motion.div className="absolute top-20 left-10 w-24 h-24 pointer-events-none opacity-20 dark:opacity-40" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: [0, 0.2, 0.4, 0.2], scale: [0, 1], rotate: [0, 180] }} transition={{ opacity: { duration: 5, repeat: Infinity, repeatType: "reverse" }, scale: { duration: 1, delay: 2 }, rotate: { duration: 40, repeat: Infinity, ease: "linear" } }}>
                            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" /><path d="M50 10 L50 90" stroke="currentColor" strokeWidth="2" /><path d="M10 50 L90 50" stroke="currentColor" strokeWidth="2" /></svg>
                        </motion.div>
                        <motion.div className="absolute bottom-20 right-10 w-20 h-20 pointer-events-none opacity-20 dark:opacity-40" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: [0, 0.2, 0.4, 0.2], scale: [0, 1], rotate: [0, -180] }} transition={{ opacity: { duration: 5, repeat: Infinity, repeatType: "reverse" }, scale: { duration: 1, delay: 2.5 }, rotate: { duration: 40, repeat: Infinity, ease: "linear" } }}>
                            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="20" width="60" height="60" stroke="currentColor" strokeWidth="2" /><circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="2" /></svg>
                        </motion.div>
                    </div>
                )}
            </section>
        </>
    );
}

export default HeroSoftware;