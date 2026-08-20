import {useEffect, useRef, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {Search} from "lucide-react";
import {useToast} from "../../hooks/useToast.ts";
import {LiquidToast} from "../common/feedback/LiquidToast.tsx";
import {useTheme} from "../../context/ThemeContext.tsx";

interface SearchBarProps {
    className?: string;
}

export const SearchBar = ({ className = "" }: SearchBarProps) => {
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

    const handleToggle = () => {
        setIsSearchOpen(!isSearchOpen);
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
                    onClick={handleToggle}
                    className={`p-2 shrink-0 transition-colors flex items-center justify-center ${
                        isSearchOpen ? 'text-black dark:text-white' : 'text-gray-400 hover:text-black dark:hover:text-white'
                    }`}
                    aria-label="Search"
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
                                if (e.key === 'Enter') {
                                    showToast("검색 기능은 준비 중이에요");
                                }
                            }}
                            placeholder="검색어를 입력해주세요"
                            className="bg-transparent border-none outline-none text-[13px] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 font-medium pl-1 pr-4 w-full"
                        />
                    )}
                </AnimatePresence>
            </motion.div>
            <LiquidToast isVisible={isVisible} message={message} />
        </div>
    );
};
