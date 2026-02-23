'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { FiGithub, FiCpu, FiTerminal, FiLayers, FiActivity, FiFilter, FiChevronDown } from 'react-icons/fi'
import { useActiveSection } from '@/hooks/use-active-section'

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
        category: 'Full Stack',
        description: 'An advanced analytics platform with sentiment analysis and predictive performance metrics for YouTube content creators. Features real-time data processing and interactive AI insights.',
        tags: ['Next.js', 'TypeScript', 'Redux', 'YouTube API', 'Tailwind CSS', 'Python', 'FastAPI', 'Docker'],
        github: 'https://github.com/ayush-p2000/youtube-stats-service',
    },
    {
        title: 'Real-time Video Chat App',
        category: 'Full Stack',
        description: 'Interactive low-latency video communication platform featuring peer-to-peer streaming, messaging, and responsive UI.',
        tags: ['Node.js', 'Socket.io', 'WebRTC', 'Express', 'JavaScript'],
        github: 'https://github.com/ayush-p2000/realtime-video-chat-app',
    },
    {
        title: 'ePanda Recycling System',
        category: 'SaaS App',
        description: 'SaaS platform for eWaste recycling with user/admin panels, payment integration (Stripe/PayPal), and comprehensive reporting toolkit.',
        tags: ['NodeJS', 'MongoDB', 'Express', 'OAuth', 'Stripe API', 'PayPal API', 'ExpressJS'],
        github: 'https://github.com/ayush-p2000/COM6103-Team-Project',
    },
    {
        title: 'Plant Recognition System',
        category: 'Web Development',
        description: 'Collaborative plant recognition platform with real-time messaging, plant data retrieval (SPARQL), and location logging.',
        tags: ['NodeJS', 'ExpressJS', 'MongoDB', 'Socket.io', 'SPARQL', 'Bootstrap', 'DBPedia'],
        github: 'https://github.com/Intelligent-Web-PROJECT/Team-Project',
    },
    {
        title: 'Employee Management system',
        category: 'SaaS App',
        description: 'Robust CRUD application with role-based access control, Google OAuth integration, and real-time analytics dashboard.',
        tags: ['Python', 'Streamlit', 'MySQL', 'Google OAuth', 'Analytics'],
        github: 'https://github.com/ayush-p2000/Employee-Management-System',
    },
    {
        title: "Repairer's Hub App",
        category: 'Mobile',
        description: 'Android application for an electronics repairing system, implementing Firebase authentication and a reporting system.',
        tags: ['Java', 'Android', 'Firebase', 'XML'],
        github: 'https://github.com/ayush-p2000/Android-Application-RepairersHub',
    },
    {
        title: 'Kotlin To-Do App',
        category: 'Mobile',
        description: 'To-Do list application using Kotlin and Jetpack Compose, featuring location services integration and task tracking.',
        tags: ['Kotlin', 'Jetpack Compose', 'Android', 'Location Services'],
        github: 'https://github.com/ayush-p2000/To-Do-List',
    },
    {
        title: 'Library Management System',
        category: 'Backend',
        description: 'Scalable backend system for library operations, featuring book tracking and user management.',
        tags: ['Python', 'MySQL', 'System Design'],
        github: 'https://github.com/ayush-p2000/Library-Management-System',
    },
]

