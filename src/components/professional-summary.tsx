"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiCpu, FiDatabase, FiLayers, FiShield, FiTrendingUp, FiZap } from "react-icons/fi";

const SummaryCard = ({
    icon: Icon,
    title,
    description,
    delay,
    color
}: {
    icon: React.ElementType,
    title: string,
    description: string,
    delay: number,
    color: string
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="relative group p-8 rounded-[2.5rem] bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
        >
            {/* Background Glow */}
            <div
                className="absolute -right-10 -top-10 w-32 h-32 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 rounded-full"
                style={{ backgroundColor: color }}
            />

            <div className="relative z-10">
                <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                    style={{ backgroundColor: `${color}15`, color: color }}
                >
                    <Icon size={28} />
                </div>

                <h3 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                    {title}
                </h3>

                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm">
                    {description}
                </p>
            </div>
        </motion.div>
    );
};

export default function ProfessionalSummary() {
    const pillars = [
        {
            icon: FiCpu,
            title: "Software Engineering",
            color: "#8B5CF6", // Violet
            description: "Architecting high-performance, scalable distributed systems. Focused on clean code, microservices, and robust CI/CD pipelines to ensure enterprise-grade reliability."
        },
        {
            icon: FiDatabase,
            title: "Data Science",
            color: "#06B6D4", // Cyan
            description: "Transforming raw data into strategic assets. Expertise in predictive modeling, deep learning architectures, and statistical analysis to uncover hidden patterns and drive decisions."
        },
        {
            icon: FiLayers,
            title: "Full-Stack Innovation",
            color: "#EC4899", // Pink
            description: "Bridging the gap between complex backends and intuitive frontends. Building seamless, AI-driven experiences that prioritize performance and user-centric design."
        }
    ];

    return (
        <section id="approach" className="min-h-screen flex items-center justify-center pt-32 pb-24 bg-white dark:bg-neutral-950 relative overflow-hidden scroll-mt-0">
            {/* Fluid Background Decorations */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none animate-pulse-slow-reverse" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    {/* Content Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="lg:col-span-5"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 mb-8">
                            <FiZap className="text-yellow-500" size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                                My approach
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter text-neutral-900 dark:text-white">
                            Bridging Engineering <br />
                            &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Intelligence.</span>
                        </h2>

                        <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed mb-10">
                            I specialize in building at the intersection of robust engineering and advanced analytics. My goal is to create systems that aren&apos;t just functional, but inherently intelligent.
                        </p>

                        <div className="flex flex-wrap gap-8">
                            <div className="space-y-1">
                                <p className="text-3xl font-bold text-neutral-900 dark:text-white">13+</p>
                                <p className="text-xs uppercase tracking-widest text-neutral-500 font-bold">Projects Built</p>
                            </div>
                            <div className="h-12 w-px bg-neutral-200 dark:bg-neutral-800 hidden md:block" />
                            <div className="space-y-1">
                                <p className="text-3xl font-bold text-neutral-900 dark:text-white">MSc</p>
                                <p className="text-xs uppercase tracking-widest text-neutral-500 font-bold">Computer Science</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Cards Column */}
                    <div className="lg:col-span-7 grid md:grid-cols-2 gap-6 relative">
                        <div className="space-y-6">
                            <SummaryCard {...pillars[0]} delay={0.2} />
                            <div className="hidden md:block">
                                <SummaryCard {...pillars[2]} delay={0.6} />
                            </div>
                        </div>
                        <div className="space-y-6 mt-0 md:mt-12">
                            <SummaryCard {...pillars[1]} delay={0.4} />
                            <div className="md:hidden">
                                <SummaryCard {...pillars[2]} delay={0.6} />
                            </div>

                            {/* Decorative Mini-Card */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.8 }}
                                viewport={{ once: true }}
                                className="p-6 rounded-[2rem] bg-gradient-to-br from-blue-600 to-purple-700 text-white shadow-2xl shadow-blue-500/20"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <FiShield size={20} />
                                    <h4 className="font-bold text-sm">Security First</h4>
                                </div>
                                <p className="text-[10px] opacity-80 leading-relaxed">
                                    Ensuring data integrity and system resilience is woven into every layer of my development process.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
