import {useState} from 'react';
import {motion, Variants} from 'framer-motion';
import {Copy, Plus} from 'lucide-react';
import {COMMON_STYLES} from "../../../constants/styles.ts";
import {LiquidToast} from "../../../components/common/feedback/LiquidToast.tsx";

const STYLES = {
    wrapper: "text-center space-y-6 mb-12 px-2",
    title: `text-[28px] sm:text-[36px] px-4 leading-tight ${COMMON_STYLES.title}`,
    buttonGroup: "flex flex-col sm:flex-row justify-center gap-3 px-4",
    primaryButton: `${COMMON_STYLES.primaryButton} px-6 py-3 text-[13px]`,
    secondaryButton: `${COMMON_STYLES.secondaryButton} px-5 py-3 text-[13px]`
};

export const FooterCTA = () => {
    const [showToast, setShowToast] = useState(false);

    const text = "저의 기술적 여정이 귀사에 가치를 더할 수 있기를 기대합니다."
    const sentenceVariants: Variants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.3,
                staggerChildren: 0.06,
            },
        },
    };

    const letterVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 8,
            color: "#4F46E5",// 시작 컬러
            filter: "blur(4px)"
        },
        visible: {
            opacity: 1,
            y: 0,
            color: "#1A1A1A", // 최종 컬러
            filter: "blur(0px)",
            transition: {
                type: "spring",
                stiffness: 150,
                damping: 15,
                color: { duration: 1.0 } // 색상이 서서히 변하도록 설정
            }
        },
    };

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(import.meta.env.VITE_CONTACT_EMAIL).then(() => {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2500);
        });
    };

    return (
        <div className={STYLES.wrapper}>
            <motion.h2
                className={STYLES.title}
                variants={sentenceVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {text.split("").map((char, index) => (
                    <motion.span key={index} variants={letterVariants}>
                        {char === "\n" ? <br /> : char}
                    </motion.span>
                ))}
            </motion.h2>

            <motion.div
                className={STYLES.buttonGroup}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.5, type: "spring", stiffness: 100 }}
                viewport={{ once: true }}
            >

                <button className={STYLES.primaryButton}>
                    <div className={COMMON_STYLES.innerCard.replace('rounded-[20px] sm:rounded-[24px]', 'rounded-full') + " p-0.5"}>
                        <Plus size={10} strokeWidth={4}/>
                    </div>
                    Hire Me
                </button>
                <button className={STYLES.secondaryButton} onClick={handleCopyEmail}>
                    <Copy size={14}/> Copy Email
                </button>
                <LiquidToast isVisible={showToast} message="이메일 주소가 복사되었습니다"/>
            </motion.div>
        </div>
    );
}