import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const TOAST_STYLES = {
    container: `
    fixed bottom-10 left-1/2 -translate-x-1/2 z-[200]
    flex items-center gap-3 px-6 py-4
    bg-white/50 backdrop-blur-3xl
    rounded-[24px] border border-white/40
    shadow-[0_20px_50px_rgba(0,0,0,0.1)]
    min-w-[280px] justify-center
  `,
    iconBox: "w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200",
    text: "font-sans font-bold text-gray-900 text-[14px] tracking-tight",
};

export const LiquidToast = ({ isVisible, message }: { isVisible: boolean, message: string }) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    // IOS 특유의 쫀득한 팝업 효과 (Spring)
                    initial={{ opacity: 0, scale: 0.8, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className={TOAST_STYLES.container}
                >
                    <div className={TOAST_STYLES.iconBox}>
                        <Check size={14} strokeWidth={4} />
                    </div>
                    <span className={TOAST_STYLES.text}>{message}</span>

                    <div className="absolute inset-0 rounded-[24px] pointer-events-none border-t border-white/60" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};