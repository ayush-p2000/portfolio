'use client';

import Link from 'next/link';
import React from 'react';

interface SmoothScrollLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string; // Optional: to pass original classes
    onClick?: () => void; // Optional: callback for parent (e.g., closing menu)
}

export const SmoothScrollLink: React.FC<SmoothScrollLinkProps> = ({
                                                                      href,
                                                                      children,
                                                                      className,
                                                                      onClick,
                                                                  }) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        // Check if the href is an internal anchor link
        if (href.startsWith('#')) {
            e.preventDefault(); // Prevent default hash link jump

            // Get the target element by ID (remove the '#' from href)
            const targetId = href.substring(1);

            // Special case for '#home' - usually scrolls to the top
            if (targetId === 'home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            } else {
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    // Use scrollIntoView for smooth scrolling
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start', // Scroll so that the top of the element is at the top of the viewport
                    });
                } else {
                    // Fallback: log a warning or handle missing element
                    console.warn(`Element with ID "${targetId}" not found.`);
                }
            }


            // Execute the provided onClick callback (e.g., to close a mobile menu)
            if (onClick) {
                onClick();
            }
        }
        // If not an anchor link, let the default Link behavior happen
    };

    return (
        <Link href={href} onClick={handleClick} className={className}>
            {children}
        </Link>
    );
};