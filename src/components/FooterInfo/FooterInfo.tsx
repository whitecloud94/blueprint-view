import React from 'react';

const STYLES = {
    wrapper: "mt-10 sm:mt-12 text-center space-y-2 pb-4 px-4",
    text: "text-[11px] sm:text-[12px] text-gray-400 font-medium",
    subText: "text-[11px] sm:text-[12px] text-gray-300",
    link: "underline decoration-gray-300"
};

export const FooterInfo = () => (
    <div className={STYLES.wrapper}>
        <p className={STYLES.text}>© Made by DAEKYOUNG KIM</p>
        <p className={STYLES.subText}>Designed by <span className={STYLES.link}>Gemini (Thank you)</span>
        </p>
    </div>
);
