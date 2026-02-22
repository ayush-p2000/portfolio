'use client';

import { useEffect, useState } from 'react';

export const TypingIntro = () => {
    const fullText =
        "I'm a Software Engineer and Data Scientist passionate about building scalable systems and uncovering insights from data. I blend coding expertise with analytical thinking to solve complex, real-world problems. Explore my work with your relevance and get in touch with me!";

    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < fullText.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + fullText[index]);
                setIndex((prev) => prev + 1);
            }, 10); // fast typing speed
            return () => clearTimeout(timeout);
        }
    }, [index, fullText]);

    return (
        <p className="mt-8 max-w-2xl text-pretty text-xl leading-relaxed">
            {displayedText}
        </p>
    );
};

