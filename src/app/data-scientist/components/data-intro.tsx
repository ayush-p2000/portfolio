'use client';

import { useEffect, useState } from 'react';

const DataIntro = () => {
    const fullText =
        "I'm a Data Scientist driven by curiosity and precision. I transform raw data into actionable insights, build predictive models that scale, and collaborate across teams to solve meaningful problems. Whether it's optimizing decisions or uncovering trends, I bring data to life with code.";

    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);

    // Typing effect
    useEffect(() => {
        if (index < fullText.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + fullText[index]);
                setIndex((prev) => prev + 1);
            }, 20);
            return () => clearTimeout(timeout);
        }
    }, [index, fullText]);

    // Cursor blink effect
    useEffect(() => {
        const blink = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);
        return () => clearInterval(blink);
    }, []);

    return (
        <p
            className="
        mt-10 max-w-3xl text-balance text-xl sm:text-2xl md:text-3xl
        font-[Roboto Mono] font-medium tracking-wide leading-relaxed text-gray-800
        dark:text-gray-100
        select-none
      "
        >
            {displayedText}
            {showCursor && <span className="inline-block w-[2px] h-[1.2em] bg-gray-800 dark:bg-gray-100 ml-1 align-middle" />}
        </p>
    );
};

export default DataIntro;
