"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { HeroHeader } from '@/components/hero8-header'; // Assuming this component exists
import { InfiniteSlider } from '@/components/ui/infinite-slider'; // Assuming this component exists
import { ProgressiveBlur } from '@/components/ui/progressive-blur'; // Assuming this component exists
import TypingName from '@/components/TypingName'; // Assuming this component exists
import TypingIntro from '@/components/TypingIntro'; // Assuming this component exists
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ParallaxProvider, useParallax } from 'react-scroll-parallax'; // Using react-scroll-parallax

// Main Hero Section Component
const HeroSection = () => {
    // State to determine if the device is touch-enabled
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    // --- Scroll Parallax for Background ---
    // This effect works by linking element position to scroll position.
    // It should work correctly on touch devices via standard scrolling.
    const { ref: parallaxRef } = useParallax({ speed: -5 }); // Adjust speed as needed

    // --- Cursor Parallax for Foreground Image ---
    // These motion values and transforms will track cursor position
    // and create a subtle parallax effect on the foreground elements.
    // This effect is DISABLED on touch devices in the useEffect below.
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);
    // Map cursor position range (-100 to 100) to element offset range (-15 to 15)
    const xOffset = useTransform(cursorX, [-100, 100], [-15, 15]);
    const yOffset = useTransform(cursorY, [-100, 100], [-15, 15]);

    // --- Effect to Detect Touch Device ---
    // Runs once on mount to check for touch capabilities.
    useEffect(() => {
        // Simple heuristic for touch detection
        const hasTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
        setIsTouchDevice(hasTouch);
    }, []); // Empty dependency array means this runs only once on mount

    // --- Effect for Mousemove Listener ---
    // Adds the mousemove listener ONLY if it's NOT a touch device.
    // Updates cursorX and cursorY MotionValues.
    useEffect(() => {
        // If it's a touch device, don't add the mousemove listener
        if (isTouchDevice) {
            return; // Cleanup (no listener to remove if never added)
        }

        const handleMouseMove = (e: MouseEvent) => {
            // Calculate position relative to the center of the viewport
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            // Update MotionValues based on mouse offset from center
            // Divided by 25 to reduce sensitivity
            cursorX.set((e.clientX - centerX) / 25);
            cursorY.set((e.clientY - centerY) / 25);
        };

        // Add the event listener
        window.addEventListener('mousemove', handleMouseMove);

        // Cleanup function: Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isTouchDevice, cursorX, cursorY]); // Re-run if isTouchDevice or motion values change

    // --- Framer Motion Animation Variants ---
    // Defines how elements will appear
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.2, // Delay before animating children
                staggerChildren: 0.3 // Stagger the animation of children
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
                ease: "easeOut" // Smooth easing
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
                duration: 1.2, // Longer duration for image
                ease: "easeOut"
            }
        }
    };

    // --- Data for Tech Stack Slider ---
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

    // --- Rendered JSX ---
    return (
        <div className="relative overflow-x-hidden min-h-screen bg-gray-200 dark:bg-transparent">
            {/* --- Background Image with Scroll Parallax --- */}
            {/* This fixed element covers the viewport and moves with scroll */}
            <div className="fixed inset-0 -z-10">
                {/* Apply parallax ref here */}
                <div
                    ref={parallaxRef as React.RefObject<HTMLDivElement>}
                    className="hidden dark:block fixed inset-0 h-[150vh]" // Use h-[150vh] or similar to allow for movement
                >
                    <Image
                        src="/hero-bg.jpg"
                        alt="Background"
                        fill
                        className="object-cover"
                        priority
                        quality={80}
                        // Optional: Use hardware acceleration
                        style={{
                            transform: 'translateZ(0)',
                            willChange: 'transform'
                        }}
                    />
                </div>
            </div>

            {/* --- Hero Header (assuming it's a separate component) --- */}
            <HeroHeader />

            {/* --- Main Content Section --- */}
            <section className="relative z-10 py-12 md:py-24 lg:py-32">
                {/* Motion div for animating the main content block */}
                <motion.div
                    className="mx-auto flex max-w-4xl flex-col items-center px-6 text-center"
                    initial="hidden" // Start from hidden state
                    animate="visible" // Animate to visible state
                    variants={containerVariants} // Use defined variants
                >
                    {/* Text Content */}
                    <motion.div variants={itemVariants} className="max-w-2xl">
                        <h1 className="mt-8 text-balance text-5xl font-medium md:text-6xl lg:mt-16 xl:text-7xl">
                            Hi! I am <br />
                            {/* Typing animation for name */}
                            <TypingName />
                        </h1>
                        {/* Typing animation for intro */}
                        <TypingIntro />
                        {/* Action Buttons */}
                        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Button asChild size="lg" className="px-6 py-3 text-base">
                                <Link href="/software-engineering">Software Engineering</Link>
                            </Button>
                            <Button asChild size="lg" variant="ghost" className="px-6 py-3 text-base">
                                <Link href="/data-scientist">Data Scientist</Link>
                            </Button>
                        </div>
                    </motion.div>

                    {/* --- Hero Image with Conditional Cursor Parallax --- */}
                    <div className="relative mt-16 w-full max-w-3xl mx-auto">
                        {/* Purple Backlight with parallax - Hidden in light mode */}
                        {/* Apply framer-motion style ONLY if NOT a touch device */}
                        <motion.div
                            className="absolute inset-0 -z-20 opacity-0 dark:opacity-100 transition-opacity duration-300"
                            style={isTouchDevice ? {} : { // Conditional style application
                                background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.2) 80%, transparent 70%)',
                                filter: 'blur(80px)',
                                x: xOffset, // framer-motion x transform
                                y: yOffset  // framer-motion y transform
                            }}
                        />

                        {/* Hero Image */}
                        {/* Apply framer-motion variants and conditional style */}
                        <motion.div
                            variants={imageVariants} // Entrance animation variants
                            className="relative z-10"
                            style={isTouchDevice ? {} : { // Conditional style application
                                x: xOffset, // framer-motion x transform
                                y: yOffset  // framer-motion y transform
                            }}
                        >
                            <Image
                                className="w-full h-auto object-contain dark:mix-blend-lighten"
                                src="/hero.png"
                                alt="Abstract Object"
                                width={1000} // Provide base width/height for aspect ratio
                                height={800}
                                priority // High priority image
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px" // Optimize image loading
                            />
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* --- Tech Stack Section --- */}
            <section className="bg-gray-200/80 dark:bg-transparent/100 py-16 md:py-24 relative z-10">
                <div className="m-auto max-w-6xl px-6">
                    <div className="flex flex-col items-center md:flex-row">
                        <div className="md:max-w-44 md:border-r md:pr-6 text-center md:text-end mb-6 md:mb-0">
                            <p className="text-sm">Built with the best <br />Tech Stack</p>
                        </div>
                        <div className="relative py-6 md:w-[calc(100%-11rem)] w-full">
                            {/* Infinite auto-scrolling slider */}
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
                            {/* Blurs at the edges of the slider */}
                            <ProgressiveBlur direction="left" blurIntensity={1} />
                            <ProgressiveBlur direction="right" blurIntensity={1} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

// Wrapper to provide ParallaxProvider context
export default function ParallaxHero() {
    return (
        <ParallaxProvider>
            <HeroSection />
        </ParallaxProvider>
    );
}