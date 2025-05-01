'use client';

import { useEffect, useState } from 'react';

const SoftwareIntro = () => {
    const fullText =
        "I'm a versatile developer specializing in web, mobile, and software development. With expertise in Java, Python, JavaScript, and TypeScript, I build cross-platform solutions that deliver exceptional user experiences. My technical breadth allows me to architect complete systems from database design to responsive interfaces, turning complex requirements into elegant, maintainable code.";

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

    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);
    const [highlightIndex, setHighlightIndex] = useState(0);

    // Typing effect
    useEffect(() => {
        if (index >= fullText.length) return;

        const timeout = setTimeout(() => {
            setDisplayedText(prev => prev + fullText[index]);
            setIndex(prev => prev + 1);
        }, 20);

        return () => clearTimeout(timeout);
    }, [index]);

    // Cursor blinking
    useEffect(() => {
        const interval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    // Highlight animation
    useEffect(() => {
        if (index < fullText.length) return;

        const interval = setInterval(() => {
            setHighlightIndex(prev => (prev + 1) % keywords.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [index, keywords.length]);


    // Highlight matched keywords
    const formatText = () => {
        const parts = [];
        const regex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'gi');
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(displayedText)) !== null) {
            if (match.index > lastIndex) {
                parts.push(displayedText.slice(lastIndex, match.index));
            }

            const matched = match[0];
            const isActive = matched.toLowerCase() === keywords[highlightIndex].toLowerCase() && index >= fullText.length;

            parts.push(
                <span
                    key={`kw-${match.index}`}
                    className={`font-semibold ${
                        isActive
                            ? 'text-blue-600 dark:text-blue-400 transition-colors duration-300'
                            : 'text-gray-900 dark:text-gray-50'
                    }`}
                >
                    {matched}
                </span>
            );

            lastIndex = regex.lastIndex;
        }

        if (lastIndex < displayedText.length) {
            parts.push(displayedText.slice(lastIndex));
        }

        return parts;
    };

    return (
        <p
            className={`
                mt-10 max-w-3xl text-balance text-xl sm:text-2xl md:text-3xl
                font-[Roboto Mono] font-medium tracking-wide leading-relaxed text-gray-800
                dark:text-gray-100
                select-none transition-opacity duration-1000 ease-in-out opacity-100
            `}
        >
            {formatText()}
            {showCursor && (
                <span className="inline-block w-[2px] h-[1.2em] bg-gray-800 dark:bg-gray-100 ml-1 align-middle animate-pulse" />
            )}
        </p>
    );
};

export default SoftwareIntro;