'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { FiGithub, FiExternalLink, FiCpu, FiTerminal, FiLayers, FiActivity, FiSearch } from 'react-icons/fi'
import { FaBrain, FaChartBar, FaDatabase, FaMicrochip, FaRobot } from 'react-icons/fa'
import { SiPython, SiTensorflow, SiScikitlearn, SiPytorch } from 'react-icons/si'

type Project = {
    title: string
    category: string
    description: string
    tags: string[]
    link?: string
    github?: string
}

const projects: Project[] = [
    {
        title: 'YouTube Stats Service',
        category: 'NLP / AI',
        description: 'An advanced analytics platform with sentiment analysis and predictive performance metrics for YouTube content creators. Features real-time data processing and interactive AI insights.',
        tags: ['Next.js', 'TypeScript', 'Redux', 'YouTube API', 'AI'],
        github: 'https://github.com/ayush-p2000/youtube-stats-service',
    },
    {
        title: 'Semantic Tableaux Solver',
        category: 'Logic / AI',
        description: 'High-performance logic solver developed for Master\'s dissertation. Applies basic and advanced Semantic Tableaux in Propositional and Modal Logics with real-time visualization.',
        tags: ['Python', 'Streamlit', 'Logic', 'NetworkX', 'Matplotlib'],
        github: 'https://github.com/ayush-p2000/semantic-tableaux',
    },
    {
        title: 'Sentiment Analysis Engine',
        category: 'NLP',
        description: 'Highly accurate sentiment classifier trained on 1.6 million tweets using Logistic Regression, SVM, and Naive Bayes architectures.',
        tags: ['Python', 'NLP', 'Scikit-learn', 'VADER', 'NLTK'],
        github: 'https://github.com/ayush-p2000/Sentiment-Analysis',
    },
    {
        title: 'Face Mask Detection',
        category: 'Computer Vision',
        description: 'Real-time object detection system using CNNs and OpenCV to identify mask-wearing compliance in live video feeds.',
        tags: ['Python', 'OpenCV', 'Keras', 'TensorFlow', 'Deep Learning'],
        github: 'https://github.com/ayush-p2000/Facemask-Detection-System',
    },
    {
        title: 'MNIST Digit Prediction',
        category: 'Deep Learning',
        description: 'CNN-based classifier for the MNIST dataset, demonstrating high-precision handwritten digit recognition.',
        tags: ['Python', 'CNN', 'TensorFlow', 'Jupyter', 'Deep Learning'],
        github: 'https://github.com/ayush-p2000/MNIST-prediction',
    },
    {
        title: 'NLP Text Generator',
        category: 'NLP',
        description: 'Language modeling application using Java data structures to generate coherent text based on bigram and trigram analysis.',
        tags: ['Java', 'NLP', 'Data Structures', 'Probability'],
        github: 'https://github.com/ayush-p2000/Generate-Text-using-Bigrams-or-Trigrams',
    },
    {
        title: 'Eye Blink Detection',
        category: 'Computer Vision',
        description: 'Fatigue detection system using facial landmarks and Dlib to monitor blink patterns in real-time.',
        tags: ['Python', 'OpenCV', 'Dlib', 'Computer Vision'],
        github: 'https://github.com/ayush-p2000/Eye-Blink-Detection',
    },
    {
        title: 'Data Analysis Web Tool',
        category: 'Data Engineering',
        description: 'One-click tool for automated dataset analysis, providing instant summarization and high-quality visualizations.',
        tags: ['Python', 'Streamlit', 'Pandas', 'Plotly', 'Data Viz'],
        github: 'https://github.com/ayush-p2000/data-analysis-web',
    },
]

const filters = [
    { name: 'All', icon: <FiLayers /> },
    { name: 'NLP', icon: <FiTerminal /> },
    { name: 'Computer Vision', icon: <FiActivity /> },
    { name: 'Deep Learning', icon: <FaBrain /> },
    { name: 'Logic / AI', icon: <FaRobot /> },
    { name: 'Data Engineering', icon: <FiCpu /> },
]

