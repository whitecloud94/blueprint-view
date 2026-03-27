import { motion } from 'framer-motion';
import { GLASS_STYLES } from '../../constants/styles';

export const LoadingBar = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#F3F3F3]/50 backdrop-blur-sm">
            <div className="w-full max-w-[400px] px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`${GLASS_STYLES.card} p-8 flex flex-col items-center gap-6`}
                >
                    {/* Logo or Icon placeholder */}
                    <div className="relative w-16 h-16">
                        <motion.div
                            animate={{ 
                                scale: [1, 1.2, 1],
                                rotate: [0, 180, 360],
                                borderRadius: ["24%", "50%", "24%"]
                            }}
                            transition={{ 
                                duration: 3, 
                                repeat: Infinity, 
                                ease: "easeInOut" 
                            }}
                            className="w-full h-full bg-indigo-600 shadow-lg shadow-indigo-200"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                        </div>
                    </div>

                    <div className="w-full space-y-3">
                        <div className="flex justify-between items-end">
                            <span className="text-sm font-black text-gray-900 tracking-tight uppercase italic">
                                Loading
                            </span>
                            <motion.span 
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="text-[10px] font-mono text-indigo-500 font-bold"
                            >
                                PROCESSING...
                            </motion.span>
                        </div>
                        
                        {/* Progress Bar Container */}
                        <div className="h-1.5 w-full bg-gray-200/50 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{ 
                                    duration: 1.5, 
                                    repeat: Infinity, 
                                    ease: "easeInOut" 
                                }}
                                className="h-full w-1/2 bg-gradient-to-r from-transparent via-indigo-600 to-transparent"
                            />
                        </div>
                    </div>

                    <p className="text-[12px] text-gray-400 font-medium text-center">
                        열심히 가져오고 있어요, 잠시만 기다려주세요.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default LoadingBar;
