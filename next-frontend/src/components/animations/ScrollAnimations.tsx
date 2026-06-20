"use client";
import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import type { ReactNode } from "react";
type FadeInOnScrollProps = {
    children: ReactNode;
    delay?: number;
    duration?: number;
    distance?: number;
    once?: boolean;
    amount?: number;
} & HTMLMotionProps<"div">;
type StaggerOnScrollProps = {
    children: ReactNode;
    delay?: number;
    staggerChildren?: number;
    once?: boolean;
    amount?: number;
} & HTMLMotionProps<"div">;
type StaggerItemProps = {
    children: ReactNode;
    delay?: number;
    duration?: number;
    distance?: number;
} & HTMLMotionProps<"div">;
export const FadeInOnScroll = ({ className, children, delay = 0, duration = 0.6, distance = 24, once = true, amount = 0.2, ...rest }: FadeInOnScrollProps) => {
    const usesTranslate = distance !== 0;
    const initialState = usesTranslate
        ? { opacity: 0, y: distance }
        : { opacity: 0 };
    const inViewState = usesTranslate ? { opacity: 1, y: 0 } : { opacity: 1 };
    return (<motion.div className={className} initial={initialState} whileInView={inViewState} viewport={{ once, amount }} transition={{ duration, delay, ease: "easeOut" }} {...rest}>
      {children}
    </motion.div>);
};
export const StaggerOnScroll = ({ children, delay = 0, staggerChildren = 0.12, once = true, amount = 0.2, ...rest }: StaggerOnScrollProps) => {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: delay,
                staggerChildren,
            },
        },
    };
    return (<motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once, amount }} {...rest}>
      {children}
    </motion.div>);
};
export const StaggerItem = ({ children, delay = 0, duration = 0.5, distance = 16, ...rest }: StaggerItemProps) => {
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: distance },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration, delay, ease: "easeOut" },
        },
    };
    return (<motion.div variants={itemVariants} {...rest}>
      {children}
    </motion.div>);
};
