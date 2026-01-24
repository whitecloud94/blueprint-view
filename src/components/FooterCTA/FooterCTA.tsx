import {useState} from 'react';
import {Plus, Copy} from 'lucide-react';
import {COMMON_STYLES} from "../../constants/styles.ts";
import {LiquidToast} from "../popup/LiquidToast.tsx";

const STYLES = {
    wrapper: "text-center space-y-6 mb-12 px-2",
    title: `text-[28px] sm:text-[36px] px-4 leading-tight ${COMMON_STYLES.title}`,
    buttonGroup: "flex flex-col sm:flex-row justify-center gap-3 px-4",
    primaryButton: `${COMMON_STYLES.primaryButton} px-6 py-3 text-[13px]`,
    secondaryButton: `${COMMON_STYLES.secondaryButton} px-5 py-3 text-[13px]`
};

export const FooterCTA = () => {
    const [showToast, setShowToast] = useState(false);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('ajemfld1@gmail.com').then(() => {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2500); // 2.5초 후 자동 소멸
        });
    };
    return (
        <div className={STYLES.wrapper}>
            <h2 className={STYLES.title}>Do you like me? <br/> I’m always prepared😎</h2>
            <div className={STYLES.buttonGroup}>
                <button className={STYLES.primaryButton}>
                    <div
                        className={COMMON_STYLES.innerCard.replace('rounded-[20px] sm:rounded-[24px]', 'rounded-full') + " p-0.5"}>
                        <Plus size={10} strokeWidth={4}/></div>
                    Hire Me
                </button>
                <button className={STYLES.secondaryButton}
                        onClick={handleCopyEmail}>
                    <Copy size={14}/> Copy Email
                </button>
                <LiquidToast isVisible={showToast} message="이메일 주소가 복사되었습니다"/>
            </div>
        </div>
    );

}
