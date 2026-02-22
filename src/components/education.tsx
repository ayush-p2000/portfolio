"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiBookOpen, FiCalendar, FiMapPin, FiAward } from "react-icons/fi";

const Education = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const educationData = [
        {
            institution: "The University of Sheffield",
            degree: "Master's degree, Advanced Computer Science",
            period: "Sep 2023 - Sep 2024",
            location: "Sheffield, UK",
            grade: "2:1",
            details: [
                "Focusing on core development techniques, Machine Learning, and CUDA programming.",
                "Master's project: Applying rules of basic and advanced Semantic Tableaux in Propositional and Modal Logics.",
            ],
            color: "#440099",
            logo: "https://sheffield.ac.uk/themes/custom/uos_public/images/logos/uos-crest.svg",
            logoBg: "light"
        },
        {
            institution: "ARKA JAIN University",
            degree: "Bachelor's degree, Information Technology",
            period: "Aug 2019 - Jul 2022",
            location: "Jamshedpur, Jharkhand, India",
            grade: "9.4/10",
            details: [
                "Studied core Computer Science subjects including Data Structures, Algorithms, and DBMS.",
                "Activities: Music creation, Guitar Player, rubik's cube solver, Amateur Vocalist, Badminton, Cricket, eSports."
            ],
            color: "#FFCC00",
            logo: "https://en.wikipedia.org/wiki/Special:FilePath/Arka_Jain_University_logo.png",
            logoBg: "light"
        }
    ];

    return (
        <section id="education" className="min-h-screen flex items-center justify-center pt-32 pb-24 bg-gray-50 dark:bg-black/50 relative overflow-hidden scroll-mt-0">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 py-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                        Education & Academic Background
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Academic foundations that fuel my technical expertise in software engineering and data science.
                    </p>
                </motion.div>

                <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {educationData.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-800 relative overflow-hidden group hover:border-blue-500/30 transition-all duration-300"
                        >
                            <div
                                className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none transform translate-x-8 -translate-y-8"
                                style={{ color: edu.color }}
                            >
                                <FiBookOpen size={128} />
                            </div>

                            <div className="flex items-center gap-5 mb-6">
                                <div
                                    className={`w-16 h-16 rounded-2xl flex items-center justify-center border shadow-sm overflow-hidden shrink-0 group-hover:scale-110 transition-transform duration-500 p-2 ${edu.logoBg === "light" ? "bg-white border-gray-100" : "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700"
                                        }`}
                                >
                                    {edu.logo ? (
                                        <img src={edu.logo} alt={edu.institution} className="w-full h-full object-contain" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-white" style={{ backgroundColor: edu.color }}>
                                            <FiAward size={24} />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-tight mb-1">
                                        {edu.institution}
                                    </h3>
                                    <p className="font-bold text-sm uppercase tracking-wider" style={{ color: edu.color }}>
                                        {edu.degree}
                                    </p>
                                    {edu.grade && (
                                        <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">
                                            Grade: {edu.grade}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                                <div className="flex items-center gap-1">
                                    <FiCalendar />
                                    <span>{edu.period}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <FiMapPin />
                                    <span>{edu.location}</span>
                                </div>
                            </div>

                            <ul className="space-y-3">
                                {edu.details.map((detail, dIndex) => (
                                    <li key={dIndex} className="flex gap-3 text-gray-600 dark:text-gray-300 text-sm">
                                        <span className="mt-1 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: edu.color }} />
                                        {detail}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
