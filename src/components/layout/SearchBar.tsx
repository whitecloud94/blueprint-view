import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AnimatePresence, motion} from 'framer-motion';
import {Search} from "lucide-react";
import {useToast} from "../../hooks/useToast.ts";
import {LiquidToast} from "../common/feedback/LiquidToast.tsx";
import {useTheme} from "../../context/ThemeContext.tsx";

interface SearchBarProps {
    className?: string;
}

/**
 * 상단 검색.
 *
 * <p>입력한 순간마다 조회하지 않는다. 본문까지 훑는 질의라 타이핑마다 보내면
 * 버려질 조회가 대부분이고, 한글은 조합 중인 글자까지 요청을 만든다.
 * 제출(Enter/돋보기 클릭) 시점에만 검색한다.
 *
 * <p>검색어는 결과 화면의 URL 로 넘긴다. 이 컴포넌트가 결과를 들고 있으면
 * 페이지를 옮길 때마다 사라지고, 공유·북마크도 되지 않는다.
 */
export const SearchBar = ({ className = "" }: SearchBarProps) => {
    const navigate = useNavigate();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const {isVisible, message, showToast} = useToast();
    const {theme} = useTheme();

    // 검색창이 열릴 때 자동으로 포커스
    useEffect(() => {
        if (isSearchOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isSearchOpen]);

    /** 닫힌 상태의 돋보기는 열기 버튼, 열린 상태에서는 제출 버튼으로 쓴다. */
    const handleIconClick = () => {
        if (!isSearchOpen) {
            setIsSearchOpen(true);
            return;
        }
        submitSearch();
    };

    const submitSearch = () => {
        const keyword = searchValue.trim();
        if (!keyword) {
            showToast("검색어를 입력해주세요");
            return;
        }

        navigate(`/blog/search?q=${encodeURIComponent(keyword)}`);
        setSearchValue("");
        setIsSearchOpen(false);
        inputRef.current?.blur();
    };

    const pillBg = theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';
    const pillBorder = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)';

    return (
        <div
            className={`flex items-center ${className}`}
            onMouseEnter={() => setIsSearchOpen(true)}
            onMouseLeave={() => !searchValue && !isFocused && setIsSearchOpen(false)}
        >
            <motion.div
                initial={false}
                animate={{
                    width: isSearchOpen ? (typeof window !== 'undefined' && window.innerWidth < 640 ? 180 : 240) : 40,
                    backgroundColor: isSearchOpen ? pillBg : 'transparent',
                    borderColor: isSearchOpen ? pillBorder : 'transparent',
                }}
                className="flex items-center overflow-hidden rounded-full border border-transparent"
                transition={{ type: "spring", stiffness: 600, damping: 40 }}
            >
                <button
                    onClick={handleIconClick}
                    className={`p-2 shrink-0 transition-colors flex items-center justify-center ${
                        isSearchOpen ? 'text-black dark:text-white' : 'text-gray-400 hover:text-black dark:hover:text-white'
                    }`}
                    aria-label={isSearchOpen ? "검색" : "검색창 열기"}
                >
                    <Search size={18} className="sm:w-5 sm:h-5" />
                </button>
                
                <AnimatePresence>
                    {isSearchOpen && (
                        <motion.input
                            ref={inputRef}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            onKeyDown={(e) => {
                                // 한글 입력 중에는 Enter 가 조합 확정에 쓰인다. 여기서
                                // 가로채면 첫 Enter 로 덜 만들어진 글자가 검색된다.
                                if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                                    submitSearch();
                                } else if (e.key === 'Escape') {
                                    setSearchValue("");
                                    setIsSearchOpen(false);
                                    inputRef.current?.blur();
                                }
                            }}
                            placeholder="검색어를 입력해주세요"
                            aria-label="검색어"
                            className="bg-transparent border-none outline-none text-[13px] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 font-medium pl-1 pr-4 w-full"
                        />
                    )}
                </AnimatePresence>
            </motion.div>
            <LiquidToast isVisible={isVisible} message={message} />
        </div>
    );
};
