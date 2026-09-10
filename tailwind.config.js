import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Brand accent — IDE syntax-blue. Swap this one entry to rebrand the whole site.
                accent: colors.sky,
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
            },
            animation: {
                marquee: 'marquee 10s linear infinite',
            },
            typography: {
                DEFAULT: {
                    css: {
                        // 타이포그래피 플러그인은 인라인 코드 양옆에 백틱을 그려 넣는다
                        // (code::before/after 의 content). 마크다운 원문 표기를 결과
                        // 화면에 한 번 더 보여주는 셈이라, 글에서는 `STARTED` 처럼
                        // 읽힌다. 코드라는 사실은 글꼴과 색으로 이미 드러난다.
                        'code::before': { content: 'none' },
                        'code::after': { content: 'none' },
                    },
                },
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
