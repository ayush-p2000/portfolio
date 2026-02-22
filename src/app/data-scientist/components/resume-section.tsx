'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Button, MotionButton } from '@/components/ui/button'
import Image from 'next/image'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useAnimation, useInView } from 'framer-motion'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import Link from "next/link";

// Configure PDF.js worker path
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

const techItems = [
    {
        title: "Machine Learning & AI",
        description: "Building predictive models and intelligent systems",
        color: "bg-emerald-500 dark:bg-emerald-400",
        icon: "🧠"
    },
    {
        title: "Data Analysis & Visualization",
        description: "Transforming raw data into actionable insights",
        color: "bg-teal-500 dark:bg-teal-400",
        icon: "📊"
    },
    {
        title: "Big Data Technologies",
        description: "Handling large-scale datasets efficiently",
        color: "bg-indigo-500 dark:bg-indigo-400",
        icon: "💾"
    },
    {
        title: "Cloud Computing",
        description: "Deploying scalable solutions on cloud platforms",
        color: "bg-amber-500 dark:bg-amber-400",
        icon: "☁️"
    }
]

function useHasMouse() {
    const [hasMouse, setHasMouse] = useState(false);
    useEffect(() => {
        const mediaQuery = window.matchMedia("(pointer: fine)");
        setHasMouse(mediaQuery.matches);
        const handler = (e: MediaQueryListEvent) => setHasMouse(e.matches);
        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);
    return hasMouse;
}

export default function ResumeSection() {
    const [numPages, setNumPages] = useState<number | null>(null)
    const [pageNumber, setPageNumber] = useState(1)
    const [containerWidth, setContainerWidth] = useState(600)
    const [aspectRatio, setAspectRatio] = useState<number | null>(null)
    const [isHoveringPdf, setIsHoveringPdf] = useState(false)
    const [scale, setScale] = useState(1.0)
    const sectionRef = useRef<HTMLElement>(null)
    const pdfContainerRef = useRef<HTMLDivElement>(null)
    const controls = useAnimation()
    const isInView = useInView(sectionRef, { once: false, margin: "-100px" })
    const hasMouse = useHasMouse();

    useEffect(() => {
        if (isInView) {
            controls.start("visible")
        }
    }, [isInView, controls])

    const onDocumentLoadSuccess = useCallback(async ({ numPages }: { numPages: number }) => {
        setNumPages(numPages)
        try {
            const pdf = await pdfjs.getDocument("/Software_Ayush (2).pdf").promise
            const page = await pdf.getPage(1)
            const viewport = page.getViewport({ scale: 1 })
            setAspectRatio(viewport.height / viewport.width)
        } catch (error) {
            console.error("Error loading PDF or getting aspect ratio:", error);
        }
    }, []);

    const updateContainerWidth = useCallback(() => {
        if (sectionRef.current) {
            const availableWidth = sectionRef.current.offsetWidth * (window.innerWidth < 768 ? 0.95 : 0.45);
            setContainerWidth(Math.min(availableWidth, 600));
        }
    }, []);

    useEffect(() => {
        updateContainerWidth();
        window.addEventListener('resize', updateContainerWidth);
        return () => window.removeEventListener('resize', updateContainerWidth);
    }, [updateContainerWidth]);

    const calculatedHeight = aspectRatio ? containerWidth * aspectRatio : 'auto';
    const maxHeight = '80vh';
    const pdfStyle = {
        width: `${containerWidth}px`,
        maxHeight: maxHeight,
        height: calculatedHeight > maxHeight && calculatedHeight !== 'auto' ? maxHeight : calculatedHeight,
    };

    return (
        <section id="resume" ref={sectionRef} className="relative w-full min-h-screen flex flex-col justify-center pt-20 pb-32">
            {/* Background Layer - subtle and atmospheric */}
            <div className="absolute inset-0 z-[-1] opacity-50 dark:opacity-30">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-100/10 to-transparent dark:via-emerald-900/10" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-[-1] w-full">
                <div className="w-full h-full">
                    <Image
                        src="/stars.png"
                        alt="Stars background"
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
                            opacity: 0.3,
                        }}
                    />
                </div>
            </div>

            <div className="container mx-auto px-6 pt-24 pb-12 min-h-screen flex flex-col">
                <div className="flex-grow flex flex-col md:flex-row items-center justify-between gap-12">
                    {/* Left Content */}
                    <motion.section
                        className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="w-full">
                            <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-neutral-900 dark:text-white mb-8 tracking-tighter">
                                My <span className="text-emerald-600 dark:text-emerald-400 italic">Resume</span>
                            </h2>

                            <motion.div
                                className="mb-12"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                                    <p className="mb-8 text-2xl font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                                        Professional Expertise
                                    </p>

                                    <div className="grid gap-5 mt-8">
                                        {techItems.map((item, i) => (
                                            <PremiumExpertiseItem
                                                key={i}
                                                {...item}
                                                index={i}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                            >
                                <Button
                                    size="lg"
                                    className="px-10 py-7 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-2xl font-black uppercase tracking-widest shadow-2xl hover:scale-105 transition-all"
                                >
                                    <a href="/Software_Ayush (2).pdf" download="Software_Ayush.pdf">
                                        Download PDF
                                    </a>
                                </Button>

                                <Link href="/contact" className="w-full sm:w-auto">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="w-full px-10 py-7 border-2 border-neutral-200 dark:border-neutral-800 rounded-2xl font-black uppercase tracking-widest hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 transition-all"
                                    >
                                        Contact Me
                                    </Button>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.section>

                    {/* Right Side - Dynamic PDF Preview */}
                    <motion.section
                        className="w-full md:w-1/2 mt-8 md:mt-0 flex items-center justify-center"
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                            transition: { duration: 0.8 }
                        }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <motion.div
                            ref={pdfContainerRef}
                            className="relative bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl overflow-hidden border border-neutral-200/50 dark:border-neutral-800/50 group"
                            style={pdfStyle}
                            onHoverStart={() => setIsHoveringPdf(true)}
                            onHoverEnd={() => setIsHoveringPdf(false)}
                            whileHover={{ scale: 1.01, transition: { duration: 0.4 } }}
                        >
                            {/* Visual Progress Bar */}
                            <div className="absolute top-0 left-0 right-0 h-1 z-30 bg-neutral-100 dark:bg-neutral-800">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(pageNumber / (numPages || 1)) * 100}%` }}
                                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                />
                            </div>

                            <Document
                                file="/Software_Ayush (2).pdf"
                                onLoadSuccess={onDocumentLoadSuccess}
                                loading={
                                    <div className="flex flex-col items-center justify-center h-[600px] w-full bg-neutral-50 dark:bg-neutral-950/20 gap-4">
                                        <div className="w-12 h-12 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin" />
                                        <p className="text-sm font-medium text-neutral-400 animate-pulse">Initializing Viewer...</p>
                                    </div>
                                }
                                error={
                                    <div className="flex flex-col items-center justify-center h-[600px] w-full text-red-500 gap-2">
                                        <span className="text-4xl">⚠️</span>
                                        <p className="font-medium">Failed to load resume PDF.</p>
                                    </div>
                                }
                            >
                                <div className="w-full overflow-auto scrollbar-hide flex justify-center" style={{ maxHeight: 'calc(80vh - 4px)' }}>
                                    {aspectRatio && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            style={{
                                                height: containerWidth * aspectRatio * scale,
                                                maxHeight: 'calc(100% - 4px)',
                                                transform: `scale(${scale})`,
                                                transformOrigin: 'top center'
                                            }}
                                        >
                                            <Page
                                                pageNumber={pageNumber}
                                                width={containerWidth}
                                                renderTextLayer={true}
                                                renderAnnotationLayer={true}
                                                loading={
                                                    <div className="w-full bg-neutral-100 dark:bg-neutral-800/50 animate-pulse" style={{ height: containerWidth * aspectRatio }} />
                                                }
                                            />
                                        </motion.div>
                                    )}
                                </div>
                            </Document>

                            {/* Floating Glass Toolbar */}
                            <AnimatePresence>
                                {(isHoveringPdf || !hasMouse) && (
                                    <motion.div
                                        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 p-1.5 rounded-2xl bg-white/70 dark:bg-neutral-900/80 backdrop-blur-xl border border-white/20 dark:border-neutral-700/50 shadow-2xl z-40"
                                        initial={{ y: 50, opacity: 0, x: "-50%" }}
                                        animate={{ y: 0, opacity: 1, x: "-50%" }}
                                        exit={{ y: 50, opacity: 0, x: "-50%" }}
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    >
                                        <div className="flex items-center gap-1 border-r border-neutral-200 dark:border-neutral-700 pr-1 mr-1">
                                            <ToolbarButton
                                                onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
                                                disabled={pageNumber <= 1}
                                                icon="←"
                                            />
                                            <span className="text-[10px] font-bold font-mono px-2 text-neutral-500 w-16 text-center">
                                                {pageNumber} / {numPages || '--'}
                                            </span>
                                            <ToolbarButton
                                                onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages || 1))}
                                                disabled={pageNumber >= (numPages || 1)}
                                                icon="→"
                                            />
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <ToolbarButton
                                                onClick={() => setScale(prev => Math.max(prev - 0.1, 0.5))}
                                                icon="−"
                                            />
                                            <ToolbarButton
                                                onClick={() => setScale(1.0)}
                                                text={`${Math.round(scale * 100)}%`}
                                            />
                                            <ToolbarButton
                                                onClick={() => setScale(prev => Math.min(prev + 0.1, 2.0))}
                                                icon="+"
                                            />
                                        </div>

                                        <div className="pl-1 ml-1 border-l border-neutral-200 dark:border-neutral-700">
                                            <ToolbarButton
                                                onClick={() => window.open("/Software_Ayush (2).pdf", "_blank")}
                                                icon="↗"
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </motion.section>
                </div>
            </div>
        </section>
    )
}


const PremiumExpertiseItem: React.FC<{
    title: string;
    description: string;
    color: string;
    icon: string;
    index: number;
}> = ({ title, description, color, icon, index }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
    const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const xPct = (mouseX / width - 0.5) * 200;
        const yPct = (mouseY / height - 0.5) * 200;
        x.set(xPct);
        y.set(yPct);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            ref={cardRef}
            custom={index}
            variants={{
                hidden: { opacity: 0, x: -20 },
                visible: (i: number) => ({
                    opacity: 1,
                    x: 0,
                    transition: {
                        delay: i * 0.1,
                        duration: 0.5,
                        ease: "easeOut"
                    }
                })
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: 1000,
            }}
            className="w-full"
        >
            <motion.div
                style={{
                    rotateX: springRotateX,
                    rotateY: springRotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative group p-4 rounded-2xl border border-white/10 dark:border-white/5 bg-white/5 dark:bg-white/[0.03] backdrop-blur-md shadow-xl transition-all duration-300 hover:border-emerald-500/50 hover:bg-white/10 dark:hover:bg-white/[0.08]"
            >
                <div className="flex items-center gap-4">
                    {/* Glowing Orb Indicator */}
                    <div className="relative flex-shrink-0 flex items-center justify-center w-10 h-10">
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className={`absolute inset-0 rounded-full blur-md ${color}`}
                        />
                        <div className={`relative w-3 h-3 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.3)] ${color} border border-white/30`} />
                        <span className="absolute inset-0 flex items-center justify-center text-lg filter drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
                            {icon}
                        </span>
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                            {title}
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400/90 leading-relaxed line-clamp-2">
                            {description}
                        </p>
                    </div>
                </div>

                {/* Glass Glare Effect */}
                <div className="absolute inset-0 pointer-events-none rounded-2xl bg-gradient-to-br from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
        </motion.div>
    );
};

const ToolbarButton: React.FC<{
    onClick: () => void;
    disabled?: boolean;
    icon?: string;
    text?: string;
}> = ({ onClick, disabled, icon, text }) => (
    <motion.button
        onClick={onClick}
        disabled={disabled}
        whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
        whileTap={{ scale: 0.9 }}
        className={`flex items-center justify-center min-w-[32px] h-8 px-2 rounded-xl transition-colors ${disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:text-blue-500'}`}
    >
        {icon && <span className="text-lg leading-none">{icon}</span>}
        {text && <span className="text-[10px] font-bold font-mono">{text}</span>}
    </motion.button>
);