const filters = [
    { name: 'All', icon: <FiLayers /> },
    { name: 'Full Stack', icon: <FiCpu /> },
    { name: 'SaaS App', icon: <FiTerminal /> },
    { name: 'Mobile', icon: <FiActivity /> },
    { name: 'Web Development', icon: <FiLayers /> },
    { name: 'Backend', icon: <FiTerminal /> },
]

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
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
                    ease: [0.215, 0.61, 0.355, 1],
                },
            }}
            viewport={{ once: true, margin: '-50px' }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="group relative h-full"
        >
            <motion.div
                className="relative bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-[2.5rem] p-9 border border-neutral-200/50 dark:border-neutral-800/50 shadow-2xl transition-all duration-500 h-full flex flex-col group-hover:border-blue-500/50 group-hover:shadow-blue-500/20"
                whileHover={{
                    y: -10,
                    scale: 1.04,
                    transition: { type: 'spring', stiffness: 400, damping: 25 },
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2.5rem]" />
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
                <h3 className="text-2xl font-black text-neutral-900 dark:text-white mb-4 tracking-tight uppercase group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
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
                            <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-2xl group-hover/btn:bg-blue-600 group-hover/btn:text-white transition-all duration-500 shadow-lg group-hover/btn:shadow-blue-500/40">
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

// Navbar height — matches top-24 (96px)
const FLOAT_TOP = 96

export default function ProjectsSoftware() {
    const [activeFilter, setActiveFilter] = useState('All')
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isFloating, setIsFloating] = useState(false)

    const sectionRef = useRef<HTMLElement>(null)
    const filterWrapperRef = useRef<HTMLDivElement>(null)
    const phantomRef = useRef<HTMLDivElement>(null)
    const isFloatingRef = useRef(false)

    const { activeSection } = useActiveSection(['home', 'resume', 'experience', 'projects', 'contact'])

    useEffect(() => {
        const wrapper = filterWrapperRef.current
        const phantom = phantomRef.current
        if (!wrapper || !phantom) return

        const handleScroll = () => {
            if (!isFloatingRef.current) {
                const rect = wrapper.getBoundingClientRect()
                if (rect.top <= FLOAT_TOP) {
                    phantom.style.width = `${rect.width}px`
                    phantom.style.height = `${rect.height}px`
                    phantom.style.display = 'block'

                    wrapper.style.position = 'fixed'
                    wrapper.style.top = `${FLOAT_TOP}px`
                    wrapper.style.right = '24px'
                    wrapper.style.zIndex = '50'

                    // Set data-floating on the wrapper — CSS handles all color changes
                    wrapper.setAttribute('data-floating', 'true')

                    isFloatingRef.current = true
                    setIsFloating(true)
                }
            } else {
                const phantomRect = phantom.getBoundingClientRect()
                if (phantomRect.top > FLOAT_TOP) {
                    wrapper.style.position = ''
                    wrapper.style.top = ''
                    wrapper.style.right = ''
                    wrapper.style.zIndex = ''

                    phantom.style.display = 'none'

                    wrapper.removeAttribute('data-floating')

                    isFloatingRef.current = false
                    setIsFloating(false)
                }
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close dropdown on outside click
    useEffect(() => {
        if (!isDropdownOpen) return
        const handler = (e: MouseEvent) => {
            if (filterWrapperRef.current && !filterWrapperRef.current.contains(e.target as Node)) {
                setIsDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [isDropdownOpen])

    const filteredProjects =
        activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter)

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="min-h-screen flex flex-col justify-center pt-40 pb-24 relative overflow-hidden scroll-mt-24"
        >
            {/*
              * All color logic lives here in plain CSS.
              * CSS inherits the `dark` class from <html> natively — no JS timing issues.
              * `data-floating` attribute on the wrapper div drives the floating state colors.
              *
              * Default (light, not floating):  black pill
              * Dark (not floating):            white pill
              * Light + floating:               frosted white glass
              * Dark + floating:                frosted dark glass
            */}
            <style>{`
                .mobile-filter-btn {
                    background-color: #171717;
                    color: #ffffff;
                    border-color: transparent;
                    padding: 14px 22px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.12);
                    transition: background-color 0.3s, color 0.3s, border-color 0.3s,
                                box-shadow 0.3s, padding 0.3s, transform 0.3s, backdrop-filter 0.3s;
                }
                html.dark .mobile-filter-btn {
                    background-color: #ffffff;
                    color: #171717;
                    border-color: transparent;
                }
                [data-floating="true"] .mobile-filter-btn {
                    background-color: #171717;
                    color: #ffffff;
                    border-color: transparent;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.18);
                    padding: 11px 18px;
                    transform: scale(0.92);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                }
                html.dark [data-floating="true"] .mobile-filter-btn {
                    background-color: #ffffff;
                    color: #171717;
                    border-color: transparent;
                }
            `}</style>

            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-6xl md:text-7xl font-black text-neutral-900 dark:text-white mb-6 tracking-tighter">
                        Featured <span className="text-blue-600 dark:text-blue-400 italic">Work</span>
                    </h2>
                    <div className="w-24 h-2 bg-blue-600 dark:bg-blue-500 mx-auto rounded-full" />
                </motion.div>

                {/* Desktop Filters */}
                <div className="hidden lg:flex flex-wrap justify-center gap-3 mb-20">
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

                {/* Mobile Filter */}
                <div className="flex justify-end mb-8 lg:hidden">
                    {/* Phantom: holds space in layout when wrapper goes fixed */}
                    <div ref={phantomRef} style={{ display: 'none' }} aria-hidden="true" />

                    {/* Wrapper: position toggled imperatively; data-floating drives CSS colors */}
                    <motion.div
                        ref={filterWrapperRef}
                        className="relative"
                        animate={isFloating ? { scale: 0.96, y: -8 } : { scale: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 28, mass: 0.4 }}
                    >
                        <AnimatePresence mode="wait">
                            {isDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                    className="absolute top-full right-0 mt-4 w-56 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl z-50"
                                >
                                    <div className="p-2 space-y-1">
                                        {filters.map((filter) => (
                                            <button
                                                key={filter.name}
                                                onClick={() => {
                                                    setActiveFilter(filter.name)
                                                    setIsDropdownOpen(false)
                                                }}
                                                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all ${activeFilter === filter.name
                                                        ? 'bg-blue-600 text-white'
                                                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                                                    }`}
                                            >
                                                <span className="text-lg">{filter.icon}</span>
                                                {filter.name}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Plain button — colors 100% driven by CSS above, zero JS color logic */}
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="mobile-filter-btn flex items-center gap-3 rounded-full border"
                        >
                            <FiFilter
                                className={`text-lg transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                            />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                                {activeFilter === 'All' ? 'Filter' : activeFilter}
                            </span>
                            <FiChevronDown
                                className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                            />
                        </button>
                    </motion.div>
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
