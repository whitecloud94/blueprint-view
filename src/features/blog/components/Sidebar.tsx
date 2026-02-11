// src/components/blog/Sidebar.tsx
import {useState} from 'react';
import {motion} from 'framer-motion';
import {FolderOpen, Hash, Home, User} from 'lucide-react';
import {GLASS_STYLES} from '../../../constants/styles';
import {useNavigate} from "react-router-dom";

const CATEGORIES = [
    {id: 'all', label: 'All Posts', icon: FolderOpen},
    {id: 'dev', label: 'Engineering', icon: Hash},
    {id: 'life', label: 'Life & Hobby', icon: User},
];

export const Sidebar = () => {
    const [activeId, setActiveId] = useState('all');
    const navigate = useNavigate();

    return (
        <aside className={`${GLASS_STYLES.card} p-6 h-fit sticky top-28 flex flex-col gap-8`}>
            {/* 프로필 영역 */}
            <div 
                className="flex items-center gap-3 px-2 cursor-pointer group"
                onClick={() => navigate('/')}
            >
                <div
                    className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    DK
                </div>
                <div>
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">Daekyeong Lee</h3>
                    <p className="text-xs text-gray-400">5y+ Java Backend Dev</p>
                </div>
            </div>

            {/* 홈으로 이동 버튼 (명시적) */}
            <button
                onClick={() => navigate('/')}
                className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 bg-white/50 border border-white/80 rounded-xl hover:bg-white hover:shadow-sm transition-all"
            >
                <Home size={18} className="text-indigo-600" />
                Back to Portfolio
            </button>

            {/* 카테고리 메뉴 */}
            <nav className="flex flex-col gap-2">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3 mb-2">
                    Categories
                </h4>
                {CATEGORIES.map((item) => {
                    const isActive = activeId === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveId(item.id)}
                            className={`relative flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors z-10 ${
                                isActive ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'
                            }`}
                        >
                            {/* 리퀴드 배경 애니메이션 */}
                            {isActive && (
                                <motion.div
                                    layoutId="sidebar-active"
                                    className="absolute inset-0 bg-indigo-50 rounded-xl -z-10"
                                    transition={{type: "spring", stiffness: 300, damping: 30}}
                                />
                            )}
                            <item.icon size={18} strokeWidth={isActive ? 2.5 : 2}/>
                            {item.label}
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
};