const ProjectCard = ({ project, index }: { project: Project, index: number }) => {
    return (
        <motion.div
            layout="position"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                    duration: 0.6,
                    delay: (index % 3) * 0.1,
                    ease: [0.215, 0.61, 0.355, 1]
                }
            }}
            viewport={{ once: true, margin: "-50px" }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="group relative h-full"
        >
            <motion.div
                className="relative bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-[2.5rem] p-9 border border-neutral-200/50 dark:border-neutral-800/50 shadow-2xl transition-all duration-500 h-full flex flex-col group-hover:border-emerald-500/50 group-hover:shadow-emerald-500/20"
                whileHover={{
                    y: -10,
                    scale: 1.04,
                    transition: { type: "spring", stiffness: 400, damping: 25 }
                }}
            >
                {/* Refined Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2.5rem]" />

                <div className="flex flex-wrap gap-2.5 mb-8 relative z-10">
                    {project.tags.slice(0, 3).map((tag, i) => (
                        <span
                            key={i}
                            className="px-4 py-1.5 bg-neutral-100/50 dark:bg-white/5 border border-neutral-200/50 dark:border-white/10 text-neutral-600 dark:text-neutral-400 text-[10px] font-bold uppercase tracking-[0.15em] rounded-full backdrop-blur-sm"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <h3 className="text-2xl font-black text-neutral-900 dark:text-white mb-4 tracking-tight uppercase group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                    {project.title}
                </h3>

                <p className="text-neutral-600 dark:text-neutral-400 mb-10 flex-grow leading-relaxed text-base font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                    {project.description}
                </p>

                <div className="flex gap-5 mt-auto relative z-10">
                    {project.github && (
                        <Button
                            size="lg"
                            variant="ghost"
                            onClick={() => window.open(project.github, '_blank')}
                            className="flex items-center gap-4 group/btn px-0 hover:bg-transparent h-auto"
                        >
                            <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-2xl group-hover/btn:bg-emerald-600 group-hover/btn:text-white transition-all duration-500 shadow-lg group-hover/btn:shadow-emerald-500/40">
                                <FiGithub size={22} className="group-hover/btn:scale-110 transition-transform" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-white transition-all">
                                View Source
                            </span>
                        </Button>
                    )}
                </div>
            </motion.div>
        </motion.div>
    )
}

export default function ProjectsSection() {
    const [activeFilter, setActiveFilter] = useState('All')
    const sectionRef = useRef(null)

    const filteredProjects =
        activeFilter === 'All'
            ? projects
            : projects.filter(p => p.category === activeFilter || p.category.includes(activeFilter))

    return (
        <section id="projects" ref={sectionRef} className="relative w-full pt-10 pb-24 overflow-hidden scroll-mt-0">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-6xl md:text-7xl font-black text-neutral-900 dark:text-white mb-6 tracking-tighter">
                        Data Science <span className="text-emerald-600 dark:text-emerald-400 italic">Portfolio</span>
                    </h2>
                    <div className="w-24 h-2 bg-emerald-600 dark:bg-emerald-500 mx-auto rounded-full" />
                </motion.div>

                <div className="flex flex-wrap justify-center gap-3 mb-20">
                    {filters.map((filter) => (
                        <button
                            key={filter.name}
                            onClick={() => setActiveFilter(filter.name)}
                            className={`relative flex items-center gap-3 px-8 py-4 rounded-full border text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${activeFilter === filter.name
                                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white shadow-2xl'
                                : 'bg-white/50 dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:border-neutral-900 dark:hover:border-white hover:text-neutral-900 dark:hover:text-white'
                                }`}
                        >
                            <span className="relative z-10">{filter.icon}</span>
                            <span className="relative z-10">{filter.name}</span>
                        </button>
                    ))}
                </div>

                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <ProjectCard key={project.title} project={project} index={index} />
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}
