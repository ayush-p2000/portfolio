'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to track the active section in the viewport using Intersection Observer.
 * @param sectionIds Array of section IDs to track
 * @param offset Header offset (e.g., 80 for 80px header)
 */
export const useActiveSection = (sectionIds: string[], offset: number = 80) => {
    const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || '');
    const observer = useRef<IntersectionObserver | null>(null);

    // Function to manually set the active section
    const manualSetActive = (id: string) => {
        setActiveSection(id);
    };

    useEffect(() => {
        const options: IntersectionObserverInit = {
            rootMargin: '0px',
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        };

        const callback: IntersectionObserverCallback = (entries) => {
            // Track the section with the largest visible area
            let maxVisibleHeight = 0;
            let currentActiveId = '';

            // We iterate through all tracked elements to find the most "dominant" one
            sectionIds.forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));

                    if (visibleHeight > maxVisibleHeight) {
                        maxVisibleHeight = visibleHeight;
                        currentActiveId = id;
                    }
                }
            });

            if (currentActiveId) {
                setActiveSection(currentActiveId);
            }
        };

        observer.current = new IntersectionObserver(callback, options);

        sectionIds.forEach(id => {
            const element = document.getElementById(id);
            if (element) observer.current?.observe(element);
        });

        return () => {
            if (observer.current) observer.current.disconnect();
        };
    }, [sectionIds]);

    return { activeSection, manualSetActive };
};
