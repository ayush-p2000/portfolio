'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SoftwareIntro = () => {
    const fullText =
        "I&apos;m a versatile developer specializing in web, mobile, and software development. With expertise in Java, Python, JavaScript, and TypeScript, I build cross-platform solutions that deliver exceptional user experiences. My technical breadth allows me to architect complete systems from database design to responsive interfaces, turning complex requirements into elegant, maintainable code.";

    const keywords = [
        "JavaScript",
        "TypeScript",
        "software development",
        "cross-platform",
        "Java",
        "Python",
        "web",
        "mobile"
    ];

    const [highlightIndex, setHighlightIndex] = useState(0);

    // Highlight animation cycle
    useEffect(() => {
        const interval = setInterval(() => {
            setHighlightIndex(prev => (prev + 1) % keywords.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [keywords.length]);


    // Highlight matched keywords
    const formatText = () => {
        const parts = [];
        const regex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'gi');
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(fullText)) !== null) {
            if (match.index > lastIndex) {
                parts.push(fullText.slice(lastIndex, match.index));
            }

            const matched = match[0];
            const isActive = matched.toLowerCase() === keywords[highlightIndex].toLowerCase();

            parts.push(
                <span
                    key={`kw-${match.index}`}
                    className={`font-semibold ${isActive
                        ? 'text-blue-600 dark:text-blue-400 transition-colors duration-300'
                        : 'text-gray-900 dark:text-gray-50'
                        }`}
                >
                    {matched}
                </span>
            );

            lastIndex = regex.lastIndex;
        }

        if (lastIndex < fullText.length) {
            parts.push(fullText.slice(lastIndex));
        }

        return parts;
    };

    return (
        <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`
                mt-10 max-w-3xl text-balance text-xl sm:text-2xl md:text-3xl
                font-[Roboto Mono] font-medium tracking-wide leading-relaxed text-gray-800
                dark:text-gray-100
                select-none
            `}
        >
            {formatText()}
        </motion.p>
    );
};

export default SoftwareIntro;