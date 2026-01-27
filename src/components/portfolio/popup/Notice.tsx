import {AnimatePresence, motion} from 'framer-motion';
import {Monitor, X} from 'lucide-react';
import {useEffect, useState} from 'react';
import {useMobile} from "../../../hooks/useMobile.ts";

export const Notice = () => {
    const [isVisible, setIsVisible] = useState(false);
    const isMobile = useMobile();

    // 모바일 판단 후 토스트팝업 노출
    useEffect(() => {
        if (isMobile) {
            setIsVisible(true);
            const timer = setTimeout(() => setIsVisible(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [isMobile]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{y: 100, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    exit={{y: 100, opacity: 0}}
                    transition={{type: "spring", stiffness: 260, damping: 20}}
                    className="fixed bottom-6 left-4 right-4 z-[300] sm:hidden"
                >
                    <div className="
                        relative overflow-hidden
                        bg-white/70 backdrop-blur-2xl 
                        border border-white/40 rounded-[24px] 
                        p-4 pr-12 shadow-[0_20px_40px_rgba(0,0,0,0.1)]
                    ">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
                                <Monitor size={18}/>
                            </div>

                            {/* 텍스트 영역 */}
                            <div className="flex flex-col gap-0.5">
                                <p className="text-[13px] font-bold text-gray-900 tracking-tight">
                                    PC 환경에 최적화된 페이지입니다
                                </p>
                                <p className="text-[11px] font-medium text-gray-500 leading-tight">
                                    더 나은 경험을 위해 데스크톱 접속을 권장합니다.
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X size={16}/>
                        </button>

                        <div className="absolute inset-0 rounded-[24px] border-t border-white/60 pointer-events-none"/>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};