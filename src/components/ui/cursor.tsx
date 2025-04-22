'use client' // Required for Next.js App Router components using client-side hooks/interactivity

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const Cursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smoother spring configuration
    const springConfig = { stiffness: 300, damping: 30 };
    const smoothX = useSpring(cursorX, springConfig);
    const smoothY = useSpring(cursorY, springConfig);

    const [showCursor, setShowCursor] = useState(true);
    const [touchDetected, setTouchDetected] = useState(false);

    useEffect(() => {
        const handleTouchStart = () => {
            setTouchDetected(true);
            setShowCursor(false); // Hide cursor on touch start
            window.removeEventListener("mousemove", handleMouseMove);
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!touchDetected) {
                setShowCursor(true);
                cursorX.set(e.clientX);
                cursorY.set(e.clientY);
            }
        };

        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [touchDetected]);

    if (!showCursor) return null;

    // Adjust the cursor to stay under the mouse pointer by adding an offset
    const offsetX = -16;  // Horizontal offset from the mouse pointer (half the cursor width)
    const offsetY = 16;   // Vertical offset from the mouse pointer (below the pointer)

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full pointer-events-none z-[9999] transform transition-all duration-200 ease-out"
            style={{
                translateX: smoothX,
                translateY: smoothY,
                x: offsetX,  // Offsetting cursor below the pointer
                y: offsetY,  // Offset downward
                boxShadow: "0 0 15px rgba(255, 0, 255, 0.6), 0 0 25px rgba(255, 0, 255, 0.3)",
                scale: showCursor ? 1 : 0,
            }}
        />
    );
};

export default Cursor;
