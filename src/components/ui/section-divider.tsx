'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface SectionDividerProps {
    type?: 'wave' | 'curve' | 'slant' | 'tilt'
    color?: string
    backgroundColor?: string
    position?: 'top' | 'bottom'
    className?: string
    height?: number
}

export const SectionDivider = ({
    type = 'wave',
    color = 'fill-white dark:fill-neutral-950',
    backgroundColor = 'bg-transparent',
    position = 'bottom',
    className = '',
    height = 100
}: SectionDividerProps) => {
    const isBottom = position === 'bottom'

    const shapes = {
        wave: (
            <path
                d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,112C960,139,1056,181,1152,181.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
        ),
        curve: (
            <path
                d="M0,160 C480,320 960,0 1440,160 L1440,320 L0,320 Z"
            />
        ),
        slant: (
            <path
                d="M0,160 L1440,320 L1440,320 L0,320 Z"
            />
        ),
        tilt: (
            <path
                d="M0,320 L1440,0 L1440,320 L0,320 Z"
            />
        )
    }

    return (
        <div
            className={`relative w-full overflow-hidden leading-[0] ${backgroundColor} ${className} ${isBottom ? '' : 'rotate-180'}`}
            style={{ height: `${height}px` }}
        >
            <svg
                viewBox="0 0 1440 320"
                preserveAspectRatio="none"
                className={`relative block w-[calc(100%+1.3px)] h-full ${color}`}
            >
                {shapes[type]}
            </svg>
        </div>
    )
}
