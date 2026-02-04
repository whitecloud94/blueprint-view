import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
    children: ReactNode;
    direction?: 'left' | 'right' | 'none';
}

export const PageTransition = ({ children, direction = 'none' }: PageTransitionProps) => {
    const variants = {
        initial: { 
            opacity: 0, 
            x: direction === 'left' ? -30 : direction === 'right' ? 30 : 0 
        },
        animate: { 
            opacity: 1, 
            x: 0 
        },
        exit: { 
            opacity: 0, 
            x: direction === 'left' ? -30 : direction === 'right' ? 30 : 0 
        }
    };

    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full flex flex-col items-center"
        >
            {children}
        </motion.div>
    );
};
