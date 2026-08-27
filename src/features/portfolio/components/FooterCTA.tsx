import {useState} from 'react';
import {motion} from 'framer-motion';
import {Copy, Plus} from 'lucide-react';
import {COMMON_STYLES} from "../../../constants/styles.ts";
import {LiquidToast} from "../../../components/common/feedback/LiquidToast.tsx";

const STYLES = {
    wrapper: "text-center space-y-6 mb-12 px-2",
    title: `text-[28px] sm:text-[36px] px-4 leading-tight ${COMMON_STYLES.title} dark:text-white`,
    buttonGroup: "flex flex-col sm:flex-row justify-center gap-3 px-4",
    primaryButton: `${COMMON_STYLES.primaryButton} dark:bg-white dark:text-black px-6 py-3 text-[13px]`,
    secondaryButton: `${COMMON_STYLES.secondaryButton} dark:bg-black/40 dark:border-white/10 dark:text-white px-5 py-3 text-[13px]`
};

export const FooterCTA = () => {
    const [showCopyToast, setShowCopyToast] = useState(false);

    const text = "저의 기술적 여정이 귀사에 가치를 더할 수 있기를 기대합니다."

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(import.meta.env.VITE_CONTACT_EMAIL).then(() => {
            setShowCopyToast(true);
            setTimeout(() => setShowCopyToast(false), 2500);
        });
    };

    return (
        <div className={STYLES.wrapper}>
            <motion.h2
                className={STYLES.title}
                initial={{opacity: 0, y: 12}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.5, ease: "easeOut"}}
                viewport={{once: true}}
            >
                {text}
            </motion.h2>

            <motion.div
                className={STYLES.buttonGroup}
                initial={{opacity: 0, y: 12}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.5, delay: 0.15, ease: "easeOut"}}
                viewport={{once: true}}
            >

                <a
                    href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL}?subject=${encodeURIComponent('채용 문의')}`}
                    className={STYLES.primaryButton}
                >
                    <div
                        className={COMMON_STYLES.innerCard.replace('rounded-[20px] sm:rounded-[24px]', 'rounded-full') + " p-0.5"}>
                        <Plus size={10} strokeWidth={4}/>
                    </div>
                    Hire Me
                </a>
                <button className={STYLES.secondaryButton} onClick={handleCopyEmail}>
                    <Copy size={14}/> Copy Email
                </button>
                <LiquidToast isVisible={showCopyToast} message="이메일 주소가 복사되었습니다"/>
            </motion.div>
        </div>
    );
}