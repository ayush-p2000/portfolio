'use client';

import { useEffect, useState } from 'react';

const TypingName = () => {
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
        font-mono font-extrabold
        text-5xl sm:text-5xl md:text-5xl lg:text-6xl
        text-transparent bg-clip-text
        bg-gradient-to-r
        from-emerald-400 via-cyan-400 to-teal-400
        dark:from-emerald-300 dark:via-cyan-300 dark:to-teal-300
        pr-2
        transition-all duration-300
        select-none
      "
        >
      {displayedText}
            <span
                className="
          inline-block w-[2px] h-[1em]
          bg-cyan-400 dark:bg-cyan-300
          animate-pulse ml-1
          hover:scale-150 hover:bg-white hover:dark:bg-gray-100 hover:animate-none
          transition-transform duration-300
        "
            />
    </span>
    );
};

export default TypingName;
