import {useEffect, useRef, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {Search} from "lucide-react";

interface SearchBarProps {
    className?: string;
}

export const SearchBar = ({ className = "" }: SearchBarProps) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    // 검색창이 열릴 때 자동으로 포커스
    useEffect(() => {
        if (isSearchOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isSearchOpen]);

    const handleToggle = () => {
        setIsSearchOpen(!isSearchOpen);
    };

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
                    backgroundColor: isSearchOpen ? 'rgba(0, 0, 0, 0.06)' : 'transparent',
                    borderColor: isSearchOpen ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                }}
                className="flex items-center overflow-hidden rounded-full border border-transparent"
                transition={{ type: "spring", stiffness: 600, damping: 40 }}
            >
                <button
                    onClick={handleToggle}
                    className={`p-2 shrink-0 transition-colors flex items-center justify-center ${
                        isSearchOpen ? 'text-black' : 'text-gray-400 hover:text-black'
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
                            placeholder="검색어를 입력해주세요"
                            className="bg-transparent border-none outline-none text-[13px] text-gray-900 placeholder:text-gray-400 font-medium pl-1 pr-4 w-full"
                        />
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};
