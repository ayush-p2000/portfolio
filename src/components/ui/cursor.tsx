'use client';

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const Cursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { stiffness: 300, damping: 30 };
    const smoothX = useSpring(cursorX, springConfig);
    const smoothY = useSpring(cursorY, springConfig);

    const [showCursor, setShowCursor] = useState(true);
    const [touchDetected, setTouchDetected] = useState(false);

    useEffect(() => {
        const handleTouchStart = () => {
            setTouchDetected(true);
            setShowCursor(false);
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
    }, [touchDetected, cursorX, cursorY]);

    if (!showCursor) return null;

    const offsetX = -16;
    const offsetY = 16;

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full pointer-events-none z-[9999] transform transition-all duration-200 ease-out"
            style={{
                translateX: smoothX,
                translateY: smoothY,
                x: offsetX,
                y: offsetY,
                boxShadow: "0 0 15px rgba(255, 0, 255, 0.6), 0 0 25px rgba(255, 0, 255, 0.3)",
                scale: showCursor ? 1 : 0,
            }}
        />
    );
};

export default Cursor;
