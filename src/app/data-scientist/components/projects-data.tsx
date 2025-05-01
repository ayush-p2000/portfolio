'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { FiGithub, FiChevronRight, FiFilter } from 'react-icons/fi'

type Project = {
    title: string
    category: string
    description: string
    tags: string[]
    link?: string
    github?: string
    stars?: number
    forks?: number
}

const projects: Project[] = [
    {
        title: 'Sentiment Analysis on Twitter Data',
        category: 'NLP',
        description:
            'Analyzed 1.6M tweets using NLP models (Logistic Regression, SVM, Naive Bayes) with Tfidf, VADER, and visualization.',
        tags: ['Python', 'NLP', 'Scikit-learn', 'VADER', 'TfidfVectorizer'],
        github: 'https://github.com/ayush-p2000/Twitter_sentiment',
    },
    {
        title: 'MNIST Digit Prediction',
        category: 'Object Detection',
        description:
            'Built and trained a CNN to classify handwritten digits using the MNIST dataset, achieving high accuracy.',
        tags: ['Python', 'CNN', 'TensorFlow', 'MNIST'],
        github: 'https://github.com/ayush-p2000/MNIST-prediction',
    },
    {
        title: 'Employee Management System',
        category: 'SaaS Applications',
        description:
            'Developed a CRUD-based employee management system with role-based access, form validations, and analytics.',
        tags: ['Python', 'Streamlit', 'MySQL', 'GoogleOAuth', 'CRUD'],
        link: 'https://example.com',
        github: 'https://github.com/ayush-p2000/Employee-Management-System',
    },
    {
        title: 'Text Generation using NLP Techniques',
        category: 'NLP',
        description:
            'Implemented language models using Java data structures and self made algorithms to generate coherent text from input sequences.',
        tags: ['Java', 'Data Structures', 'Probability', 'Swing', 'Text Generation'],
        github: 'https://github.com/ayush-p2000/Generate-Text-using-Bigrams-or-Trigrams',
    },
    {
        title: 'Face Mask Detection System',
        category: 'Computer Vision',
        description:
            'Trained a real-time face mask detection system using OpenCV and Keras library for image classification.',
        tags: ['Python', 'OpenCV', 'Deep Learning', 'Keras', 'TensorFlow', 'Computer Vision'],
        github: 'https://github.com/ayush-p2000/Facemask-Detection-System',
    },
    {
        title: 'YouTube Video Comments Analysis',
        category: 'Data Analysis',
        description:
            'Used GCP YouTube API to extract Data and performed exploratory data analysis on the dataset with Visualization for the user',
        tags: ['Python', 'Pandas', 'Sentiment', 'Plotly', 'GCP YouTube API'],
        github: 'https://github.com/ayush-p2000/youtube-video-comment-extractor',
    },
]

const filters = [
    'All',
    'Data Analysis',
    'Computer Vision',
    'Object Detection',
    'NLP',
    'SaaS Applications',
]

const ProjectCard = ({ project}: { project: Project, index: number }) => {
    const cardRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["0 1", "1.2 1"]
    })

    const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1])
    const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1])
    const yProgress = useTransform(scrollYProgress, [0, 1], [50, 0])

    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            ref={cardRef}
            style={{
                scale: scaleProgress,
                opacity: opacityProgress,
                y: yProgress
            }}
            className="relative group bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 hover:shadow-blue-400/40 dark:hover:shadow-purple-400/30 transition-all duration-300 ease-in-out overflow-hidden h-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Glow effect */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 0.2 : 0 }}
                className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-transparent to-purple-400/20 dark:from-blue-600/20 dark:to-purple-600/20 pointer-events-none"
                transition={{ duration: 0.4 }}
            />

            {/* Floating elements */}
            {project.tags.slice(0, 3).map((tag, i) => (
                <motion.span
                    key={i}
                    initial={{ y: 0, x: 0 }}
                    animate={{
                        y: isHovered ? [0, -5, 0] : 0,
                        x: isHovered ? [0, (i % 2 === 0 ? -1 : 1) * 3, 0] : 0
                    }}
                    transition={{
                        duration: 0.8,
                        delay: i * 0.1,
                        repeat: isHovered ? Infinity : 0,
                        repeatType: 'reverse'
                    }}
                    className="absolute top-0 right-0 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-0.5 text-xs rounded-bl-md rounded-tr-md"
                >
                    {tag}
                </motion.span>
            ))}

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-purple-300 transition-colors">
                {project.title}
                <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: isHovered ? '100%' : 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    className="block h-0.5 bg-blue-500 dark:bg-purple-400 mt-1"
                />
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mb-4 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors">
                {project.description}
            </p>

            {/* Tags with staggered animation */}
            <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, i) => (
                    <motion.span
                        key={tag}
                        initial={{ scale: 1 }}
                        whileHover={{
                            scale: 1.1,
                            rotate: [0, -2, 2, -2, 0],
                            transition: { duration: 0.4 }
                        }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                            y: isHovered ? [0, -2, 2, 0] : 0,
                            transition: {
                                delay: i * 0.05,
                                duration: 0.6
                            }
                        }}
                        className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-0.5 text-xs rounded-md cursor-default"
                    >
                        {tag}
                    </motion.span>
                ))}
            </div>

            {/* GitHub stats */}
            {project.github && (
                <div className="flex items-center gap-4 mb-4">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center gap-1 text-sm"
                    >
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center gap-1 text-sm"
                    >
                    </motion.div>
                </div>
            )}

            {/* Buttons with spring animation */}
            <div className="flex gap-3">
                {project.github && (
                    <motion.div
                        whileHover={{
                            scale: 1.05,
                            transition: { type: 'spring', stiffness: 300 }
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(project.github, '_blank')}
                            className="flex items-center gap-1 cursor-pointer"
                        >
                            <FiGithub />
                            Code
                        </Button>
                    </motion.div>
                )}
            </div>

            {/* Floating corner accent */}
            <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: isHovered ? 90 : 0 }}
                transition={{ duration: 0.4 }}
                className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-500/10 dark:bg-purple-500/10 rounded-full pointer-events-none"
            />
        </motion.div>
    )
}

