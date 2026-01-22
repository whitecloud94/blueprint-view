import React from 'react';

interface MarqueeTextProps {
    text: string;
    className?: string;
    containerHeight?: string;
}

export const MarqueeText: React.FC<MarqueeTextProps> = ({ 
    text, 
    className = "", 
    containerHeight = "h-auto" 
}) => {
    return (
        <div className={`overflow-hidden whitespace-nowrap ${containerHeight}`}>
            <div className={`inline-block hover:animate-marquee ${className}`}>
                {text}
            </div>
        </div>
    );
};
