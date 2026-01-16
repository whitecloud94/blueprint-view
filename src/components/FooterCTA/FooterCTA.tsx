import React from 'react';
import {Plus, Copy} from 'lucide-react';

const STYLES = {
    wrapper: "text-center space-y-6 mb-12 px-2",
    title: "text-[28px] sm:text-[36px] font-bold text-[#1A1A1A] tracking-tight px-4",
    buttonGroup: "flex flex-col sm:flex-row justify-center gap-3 px-4",
    primaryButton: "bg-[#1A1A1A] text-white px-6 py-3 rounded-[16px] sm:rounded-[18px] text-[13px] font-bold flex items-center justify-center gap-2 shadow-xl shadow-black/10 hover:scale-105 transition-transform",
    secondaryButton: "bg-white border border-gray-200 text-[#1A1A1A] px-5 py-3 rounded-[16px] sm:rounded-[18px] text-[13px] font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
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
