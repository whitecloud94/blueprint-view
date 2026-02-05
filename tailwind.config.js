
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
            },
            animation: {
                marquee: 'marquee 10s linear infinite',
            },
            fontFamily: {
                // 기본 본문용 (Pretendard 기반)
                sans: ['Pretendard', 'ui-sans-serif', 'system-ui'],
                // 제목용 (영문 Inter + 국문 Gmarket Sans 조합 추천)
                title: ['Inter', 'GmarketSansBold', 'Pretendard', 'sans-serif'],
                // 개발자 포인트용 (JetBrains Mono)
                mono: ['"JetBrains Mono"', 'monospace'],
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],

}
