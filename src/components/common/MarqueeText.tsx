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
        <div className={`relative overflow-hidden whitespace-nowrap ${containerHeight}`}>
            {/* 정적 상태: 말줄임표로 잘림을 표시. 호버가 없는 터치 기기의 기본이자 유일한 표현이다. */}
            <div className={`truncate group-hover:invisible ${className}`}>
                {text}
            </div>
            {/* 호버 시에만: 원문 전체를 옆으로 흘려 보여준다. 포인터 기기 전용 보너스. */}
            <div className={`absolute top-0 left-0 w-max invisible group-hover:visible group-hover:animate-marquee ${className}`}>
                {text}
            </div>
        </div>
    );
};
