'use client';

import { useEffect, useState } from 'react';

export const TypingName = () => {
    const fullText = 'Ayush Prajapati';
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < fullText.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + fullText[currentIndex]);
                setCurrentIndex((prev) => prev + 1);
            }, 100);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, fullText]);

    return (
        <span
            className="
        inline-block
        font-mono font-extrabold
        text-5xl sm:text-5xl md:text-5xl lg:text-6xl
        text-transparent bg-clip-text
        bg-gradient-to-r
        from-violet-500 via-fuchsia-500 to-cyan-500
        dark:from-violet-400 dark:via-fuchsia-400 dark:to-cyan-400
        pr-2
        transition-all duration-300
        select-none
      "
        >
            {displayedText}
            <span
                className="
          inline-block w-[2px] h-[1em]
          bg-cyan-500 dark:bg-cyan-400
          animate-pulse ml-1
          hover:scale-150 hover:bg-white hover:dark:bg-gray-100 hover:animate-none
          transition-transform duration-300
        "
            />
        </span>
    );
};


