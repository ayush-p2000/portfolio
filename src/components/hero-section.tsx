"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
// Assuming these components are reasonably optimized internally
import { HeroHeader } from '@/components/hero8-header';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';
import TypingName from '@/components/TypingName';
import TypingIntro from '@/components/TypingIntro';
import { motion } from 'framer-motion';
import { SparklesCore } from "@/components/ui/sparkles";

export default function HeroSection() {
    // Define animation variants for the container and staggered items
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.2, // Delay before children start animating
                staggerChildren: 0.3 // Stagger the animation of direct children
            }
        }
    };

    // Variants for direct children of the containerVariants motion.div
    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
    };

    // Variants specifically for the image motion element
    const imageVariants = {
        hidden: { opacity: 0, scale: 0.9, filter: "blur(10px)" },
        visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 1.2, ease: "easeOut" } } // No delay needed here due to container delayChildren
    };


    return (
        <div className="relative overflow-x-hidden">
            {/* Sparkles background */}
            <div className="w-full absolute inset-0 h-full">
                <SparklesCore
                    id="tsparticlesfullpage"
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={100}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                />
            </div>

            {/* Header */}
            <HeroHeader />

            {/* Main hero content section - Centered Layout */}
            <section className="relative z-10">
                <div className="py-12 md:py-24 lg:py-32">
                    {/* This motion.div is the container for staggered animation */}
                    {/* Its direct children must be motion components with variants */}
                    <motion.div
                        className="relative mx-auto flex max-w-4xl flex-col items-center px-6 text-center" // Centered container
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants} // Apply container variants here
                    >
                        {/* Direct child 1: Motion div for Text Content */}
                        {/* This motion.div uses itemVariants to be staggered */}
                        {/* The content inside is not directly staggered by containerVariants */}
                        <motion.div variants={itemVariants} className="max-w-2xl">
                            {/* Heading with typing name effect */}
                            <h1 className="mt-8 text-balance text-5xl font-medium md:text-6xl lg:mt-16 xl:text-7xl">
                                Hi! I am <br />
                                <TypingName />
                            </h1>

                            {/* Intro text with typing effect */}
                            <TypingIntro />


                            {/* Action buttons */}
                            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                                <Button asChild size="lg" className="px-6 py-3 text-base">
                                    <Link href="/software-engineering">
                                        <span className="text-nowrap">Software Engineering</span>
                                    </Link>
                                </Button>
                                <Button key={2} asChild size="lg" variant="ghost" className="px-6 py-3 text-base">
                                    <Link href="/data-scientist">
                                        <span className="text-nowrap">Data Scientist</span>
                                    </Link>
                                </Button>
                            </div>
                        </motion.div>

                        {/* Direct child 2: Animated hero image motion div */}
                        {/* This motion.div also uses variants (imageVariants) to be staggered */}
                        <motion.div
                            variants={imageVariants} // Apply image variants here
                            className="relative mt-16 w-full max-w-3xl mx-auto" // Positioning and sizing
                        >
                            {/* Next/image component */}
                            <Image
                                className="w-full h-auto object-contain dark:mix-blend-lighten dark:invert-0"
                                src="/hero.png"
                                alt="Abstract Object"
                                width={1000}
                                height={800}
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Tech stack slider section */}
            <section className="bg-background py-16 md:py-24 relative z-10">
                <div className="group relative m-auto max-w-6xl px-6">
                    <div className="flex flex-col items-center md:flex-row">
                        {/* Tech stack heading */}
                        <div className="md:max-w-44 md:border-r md:pr-6 text-center md:text-end mb-6 md:mb-0">
                            <p className="text-sm">Built with the best <br />Tech Stack</p>
                        </div>
                        {/* Infinite slider */}
                        <div className="relative py-6 md:w-[calc(100%-11rem)] w-full">
                            <InfiniteSlider speedOnHover={20} speed={200} gap={112}>
                                {/* Individual tech logos using next/image */}
                                <div className="flex"><Image className="mx-auto h-10 w-fit" src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React Logo" height={40} width={40} /></div>
                                <div className="flex"><Image className="mx-auto h-10 w-fit dark:invert" src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg" alt="Next.js Logo" height={40} width={40} /></div>
                                <div className="flex"><Image className="mx-auto h-10 w-fit dark:invert" src="https://upload.wikimedia.org/wikipedia/commons/c/c2/GitHub_Invertocat_Logo.svg" alt="GitHub Logo" height={40} width={40} /></div>
                                <div className="flex"><Image className="mx-auto h-10 w-fit" src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" alt="Node.js Logo" height={40} width={40} /></div>
                                <div className="flex"><Image className="mx-auto h-10 w-fit" src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" alt="Tailwind CSS Logo" height={40} width={40} /></div>
                                <div className="flex"><Image className="mx-auto h-10 w-fit" src="/ts-logo.png" alt="TypeScript Logo" height={40} width={40} /></div>
                                <div className="flex"><Image className="mx-auto h-10 w-fit dark:invert" src="https://upload.wikimedia.org/wikipedia/commons/0/03/Git_format.png" alt="Git Logo" height={40} width={40} /></div>
                                <div className="flex"><Image className="mx-auto h-10 w-fit dark:invert" src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Vercel_logo_2025.svg" alt="Vercel Logo" height={40} width={40} /></div>
                                <div className="flex"><Image className="mx-auto h-10 w-fit" src="/clnpng.png" alt="CleanPNG Logo" height={40} width={40} /></div>
                                <div className="flex"><Image className="mx-auto h-10 w-fit" src="/pngtree.jpg" alt="PNGTree Logo" height={40} width={40} /></div>
                                <div className="flex"><Image className="mx-auto h-10 w-fit" src="/redux.png" alt="Redux Logo" height={40} width={40} /></div>
                            </InfiniteSlider>

                            {/* Gradient overlays */}
                            <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
                            <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>

                            {/* Progressive blur overlays */}
                            <ProgressiveBlur
                                className="pointer-events-none absolute left-0 top-0 h-full w-20"
                                direction="left"
                                blurIntensity={1}
                            />
                            <ProgressiveBlur
                                className="pointer-events-none absolute right-0 top-0 h-full w-20"
                                direction="right"
                                blurIntensity={1}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}