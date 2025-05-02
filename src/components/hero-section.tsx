"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { HeroHeader } from '@/components/hero8-header';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';
import TypingName from '@/components/TypingName';
import TypingIntro from '@/components/TypingIntro';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ParallaxProvider, useParallax } from 'react-scroll-parallax';

const HeroSection = () => {
    // Scroll parallax for background
    const { ref: parallaxRef } = useParallax({ speed: -20 });

    // Cursor parallax effects
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);
    const xOffset = useTransform(cursorX, [-100, 100], [-15, 15]);
    const yOffset = useTransform(cursorY, [-100, 100], [-15, 15]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            cursorX.set((e.clientX - centerX) / 25); // Reduced sensitivity
            cursorY.set((e.clientY - centerY) / 25);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [cursorX, cursorY]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: "easeOut"
            }
        }
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.9, filter: "blur(10px)" },
        visible: {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            transition: {
                duration: 1.2,
                ease: "easeOut"
            }
        }
    };

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

    return (
        <div className="relative overflow-x-hidden min-h-screen bg-gray-200 dark:bg-transparent">
            {/* Background with scroll parallax */}
            <div className="fixed inset-0 -z-10">
                <div
                    ref={parallaxRef as React.RefObject<HTMLDivElement>}
                    className="hidden dark:block fixed inset-0 h-[150vh]"
                >
                    <Image
                        src="/hero-bg.jpg"
                        alt="Background"
                        fill
                        className="object-cover"
                        priority
                        quality={80}
                        style={{
                            transform: 'translateZ(0)',
                            willChange: 'transform'
                        }}
                    />
                </div>
            </div>

            <HeroHeader />

            <section className="relative z-10 py-12 md:py-24 lg:py-32">
                <motion.div
                    className="mx-auto flex max-w-4xl flex-col items-center px-6 text-center"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.div variants={itemVariants} className="max-w-2xl">
                        <h1 className="mt-8 text-balance text-5xl font-medium md:text-6xl lg:mt-16 xl:text-7xl">
                            Hi! I am <br />
                            <TypingName />
                        </h1>
                        <TypingIntro />
                        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Button asChild size="lg" className="px-6 py-3 text-base">
                                <Link href="/software-engineering">Software Engineering</Link>
                            </Button>
                            <Button asChild size="lg" variant="ghost" className="px-6 py-3 text-base">
                                <Link href="/data-scientist">Data Scientist</Link>
                            </Button>
                        </div>
                    </motion.div>

                    {/* Hero Image with Cursor Parallax */}
                    <div className="relative mt-16 w-full max-w-3xl mx-auto">
                        {/* Purple Backlight with parallax - Hidden in light mode */}
                        <motion.div
                            className="absolute inset-0 -z-20 opacity-0 dark:opacity-100 transition-opacity duration-300"
                            style={{
                                background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.2) 80%, transparent 70%)',
                                filter: 'blur(80px)',
                                x: xOffset,
                                y: yOffset
                            }}
                        />

                        {/* Hero Image with parallax */}
                        <motion.div
                            variants={imageVariants}
                            className="relative z-10"
                            style={{
                                x: xOffset,
                                y: yOffset
                            }}
                        >
                            <Image
                                className="w-full h-auto object-contain dark:mix-blend-lighten"
                                src="/hero.png"
                                alt="Abstract Object"
                                width={1000}
                                height={800}
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                            />
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Tech Stack Section */}
            <section className="bg-gray-200/80 dark:bg-transparent/100 py-16 md:py-24 relative z-10">
                <div className="m-auto max-w-6xl px-6">
                    <div className="flex flex-col items-center md:flex-row">
                        <div className="md:max-w-44 md:border-r md:pr-6 text-center md:text-end mb-6 md:mb-0">
                            <p className="text-sm">Built with the best <br />Tech Stack</p>
                        </div>
                        <div className="relative py-6 md:w-[calc(100%-11rem)] w-full">
                            <InfiniteSlider speedOnHover={20} speed={200} gap={112}>
                                {techLogos.map((logo, index) => (
                                    <div key={index} className="flex">
                                        <Image
                                            className={`mx-auto h-10 w-fit bg-transparent ${logo.invert ? 'dark:invert' : ''}`}
                                            src={logo.src}
                                            alt={logo.alt}
                                            height={40}
                                            width={40}
                                        />
                                    </div>
                                ))}
                            </InfiniteSlider>
                            <ProgressiveBlur direction="left" blurIntensity={1} />
                            <ProgressiveBlur direction="right" blurIntensity={1} />
                        </div>
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