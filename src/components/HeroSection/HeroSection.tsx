import React from 'react';
import {Plus, Copy} from 'lucide-react';

const STYLES = {
    wrapper: "mb-10 sm:mb-14 relative",
    content: "flex flex-col-reverse sm:flex-row justify-between items-center sm:items-start gap-8 sm:gap-4 text-center sm:text-left",
    title: "text-[32px] sm:text-[42px] font-bold tracking-tight text-[#1A1A1A] leading-tight",
    description: "text-gray-500 text-[15px] sm:text-[17px] leading-[1.6] max-w-[380px] mx-auto sm:mx-0",
    highlight: "relative ml-1.5 inline-block",
    highlightText: "relative z-10 text-indigo-600 font-bold italic",
    highlightBg: "absolute bottom-0.5 left-0 w-full h-[8px] bg-indigo-50 -rotate-1",
    buttonGroup: "flex justify-center sm:justify-start gap-3 pt-2",
    primaryButton: "bg-[#1A1A1A] text-white px-5 py-3 rounded-[16px] sm:rounded-[18px] text-[12px] sm:text-[13px] font-bold flex items-center gap-2 shadow-xl shadow-black/10 hover:bg-black transition-all hover:-translate-y-0.5",
    secondaryButton: "bg-white border border-gray-200 text-[#1A1A1A] px-5 py-3 rounded-[16px] sm:rounded-[18px] text-[12px] sm:text-[13px] font-bold flex items-center gap-2 hover:bg-gray-50 transition-colors",
    avatarWrapper: "flex flex-col items-center gap-4 flex-shrink-0",
    avatarContainer: "relative",
    avatarImage: "w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#F2F2F2] border-[4px] sm:border-[6px] border-[#FAFAFA] overflow-hidden shadow-inner",
    badge: "bg-[#F5F3FF] text-[#7C3AED] px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wide flex items-center gap-1.5 border border-[#EDE9FE] shadow-sm",
    badgeDot: "w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-bounce",
    sectionHeader: "flex items-center gap-2 text-[13px] sm:text-[14px] text-gray-400 font-medium",
    dot: "w-1.5 h-1.5 rounded-full bg-gray-300",
};

export const HeroSection = () => (
    <section className={STYLES.wrapper}>
        <div className="flex justify-between items-center mb-8">
            <div className={STYLES.sectionHeader}>
                <div className={STYLES.dot}/>
                Developer
            </div>
        </div>

        <div className={STYLES.content}>
            <div className="space-y-6 w-full">
                <div className="space-y-3">
                    <h1 className={STYLES.title}>
                        HI,<br/> I’m Daekyoung KIM
                    </h1>
                    <p className={STYLES.description}>
                        Software Engineer focused on turning complex problems into simple, functional code.
                        Currently crafting experiences as a
                        <span className={STYLES.highlight}>
                                            <span className={STYLES.highlightText}>freelancer.</span>
                                            <span className={STYLES.highlightBg}></span>
                                        </span>
                    </p>
                </div>
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

            <div className={STYLES.avatarWrapper}>
                <div className={STYLES.avatarContainer}>
                    <div className={STYLES.avatarImage}>
                        <img src="/src/resource/img/MyPhoto.jpg" alt="Profile"
                             className="w-full h-full object-cover object-center"/>
                    </div>
                </div>
                <div className={STYLES.badge}>
                    <div className={STYLES.badgeDot}/>
                    RUNTIME: WORKING🔥
                </div>
            </div>
        </div>
    </section>
);
