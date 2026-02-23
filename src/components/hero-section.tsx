"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { HeroHeader } from '@/components/hero8-header';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';

import { SparklesCore } from "@/components/ui/sparkles";
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ParallaxProvider } from 'react-scroll-parallax';
import { useTheme } from 'next-themes';
import { FiCode, FiDatabase } from 'react-icons/fi';

// --- Tech Stack Data ---
const techLogos = [
    { src: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg", alt: "React Logo" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg", alt: "Next.js Logo", invert: true },
    { src: "https://upload.wikimedia.org/wikipedia/commons/c/c2/GitHub_Invertocat_Logo.svg", alt: "GitHub Logo", invert: true },
    { src: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg", alt: "Node.js Logo" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg", alt: "Tailwind CSS Logo" },
    { src: "/ts-logo.png", alt: "TypeScript Logo" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/0/03/Git_format.png", alt: "Git Logo", invert: true },
    { src: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Vercel_logo_2025.svg", alt: "Vercel Logo", invert: true },
    { src: "/clnpng.png", alt: "CleanPNG Logo" },
    { src: "/pngtree.jpg", alt: "PNGTree Logo" },
    { src: "/shadcn.png", alt: "Shadcn Logo", invert: true },
    { src: "/redux.png", alt: "Redux Logo" }
];

const HeroSection = () => {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // --- 3D Tilt & Mouse Tracking Logic ---
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring physics for fluid movement
    const mouseX = useSpring(x, { stiffness: 50, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 50, damping: 15 });

    // Calculate rotation based on mouse position
    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

    // Calculate spotlight effect position
    const spotlightX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
    const spotlightY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

    const backgroundGradient = useTransform(
        [spotlightX, spotlightY],
        ([sx, sy]) => `radial-gradient(600px circle at ${sx} ${sy}, rgba(124, 58, 237, 0.15), transparent 40%)`
    );

    useEffect(() => {
        const checkTouch = () => {
            setIsTouchDevice(typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0));
        };
        checkTouch();
        window.addEventListener('resize', checkTouch);
        return () => window.removeEventListener('resize', checkTouch);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isTouchDevice) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;

        x.set(mouseXFromCenter / width);
        y.set(mouseYFromCenter / height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div id="home" className="relative w-full min-h-screen overflow-x-hidden bg-white dark:bg-neutral-950 text-gray-900 dark:text-white selection:bg-cyan-500/30 transition-colors duration-300">
            {/* --- Background Particles --- */}
            <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none">
                {mounted && (
                    <SparklesCore
                        id="tsparticles"
                        background="transparent"
                        minSize={0.6}
                        maxSize={1.4}
                        particleDensity={100}
                        className="w-full h-full"
                        particleColor={theme === 'dark' ? "#FFFFFF" : "#000000"}
                    />
                )}
            </div>

            {/* --- Ambient Gradient Background --- */}
            <div className="fixed inset-0 -z-20 bg-[radial-gradient(circle_at_50%_50%,_rgba(124,58,237,0.05),_rgba(255,255,255,1))] dark:bg-[radial-gradient(circle_at_50%_50%,_rgba(76,29,149,0.1),_rgba(15,23,42,0))]" />

            <HeroHeader />

            <section
                className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] pt-24 pb-12 md:py-20 perspective-1000"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {/* --- 3D Glass Card Container --- */}
                <motion.div
                    style={{
                        rotateX: isTouchDevice ? 0 : rotateX,
                        rotateY: isTouchDevice ? 0 : rotateY,
                        transformStyle: "preserve-3d",
                    }}
                    className="relative w-[90%] max-w-6xl mx-auto p-8 rounded-3xl bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/10 shadow-2xl backdrop-blur-sm transition-transform duration-200"
                >
                    {/* Spotlight Effect Overlay */}
                    {!isTouchDevice && (
                        <motion.div
                            className="absolute inset-0 rounded-3xl z-0 pointer-events-none opacity-50"
                            style={{
                                background: backgroundGradient
                            }}
                        />
                    )}

                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-start items-center gap-12 lg:gap-20 lg:pt-8">
                        {/* --- Left Content: Text --- */}
                        <motion.div
                            className="flex-1 text-center lg:text-left space-y-8"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-gray-700 to-gray-500 dark:from-white dark:via-gray-200 dark:to-gray-500">
                                Hi! I am <br />
                                <motion.div
                                    className="mt-2 min-h-[5rem] md:min-h-[6rem] h-auto leading-none"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                                >
                                    <span className="inline-block font-mono font-extrabold text-5xl sm:text-5xl md:text-5xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 dark:from-violet-400 dark:via-fuchsia-400 dark:to-cyan-400 pr-2">
                                        Ayush Prajapati
                                    </span>
                                </motion.div>
                            </h1>

                            <motion.div
                                className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                            >
                                <p>
                                    I'm an AI-Driven Software Engineer passionate about building intelligent, scalable systems. I blend full-stack expertise with data science to solve complex, real-world problems. Explore my work and let's build the future together!
                                </p>
                            </motion.div>

                            <motion.div
                                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1.0 }}
                            >
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white border-0 shadow-lg shadow-violet-500/25 transition-all hover:scale-105"
                                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                                >
                                    Explore My Work
                                </Button>
                                <Button
                                    asChild
                                    size="lg"
                                    variant="outline"
                                    className="border-gray-300 dark:border-white/20 bg-white/50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-white backdrop-blur-md transition-all hover:scale-105"
                                >
                                    <Link href="/contact">Get in Touch</Link>
                                </Button>
                            </motion.div>

                            {/* --- Specialized Portfolio Links --- */}
                            <motion.div
                                className="flex flex-col gap-4 pt-8 border-t border-gray-200 dark:border-white/10 mt-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1.2 }}
                            >
                                <div className="flex flex-col items-center lg:items-start gap-3">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 ml-1">
                                        Explore Deep Dives
                                    </span>
                                    <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                            <Button
                                                asChild
                                                variant="outline"
                                                className="h-11 border-gray-200 dark:border-white/10 bg-white/30 dark:bg-white/5 hover:bg-violet-500/10 dark:hover:bg-violet-500/20 text-gray-700 dark:text-gray-300 backdrop-blur-md transition-all group px-5 rounded-xl border-dashed hover:border-solid hover:border-violet-500/50 shadow-sm hover:shadow-violet-500/20"
                                            >
                                                <Link href="/software-engineering" className="flex items-center gap-2">
                                                    <FiCode className="text-violet-500 dark:text-violet-400 group-hover:scale-110 transition-transform" />
                                                    <span className="text-sm font-semibold">Software Engineering</span>
                                                </Link>
                                            </Button>
                                        </motion.div>
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                            <Button
                                                asChild
                                                variant="outline"
                                                className="h-11 border-gray-200 dark:border-white/10 bg-white/30 dark:bg-white/5 hover:bg-cyan-500/10 dark:hover:bg-cyan-500/20 text-gray-700 dark:text-gray-300 backdrop-blur-md transition-all group px-5 rounded-xl border-dashed hover:border-solid hover:border-cyan-500/50 shadow-sm hover:shadow-cyan-500/20"
                                            >
                                                <Link href="/data-scientist" className="flex items-center gap-2">
                                                    <FiDatabase className="text-cyan-500 dark:text-cyan-400 group-hover:scale-110 transition-transform" />
                                                    <span className="text-sm font-semibold">Data Scientist</span>
                                                </Link>
                                            </Button>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* --- Right Content: Image --- */}
                        <motion.div
                            className="flex-1 w-full max-w-lg lg:max-w-xl relative group"
                            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            style={{ transformStyle: "preserve-3d", transform: "translateZ(50px)" }}
                        >
                            {/* Glowing backdrop behind image */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/30 via-purple-500/30 to-pink-500/30 blur-[60px] rounded-full opacity-60 animate-pulse-slow" />

                            <div className="relative transform transition-transform duration-500 hover:scale-105">
                                <Image
                                    src="/hero.png"
                                    alt="Hero Illustration"
                                    width={800}
                                    height={800}
                                    className="w-full h-auto drop-shadow-2xl"
                                    priority
                                />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* --- Tech Stack Marquee --- */}
            <section className="relative z-10 border-t border-gray-200 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-lg py-12">
                <div className="max-w-7xl mx-auto px-6 flex flex-col items-center md:flex-row gap-8">
                    <div className="md:w-48 text-center md:text-right font-medium text-gray-600 dark:text-gray-400">
                        <p>Powering Next-Gen<br />Experiences with</p>
                    </div>
                    <div className="flex-1 w-full relative overflow-hidden mask-linear-gradient">
                        <InfiniteSlider speedOnHover={20} speed={40} gap={60}>
                            {techLogos.map((logo, index) => (
                                <div key={index} className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 hover:scale-110 dark:invert-0">
                                    <Image
                                        className={`h-10 w-auto object-contain ${logo.invert ? 'dark:invert invert-0' : ''}`}
                                        src={logo.src}
                                        alt={logo.alt}
                                        height={40}
                                        width={100}
                                    />
                                </div>
                            ))}
                        </InfiniteSlider>
                        {/* Fade edges */}
                        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white via-white/80 dark:from-black dark:via-black/80 to-transparent z-10" />
                        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white via-white/80 dark:from-black dark:via-black/80 to-transparent z-10" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default function ParallaxHero() {
    return (
        <ParallaxProvider>
            <HeroSection />
        </ParallaxProvider>
    );
}