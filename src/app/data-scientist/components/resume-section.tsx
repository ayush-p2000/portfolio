'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Button, MotionButton } from '@/components/ui/button'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

// Configure PDF.js worker path
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

export default function ResumeSection() {
    const [numPages, setNumPages] = useState<number | null>(null)
    const [pageNumber, setPageNumber] = useState(1)
    const [containerWidth, setContainerWidth] = useState(600) // Initial width
    const [aspectRatio, setAspectRatio] = useState<number | null>(null)
    const sectionRef = useRef<HTMLElement>(null)
    const pdfContainerRef = useRef<HTMLDivElement>(null)

    const onDocumentLoadSuccess = useCallback(async ({ numPages }: { numPages: number }) => {
        setNumPages(numPages)
        try {
            const pdf = await pdfjs.getDocument("/data_science.pdf").promise
            const page = await pdf.getPage(1)
            const viewport = page.getViewport({ scale: 1 })
            setAspectRatio(viewport.height / viewport.width)
        } catch (error) {
            console.error("Error loading PDF or getting aspect ratio:", error);
        }
    }, []);

    const updateContainerWidth = useCallback(() => {
        if (sectionRef.current) {
            const availableWidth = sectionRef.current.offsetWidth * (window.innerWidth < 768 ? 0.95 : 0.45); // Adjust for padding and screen size
            setContainerWidth(Math.min(availableWidth, 600)); // Limit maximum width
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
        <section className="relative w-full min-h-screen overflow-hidden" id="resume" ref={sectionRef}>
            {/* Background Elements */}
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
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="w-full">
                            <div className="text-6xl md:text-5xl lg:text-7xl mb-6 py-5 font-medium font-[Roboto Mono] text-blue-600 dark:text-blue-300">
                                My Resume
                            </div>

                            <motion.div
                                className="mb-10"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: 0.3 }}
                            >
                                <div className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                                    <motion.p
                                        className="mb-6 text-2xl font-light text-gray-800 dark:text-gray-100"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <span className="font-medium bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent dark:from-blue-100 dark:to-purple-200">
                                            My Professional Expertise
                                        </span>
                                    </motion.p>

                                    <ul className="space-y-3 pl-5">
                                        <motion.li
                                            className="relative before:absolute before:-left-5 before:top-[0.4em] before:size-2 before:rounded-full before:bg-blue-500 dark:before:bg-blue-400"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.1 }}
                                            whileHover={{ x: 5 }}
                                        >
                                            <span className="font-semibold text-gray-900 dark:text-white">Machine Learning & AI</span> -
                                            <span className="text-gray-600 dark:text-gray-300"> Building predictive models and intelligent systems</span>
                                        </motion.li>

                                        <motion.li
                                            className="relative before:absolute before:-left-5 before:top-[0.4em] before:size-2 before:rounded-full before:bg-green-500 dark:before:bg-green-400"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.2 }}
                                            whileHover={{ x: 5 }}
                                        >
                                            <span className="font-semibold text-gray-900 dark:text-white">Data Analysis & Visualization</span> -
                                            <span className="text-gray-600 dark:text-gray-300"> Transforming raw data into actionable insights</span>
                                        </motion.li>

                                        <motion.li
                                            className="relative before:absolute before:-left-5 before:top-[0.4em] before:size-2 before:rounded-full before:bg-purple-500 dark:before:bg-purple-400"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.3 }}
                                            whileHover={{ x: 5 }}
                                        >
                                            <span className="font-semibold text-gray-900 dark:text-white">Big Data Technologies</span> -
                                            <span className="text-gray-600 dark:text-gray-300"> Handling large-scale datasets efficiently</span>
                                        </motion.li>

                                        <motion.li
                                            className="relative before:absolute before:-left-5 before:top-[0.4em] before:size-2 before:rounded-full before:bg-amber-500 dark:before:bg-amber-400"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.4 }}
                                            whileHover={{ x: 5 }}
                                        >
                                            <span className="font-semibold text-gray-900 dark:text-white">Cloud Computing</span> -
                                            <span className="text-gray-600 dark:text-gray-300"> Deploying scalable solutions on cloud platforms</span>
                                        </motion.li>
                                    </ul>
                                </div>
                            </motion.div>

                            <motion.div
                                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 }}
                            >
                                <MotionButton
                                    variant="default"
                                    size="lg"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="font-[Roboto Mono]"
                                >
                                    <a href="/data_science.pdf" download="Ayush_DataScience_Resume.pdf">
                                        Download PDF
                                    </a>
                                </MotionButton>

                                <MotionButton
                                    variant="outline"
                                    size="lg"
                                    whileHover={{
                                        scale: 1.05,
                                        backgroundColor: "hsl(var(--accent))"
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    className="font-[Roboto Mono]"
                                >
                                    Contact Me
                                </MotionButton>
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
                        <div
                            ref={pdfContainerRef}
                            className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
                            style={pdfStyle}
                        >
                            <Document
                                file="/data_science.pdf"
                                onLoadSuccess={onDocumentLoadSuccess}
                                loading={
                                    <div className="flex items-center justify-center h-full">
                                        <p className="text-gray-500 dark:text-gray-400">Loading resume...</p>
                                    </div>
                                }
                                error={
                                    <div className="flex items-center justify-center h-full text-red-500">
                                        Failed to load resume PDF.
                                    </div>
                                }
                            >
                                <div className="w-full overflow-auto" style={{ maxHeight: 'calc(80vh - 40px)' }}> {/* Adjust for controls */}
                                    {aspectRatio && (
                                        <div style={{ height: containerWidth * aspectRatio, maxHeight: 'calc(80vh - 40px)' }}>
                                            <Page
                                                pageNumber={pageNumber}
                                                width={containerWidth}
                                                renderTextLayer={false}
                                                renderAnnotationLayer={false}
                                                loading={
                                                    <div className="flex items-center justify-center h-full">
                                                        <p className="text-gray-500 dark:text-gray-400">Loading page...</p>
                                                    </div>
                                                }
                                            />
                                        </div>
                                    )}
                                    {!aspectRatio && (
                                        <div className="flex items-center justify-center h-full">
                                            <p className="text-gray-500 dark:text-gray-400">Loading PDF info...</p>
                                        </div>
                                    )}
                                </div>
                            </Document>

                            {/* Page Controls */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gray-100 dark:bg-gray-700 p-2 flex justify-between items-center">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    disabled={pageNumber <= 1}
                                    onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
                                    className="font-[Roboto Mono] text-xs"
                                >
                                    Previous
                                </Button>
                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                    Page {pageNumber} of {numPages || '--'}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    disabled={pageNumber >= (numPages || 1)}
                                    onClick={() => setPageNumber(prev => prev + 1)}
                                    className="font-[Roboto Mono] text-xs"
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </motion.section>
                </div>
            </div>
        </section>
    )
}