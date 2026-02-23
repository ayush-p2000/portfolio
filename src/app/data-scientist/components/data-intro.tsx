import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const DataIntro = () => {
    const fullText =
        "I&apos;m a Data Scientist driven by curiosity and precision. I transform raw data into actionable insights, build predictive models that scale, and collaborate across teams to solve meaningful problems. Whether it&apos;s optimizing decisions or uncovering trends, I bring data to life with code.";

    const keywords = [
        "Data Scientist",
        "precision",
        "actionable insights",
        "predictive models",
        "optimizing",
        "code"
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
                        ? 'text-emerald-600 dark:text-emerald-400 transition-colors duration-300'
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

export default DataIntro;
