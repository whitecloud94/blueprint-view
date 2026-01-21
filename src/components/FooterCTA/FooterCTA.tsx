import {Copy, Plus} from 'lucide-react';
import { COMMON_STYLES } from "../../constants/styles";

const STYLES = {
    wrapper: "text-center space-y-6 mb-12 px-2",
    title: `text-[28px] sm:text-[36px] px-4 leading-tight ${COMMON_STYLES.title}`,
    buttonGroup: "flex flex-col sm:flex-row justify-center gap-3 px-4",
    primaryButton: `${COMMON_STYLES.primaryButton} px-6 py-3 text-[13px]`,
    secondaryButton: `${COMMON_STYLES.secondaryButton} px-5 py-3 text-[13px]`
};

export const FooterCTA = () => (
    <div className={STYLES.wrapper}>
        <h2 className={STYLES.title}>Do you like me? <br/> I’m always prepared😎</h2>
        <div className={STYLES.buttonGroup}>
            <button className={STYLES.primaryButton}>
                <div className="bg-white/20 rounded-full p-0.5"><Plus size={10} strokeWidth={4}/></div>
                Hire Me
            </button>
            <button className={STYLES.secondaryButton}>
                <Copy size={14}/> Copy Email
            </button>
        </div>
    </div>
);