export default function ProjectsSection() {
    const [activeFilter, setActiveFilter] = useState('All')
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const sectionRef = useRef(null)
    const [, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const filteredProjects =
        activeFilter === 'All'
            ? projects
            : projects.filter(p => p.category === activeFilter)

    // Parallax effect for background
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    })

    const yBg = useTransform(scrollYProgress, [0, 1], [0, 200])
    const opacityBg = useTransform(scrollYProgress, [0, 0.5], [1, 0.3])

    // Floating animation for filter buttons
    return (
        <section id="projects" ref={sectionRef} className="relative w-full min-h-screen overflow-hidden py-24">
            {/* Animated background gradient */}
            <motion.div
                style={{ y: yBg, opacity: opacityBg }}
                className="absolute top-0 left-0 right-0 bottom-0 z-[-2] bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 dark:from-indigo-900 dark:via-purple-900 dark:to-blue-900 bg-[length:400%_400%] animate-gradient-move"
            />

            {/* Mountains background with parallax */}
            <motion.div
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
                className="absolute bottom-0 left-0 right-0 z-[-1] w-full"
            >
                <Image
                    src="/mountains.png"
                    alt="Mountains"
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
            </motion.div>

            {/* Main content */}
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-4xl md:text-5xl font-bold text-center mb-12 text-purple-800 dark:text-purple-400"
                >
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        viewport={{ once: true }}
                        className="inline-block"
                    >
                        My Projects
                    </motion.span>
                </motion.h2>

                {/* Filter Buttons - Desktop */}
                <div className="hidden md:flex flex-wrap justify-center gap-3 mb-10">
                    {filters.map((filter, i) => (
                        <motion.div
                            key={filter}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.1 + 0.6 }}
                            viewport={{ once: true }}
                            whileHover="float"
                        >
                            <Button

                                variant={activeFilter === filter ? 'default' : 'outline'}
                                onClick={() => setActiveFilter(filter)}
                                className="text-sm relative overflow-hidden"
                            >
                                {activeFilter === filter && (
                                    <motion.span
                                        layoutId="activeFilter"
                                        className="absolute inset-0 bg-blue-500/10 dark:bg-purple-500/10"
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{filter}</span>
                            </Button>
                        </motion.div>
                    ))}
                </div>

                {/* Filter Buttons - Mobile */}
                <div className="md:hidden flex justify-center mb-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <Button
                            variant="outline"
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="flex items-center gap-2 whitespace-nowrap min-w-[150px] justify-center"
                        >
                            <FiFilter />
                            {activeFilter}
                            <motion.div
                                animate={{ rotate: isFilterOpen ? 90 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <FiChevronRight />
                            </motion.div>
                        </Button>

                        <AnimatePresence>
                            {isFilterOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 z-10 w-auto min-w-[150px]"
                                >
                                    {filters.map((filter) => (
                                        <Button
                                            key={filter}
                                            variant={activeFilter === filter ? 'default' : 'ghost'}
                                            onClick={() => {
                                                setActiveFilter(filter);
                                                setIsFilterOpen(false);
                                            }}
                                            className="w-full justify-start text-sm mb-1 last:mb-0 whitespace-nowrap"
                                        >
                                            {filter}
                                        </Button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Project Cards */}
                {filteredProjects.length > 0 ? (
                    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                        {filteredProjects.map((project, index) => (
                            <ProjectCard key={index} project={project} index={index} />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="text-center py-20"
                    >
                        <h3 className="text-xl font-medium text-gray-600 dark:text-gray-400">
                            No projects found in this category
                        </h3>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-6 inline-block"
                        >
                            <Button onClick={() => setActiveFilter('All')}>
                                View All Projects
                            </Button>
                        </motion.div>
                    </motion.div>
                )}

                {/* Floating CTA at bottom */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                    className="text-center mt-20"
                >
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Want to see more of my work?
                    </p>
                    <motion.div
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block"
                    >
                        <Button
                            size="lg"
                            onClick={() => window.open('https://github.com/ayush-p2000', '_blank')}
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <FiGithub className="text-lg" />
                            Visit My GitHub
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}