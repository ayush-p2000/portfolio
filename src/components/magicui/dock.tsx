"use client";

import React, { PropsWithChildren, useRef } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

// Constants
const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

// Variants
const dockVariants = cva(
    "mx-auto w-max h-full p-2 flex items-end rounded-full border"
);

// Props
export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  magnification?: number;
  distance?: number;
  children: React.ReactNode;
}

export interface DockIconProps {
  magnification?: number;
  distance?: number;
  mousex?: MotionValue<number>;
  className?: string;
  children?: React.ReactNode;
  props?: PropsWithChildren;
}

// Dock Component
const Dock = React.forwardRef<HTMLDivElement, DockProps>(
    (
        {
          className,
          children,
          magnification = DEFAULT_MAGNIFICATION,
          distance = DEFAULT_DISTANCE,
          ...props
        },
        ref
    ) => {
      const mousex = useMotionValue(Infinity);

      const renderChildren = () => {
        return React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement, {
              mousex,
              magnification,
              distance,
            } as DockIconProps);
          }
          return child;
        });
      };

      return (
          <motion.div
              ref={ref}
              onMouseMove={(e) => mousex.set(e.pageX)}
              onMouseLeave={() => mousex.set(Infinity)}
              {...props}
              className={cn(dockVariants({ className }))}
          >
            {renderChildren()}
          </motion.div>
      );
    }
);

Dock.displayName = "Dock";

// DockIcon Component
const DockIcon = ({
                    magnification = DEFAULT_MAGNIFICATION,
                    distance = DEFAULT_DISTANCE,
                    mousex,
                    className,
                    children,
                    ...props
                  }: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const distanceCalc = useTransform(mousex!, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
      distanceCalc,
      [-distance, 0, distance],
      [40, magnification, 40]
  );

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
      <motion.div
          ref={ref}
          style={{ width }}
          className={cn(
              "flex aspect-square cursor-pointer items-center justify-center rounded-full",
              className
          )}
          {...props}
      >
        {children}
      </motion.div>
  );
};

DockIcon.displayName = "DockIcon";

// Exports
export { Dock, DockIcon, dockVariants };
