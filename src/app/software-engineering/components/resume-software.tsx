'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Button, MotionButton } from '@/components/ui/button'
import Image from 'next/image'
import { motion, useAnimation, useInView } from 'framer-motion'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import Link from "next/link";

// Configure PDF.js worker path
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

const techItems = [
    {
        title: "Java Development",
        description: "Building robust backend systems and enterprise applications",
        color: "bg-blue-500 dark:bg-blue-400",
        icon: "☕"
    },
    {
        title: "Python Programming",
        description: "Developing scripts, automation tools, and data processing pipelines",
        color: "bg-green-500 dark:bg-green-400",
        icon: "🐍"
    },
    {
        title: "JavaScript/TypeScript",
        description: "Creating interactive web applications with modern frameworks",
        color: "bg-purple-500 dark:bg-purple-400",
        icon: "📜"
    },
    {
        title: "Full Stack Development",
        description: "Building end-to-end solutions with React, Node.js, and databases",
        color: "bg-amber-500 dark:bg-amber-400",
        icon: "🛠️"
    }
]

export default function ResumeSoftware() {
    const [numPages, setNumPages] = useState<number | null>(null)
    const [pageNumber, setPageNumber] = useState(1)
    const [containerWidth, setContainerWidth] = useState(600)
    const [aspectRatio, setAspectRatio] = useState<number | null>(null)
    const [isHoveringPdf, setIsHoveringPdf] = useState(false)
    const sectionRef = useRef<HTMLElement>(null)
    const pdfContainerRef = useRef<HTMLDivElement>(null)
    const controls = useAnimation()
    const isInView = useInView(sectionRef, { once: false, margin: "-100px" })

    const onDocumentLoadSuccess = useCallback(async ({ numPages }: { numPages: number }) => {
        setNumPages(numPages)
        try {
            const pdf = await pdfjs.getDocument("/software_engineer.pdf").promise
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

    useEffect(() => {
        if (isInView) {
            controls.start("visible")
        }
    }, [isInView, controls])

    const calculatedHeight = aspectRatio ? containerWidth * aspectRatio : 'auto';
    const maxHeight = '80vh';
    const pdfStyle = {
        width: `${containerWidth}px`,
        maxHeight: maxHeight,
        height: calculatedHeight > maxHeight && calculatedHeight !== 'auto' ? maxHeight : calculatedHeight,
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                type: "spring",
                stiffness: 100
            }
        }),
        hover: {
            scale: 1.05,
            x: 10,
            transition: {
                type: "spring",
                stiffness: 300
            }
        }
    }

    const pdfVariants = {
        normal: {
            scale: 1,
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
        },
        hover: {
            scale: 1.02,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        }
    }

    const titleVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        },
        hover: {
            scale: 1.05,
            textShadow: "0 0 8px rgba(99, 102, 241, 0.5)",
            transition: {
                type: "spring",
                stiffness: 300
            }
        }
    }

    return (
        <section className="relative w-full min-h-screen overflow-hidden" id="resume" ref={sectionRef}>
            {/* Original Background Elements */}
            <div className="absolute top-0 left-0 right-0 bottom-0 z-[-2] bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 dark:from-indigo-800 dark:via-purple-900 dark:to-blue-900 bg-[length:400%_400%]" />

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
                <div className="flex-grow flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Left Content */}
                    <motion.section
                        className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left"
                        initial="hidden"
                        animate={controls}
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                    >
                        <div className="w-full">
                            <motion.div
                                className="text-6xl md:text-5xl lg:text-7xl mb-6 py-5 font-medium font-[Roboto Mono] text-blue-600 dark:text-blue-300"
                                variants={titleVariants}
                                whileHover="hover"
                            >
                                My Resume
                            </motion.div>

                            <motion.div
                                className="mb-10"
                                variants={{
                                    hidden: { opacity: 0, y: 10 },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            delay: 0.3
                                        }
                                    }
                                }}
                            >
                                <div className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                                    <motion.p
                                        className="mb-6 text-2xl font-light text-gray-800 dark:text-gray-100"
                                        variants={{
                                            hidden: { opacity: 0, scale: 0.9 },
                                            visible: {
                                                opacity: 1,
                                                scale: 1,
                                                transition: {
                                                    type: "spring",
                                                    stiffness: 300
                                                }
                                            }
                                        }}
                                        whileHover={{
                                            scale: 1.05,
                                            transition: { type: "spring", stiffness: 300 }
                                        }}
                                    >
                                        <span className="font-medium bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent dark:from-blue-100 dark:to-purple-200">
                                            My Technical Expertise
                                        </span>
                                    </motion.p>

                                    <ul className="space-y-3 pl-5">
                                        {techItems.map((item, i) => (
                                            <motion.li
                                                key={i}
                                                className="relative before:absolute before:-left-5 before:top-[0.4em] before:size-2 before:rounded-full"
                                                custom={i}
                                                variants={itemVariants}
                                                initial="hidden"
                                                animate={controls}
                                                whileHover="hover"
                                                style={{
                                                    // @ts-ignore
                                                    "--tw-bg-opacity": 1,
                                                    // @ts-ignore
                                                    "--tw-gradient-from": item.color,
                                                    // @ts-ignore
                                                    "--tw-gradient-to": item.color,
                                                }}
                                            >
                                                <span className={`absolute -left-8 text-xl`}>{item.icon}</span>
                                                <span className="font-semibold text-gray-900 dark:text-white">{item.title}</span> -
                                                <span className="text-gray-600 dark:text-gray-300"> {item.description}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>

                            <motion.div
                                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: {
                                            delay: 0.5,
                                            staggerChildren: 0.1
                                        }
                                    }
                                }}
                            >
                                <a href="/software_engineer.pdf" download="Ayush_SoftwareEngineer_Resume.pdf" className="block cursor-pointer" >
                                    <MotionButton
                                        variant="default"
                                        size="lg"
                                        whileHover={{
                                            scale: 1.05,
                                            boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)"
                                        }}
                                        whileTap={{
                                            scale: 0.95,
                                            boxShadow: "0 0 5px rgba(59, 130, 246, 0.3)"
                                        }}
                                        className="font-[Roboto Mono] relative overflow-hidden w-full sm:w-auto cursor-pointer" // Added width classes for better layout in flex
                                    >
                                        <motion.span
                                            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0"
                                            whileHover={{
                                                opacity: 0.2,
                                                transition: { duration: 0.3 }
                                            }}
                                        />
                                        Download PDF
                                    </MotionButton>
                                </a>
                                <Link href={'/contact'}>
                                <MotionButton
                                    variant="outline"
                                    size="lg"
                                    whileHover={{
                                        scale: 1.05,
                                        backgroundColor: "hsl(var(--accent))",
                                        boxShadow: "0 0 15px rgba(124, 58, 237, 0.5)"
                                    }}
                                    whileTap={{
                                        scale: 0.95,
                                        boxShadow: "0 0 5px rgba(124, 58, 237, 0.3)"
                                    }}
                                    className="font-[Roboto Mono] relative overflow-hidden cursor-pointer"
                                >
                                    <motion.span
                                        className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 opacity-0"
                                        whileHover={{
                                            opacity: 0.2,
                                            transition: { duration: 0.3 }
                                        }}
                                    />
                                    Contact Me
                                </MotionButton>
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
                            className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
                            style={pdfStyle}
                            variants={pdfVariants}
                            initial="normal"
                            whileHover="hover"
                            onHoverStart={() => setIsHoveringPdf(true)}
                            onHoverEnd={() => setIsHoveringPdf(false)}
                        >
                            <Document
                                file="/software_engineer.pdf"
                                onLoadSuccess={onDocumentLoadSuccess}
                                loading={
                                    <div className="flex items-center justify-center h-full">
                                        <motion.p
                                            className="text-gray-500 dark:text-gray-400"
                                            animate={{
                                                opacity: [0.6, 1, 0.6],
                                            }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity,
                                            }}
                                        >
                                            Loading resume...
                                        </motion.p>
                                    </div>
                                }
                                error={
                                    <div className="flex items-center justify-center h-full text-red-500">
                                        Failed to load resume PDF.
                                    </div>
                                }
                            >
                                <div className="w-full overflow-auto" style={{ maxHeight: 'calc(80vh - 40px)' }}>
                                    {aspectRatio && (
                                        <div style={{ height: containerWidth * aspectRatio, maxHeight: 'calc(80vh - 40px)' }}>
                                            <Page
                                                pageNumber={pageNumber}
                                                width={containerWidth}
                                                renderTextLayer={false}
                                                renderAnnotationLayer={false}
                                                loading={
                                                    <div className="flex items-center justify-center h-full">
                                                        <motion.div
                                                            className="flex space-x-2"
                                                            animate={{
                                                                x: [0, 10, 0],
                                                            }}
                                                            transition={{
                                                                duration: 1.5,
                                                                repeat: Infinity,
                                                            }}
                                                        >
                                                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                                        </motion.div>
                                                    </div>
                                                }
                                            />
                                        </div>
                                    )}
                                    {!aspectRatio && (
                                        <div className="flex items-center justify-center h-full">
                                            <motion.p
                                                className="text-gray-500 dark:text-gray-400"
                                                animate={{
                                                    rotate: [0, 5, -5, 0],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                }}
                                            >
                                                Loading PDF info...
                                            </motion.p>
                                        </div>
                                    )}
                                </div>
                            </Document>

                            {/* Page Controls */}
                            <motion.div
                                className="absolute bottom-0 left-0 right-0 bg-gray-100 dark:bg-gray-700 p-2 flex justify-between items-center"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{
                                    y: isHoveringPdf ? 0 : 20,
                                    opacity: isHoveringPdf ? 1 : 0.8
                                }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        disabled={pageNumber >= (numPages || 1)}
                                        onClick={() => {
                                            setPageNumber(prev => prev + 1)
                                            controls.start({
                                                scale: [1, 1.1, 1],
                                                transition: { duration: 0.3 }
                                            })
                                        }}
                                        className="font-[Roboto Mono] text-xs"
                                    >
                                    Previous
                                </Button>
                                </motion.div>
                                <motion.span
                                    className="text-sm text-gray-600 dark:text-gray-300"
                                    animate={{
                                        scale: isHoveringPdf ? 1.1 : 1
                                    }}
                                >
                                    Page {pageNumber} of {numPages || '--'}
                                </motion.span>
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        disabled={pageNumber >= (numPages || 1)}
                                        onClick={() => {
                                            setPageNumber(prev => prev + 1)
                                            controls.start({
                                                scale: [1, 1.1, 1],
                                                transition: { duration: 0.3 }
                                            })
                                        }}
                                        className="font-[Roboto Mono] text-xs"
                                    >
                                        Next
                                    </Button>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.section>
                </div>
            </div>
        </section>
    )
}