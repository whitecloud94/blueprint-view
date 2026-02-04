import {useMemo} from 'react'; // useMemo 추가
import {useLocation, useNavigate} from 'react-router-dom'; // 라우터 훅 추가
import {motion} from 'framer-motion';
import {Moon, Plus} from "lucide-react";
import {COMMON_STYLES} from "../../constants/styles";
import {NAV_ITEMS} from "../../data";

const STYLES = {
    wrapper: `w-full transition-all duration-500`,
    container: `${COMMON_STYLES.glassMuted} rounded-[24px] p-2 pl-4 sm:pl-6 pr-2 flex justify-between items-center relative`,
    iconGroup: `flex gap-4 sm:gap-6 text-gray-400 relative z-10`,
    navIconButton: `relative px-1 py-2 transition-all duration-300 active:scale-95 flex items-center justify-center`,
    navIcon: `sm:w-5 sm:h-5`,
    actionGroup: `flex items-center gap-2 sm:gap-3`,
    themeButton: `text-gray-400 hover:text-black transition-transform p-2 hover:rotate-12 duration-300`,
    hireButton: `${COMMON_STYLES.glassDark} px-3 sm:px-5 py-2 sm:py-2.5 rounded-[14px] sm:rounded-[16px] text-[11px] sm:text-[13px] font-bold flex items-center gap-1.5 sm:gap-2 hover:bg-black hover:scale-105 active:scale-95 transition-all`,
    plusIconWrapper: "bg-white/20 rounded-full p-0.5",
    hireMeLabel: "hidden xs:inline",
    hireLabel: "xs:hidden",
    activeBlob: "absolute inset-0 bg-indigo-50/80 rounded-xl -z-10",
    activeDot: "absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-600 rounded-full",
};

export const Navigation = () => {
    const navigate = useNavigate(); // 페이지 이동 함수
    const location = useLocation(); // 현재 URL 정보

    // 현재 URL(location.pathname)에 따라 활성화될 탭 자동 결정
    const activeTab = useMemo(() => {
        const currentPath = location.pathname;

        // 1. 블로그 페이지인 경우
        if (currentPath.startsWith('/blog')) {
            return 'Blog';
        }

        // 2. 그 외의 경우 (나중에 해시 링크 로직 등을 정교화 할 수 있음)
        // 현재는 단순하게 path가 일치하는지 확인
        const found = NAV_ITEMS.find(item => item.path === currentPath);
        return found ? found.label : 'Home';
    }, [location.pathname]);

    const scrollToElement = (targetId: string) => {
        const element = document.getElementById(targetId);
        if (element) {
            const navOffset = 100; // 네비게이션 높이 고려
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementPosition - navOffset,
                behavior: 'smooth'
            });
        }
    };

    const handleNavClick = (path: string) => {
        if (path.startsWith('/#')) {
            const targetId = path.substring(2);
            if (location.pathname !== '/') {
                navigate('/');
                // 메인 페이지 이동 후 해당 아이디로 스크롤 하기 위해 약간의 지연시간 부여
                // (페이지 전환 애니메이션 시간을 고려)
                setTimeout(() => scrollToElement(targetId), 500);
            } else {
                scrollToElement(targetId);
            }
        } else {
            navigate(path);
        }
    };

    return (
        <nav className={`${STYLES.wrapper} sticky top-0`}>
            <div className={STYLES.container}>
                <div className={STYLES.iconGroup}>
                    {NAV_ITEMS.map(({Icon, label, path}) => {
                        const isActive = activeTab === label;
                        return (
                            <button
                                key={label}
                                onClick={() => handleNavClick(path)}
                                className={`${STYLES.navIconButton} ${isActive ? 'text-indigo-600' : 'hover:text-black'}`}
                                aria-label={label}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-blob"
                                        className={STYLES.activeBlob}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 30
                                        }}
                                    >
                                        <motion.div
                                            layoutId="nav-dot"
                                            className={STYLES.activeDot}
                                        />
                                    </motion.div>
                                )}

                                <Icon size={18} className={STYLES.navIcon} />
                            </button>
                        );
                    })}
                </div>

                {/* 우측 액션 버튼 영역 (기존 유지) */}
                <div className={STYLES.actionGroup}>
                    <button className={STYLES.themeButton} aria-label="Toggle Theme">
                        <Moon size={18} className={STYLES.navIcon} />
                    </button>

                    <button className={STYLES.hireButton}>
                        <div className={STYLES.plusIconWrapper}>
                            <Plus size={10} strokeWidth={4} />
                        </div>
                        <span className={STYLES.hireMeLabel}>Hire Me</span>
                        <span className={STYLES.hireLabel}>Hire</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};