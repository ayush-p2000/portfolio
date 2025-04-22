'use client'

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface EnhancedRetroGridProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS classes to apply to the grid container
     */
    className?: string;
    /**
     * Rotation angle of the grid in degrees
     * @default 65
     */
    angle?: number;
    /**
     * Grid cell size in pixels
     * @default 60
     */
    cellSize?: number;
    /**
     * Grid opacity value between 0 and 1
     * @default 0.5
     */
    opacity?: number;
    /**
     * Grid line color in light mode
     * @default "#6b7280"
     */
    lightLineColor?: string;
    /**
     * Grid line color in dark mode
     * @default "#9ca3af"
     */
    darkLineColor?: string;
    /**
     * Grid animation speed
     * @default "normal"
     */
    animationSpeed?: "slow" | "normal" | "fast";
    /**
     * Enable glow effect on grid lines
     * @default false
     */
    glow?: boolean;
    /**
     * Glow color
     * @default "#8b5cf6"
     */
    glowColor?: string;
    /**
     * Enable scanline effect
     * @default false
     */
    scanlines?: boolean;
    /**
     * Enable depth effect with multiple grid layers
     * @default false
     */
    depth?: boolean;
    /**
     * Enable responsive grid sizing
     * @default true
     */
    responsive?: boolean;
    /**
     * Grid line thickness in pixels
     * @default 1
     */
    lineThickness?: number;
    /**
     * Enable fade-in animation on mount
     * @default true
     */
    fadeIn?: boolean;
    /**
     * Enable mouse parallax effect
     * @default false
     */
    parallax?: boolean;
}

export function EnhancedRetroGrid({
                                      className,
                                      angle = 65,
                                      cellSize = 60,
                                      opacity = 0.5,
                                      lightLineColor = "#6b7280",
                                      darkLineColor = "#9ca3af",
                                      animationSpeed = "normal",
                                      glow = false,
                                      glowColor = "#8b5cf6",
                                      scanlines = false,
                                      depth = false,
                                      responsive = true,
                                      lineThickness = 1,
                                      fadeIn = true,
                                      parallax = false,
                                      ...props
                                  }: EnhancedRetroGridProps) {
    const [mounted, setMounted] = useState(!fadeIn);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (fadeIn) {
            const timer = setTimeout(() => setMounted(true), 100);
            return () => clearTimeout(timer);
        }
    }, [fadeIn]);

    useEffect(() => {
        if (!parallax) return;

        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 10 - 5;
            const y = (e.clientY / window.innerHeight) * 10 - 5;
            setMousePosition({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [parallax]);

    // Determine animation speed class
    const animationSpeedClass = {
        slow: "animate-grid-slow",
        normal: "animate-grid",
        fast: "animate-grid-fast",
    }[animationSpeed];

    // Calculate responsive cell size if enabled
    const responsiveCellSize = responsive
        ? `clamp(${cellSize / 2}px, ${cellSize / 120}vw, ${cellSize}px)`
        : `${cellSize}px`;

    // Apply glow filter if enabled
    const glowFilter = glow
        ? `drop-shadow(0 0 2px ${glowColor}) drop-shadow(0 0 4px ${glowColor})`
        : "none";

    const gridStyles = {
        "--grid-angle": `${angle}deg`,
        "--cell-size": responsive ? responsiveCellSize : `${cellSize}px`,
        "--opacity": opacity,
        "--light-line": lightLineColor,
        "--dark-line": darkLineColor,
        "--glow-color": glowColor,
        "--glow-filter": glowFilter,
        "--line-thickness": `${lineThickness}px`,
        "--parallax-x": `${mousePosition.x}px`,
        "--parallax-y": `${mousePosition.y}px`,
    } as React.CSSProperties;

    const containerClasses = cn(
        "pointer-events-none absolute size-full overflow-hidden [perspective:200px]",
        fadeIn && (mounted ? "opacity-100 transition-opacity duration-1000" : "opacity-0"),
        `opacity-[var(--opacity)]`,
        className
    );

    const gridClasses = cn(
        "absolute inset-0",
        parallax && "transition-transform duration-200 ease-out",
        parallax && "transform translate-x-[var(--parallax-x)] translate-y-[var(--parallax-y)]",
        "[transform:rotateX(var(--grid-angle))]"
    );

    const mainGridClasses = cn(
        animationSpeedClass,
        "[background-repeat:repeat]",
        "[background-size:var(--cell-size)_var(--cell-size)]",
        "[height:300vh]",
        "[inset:0%_0px]",
        "[margin-left:-200%]",
        "[transform-origin:100%_0_0]",
        "[width:600vw]",
        glow && "filter-[var(--glow-filter)]",
        "[background-image:linear-gradient(to_right,var(--light-line)_var(--line-thickness),transparent_0),linear-gradient(to_bottom,var(--light-line)_var(--line-thickness),transparent_0)]",
        "dark:[background-image:linear-gradient(to_right,var(--dark-line)_var(--line-thickness),transparent_0),linear-gradient(to_bottom,var(--dark-line)_var(--line-thickness),transparent_0)]"
    );

    return (
        <div className={containerClasses} style={gridStyles} {...props}>
            <div className={gridClasses}>
                {/* Main grid */}
                <div className={mainGridClasses} />

                {/* Secondary grid layers for depth effect */}
                {depth && (
                    <>
                        <div className={cn(
                            mainGridClasses,
                            "opacity-70 [background-size:calc(var(--cell-size)*1.5)_calc(var(--cell-size)*1.5)]",
                            "[transform:translateZ(-20px)]"
                        )} />
                        <div className={cn(
                            mainGridClasses,
                            "opacity-40 [background-size:calc(var(--cell-size)*2)_calc(var(--cell-size)*2)]",
                            "[transform:translateZ(-40px)]"
                        )} />
                    </>
                )}
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent to-90% dark:from-black" />

            {/* Scanlines effect */}
            {scanlines && (
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none z-10 mix-blend-multiply dark:mix-blend-soft-light" />
            )}
        </div>
    );
}