import { cn } from '@/lib/utils'

export const Logo = ({ className }: { className?: string }) => {
    return (
        <svg
            className={cn('size-7 w-7', className)}
            viewBox="0 0 200 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <text
                x="50%"
                y="50%"
                fontFamily="'Orbitron', sans-serif"
                fontWeight="700"
                fontSize="max(100%, 100px)"
                fill="currentColor"
                textAnchor="middle"
                alignmentBaseline="middle"
                letterSpacing="3">
                AP
            </text>
        </svg>
    )
}
