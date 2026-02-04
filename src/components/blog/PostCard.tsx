// src/components/blog/PostCard.tsx
import {ArrowUpRight, Briefcase, Calendar, Clock} from 'lucide-react';
import {GLASS_STYLES} from '../../constants/styles';
import {useNavigate} from "react-router-dom";

interface PostProps {
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    tags: string[];
    relatedProjectId?: number;
}

export const PostCard = ({title, excerpt, date, readTime, tags, relatedProjectId}: PostProps) => {
    const navigate = useNavigate();

    const handleProjectClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // 카드 자체의 클릭 이벤트 방지
        navigate(`/#projects`);
    };

    return (
        <article
            className={`${GLASS_STYLES.card} ${GLASS_STYLES.cardHover} p-6 sm:p-8 group cursor-pointer relative overflow-hidden`}>
            {/* 관련 프로젝트 배지 (있을 경우) */}
            {relatedProjectId && (
                <button 
                    onClick={handleProjectClick}
                    className="absolute top-0 right-0 px-4 py-2 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-bl-2xl flex items-center gap-1.5 hover:bg-indigo-700 transition-colors z-10"
                >
                    <Briefcase size={12} />
                    View Project
                </button>
            )}

            {/* 상단 메타 정보 */}
            <div className="flex items-center gap-3 text-xs text-gray-400 mb-4 font-mono">
                <span className="flex items-center gap-1">
                    <Calendar size={12}/> {date}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-300"/>
                <span className="flex items-center gap-1">
                    <Clock size={12}/> {readTime}
                </span>
            </div>

            {/* 제목 & 요약 */}
            <h2 className={`${GLASS_STYLES.heading} text-2xl mb-3 group-hover:text-indigo-600 transition-colors`}>
                {title}
            </h2>
            <p className={`${GLASS_STYLES.subtext} leading-relaxed mb-6 line-clamp-2`}>
                {excerpt}
            </p>

            {/* 하단 태그 & 화살표 */}
            <div className="flex items-center justify-between">
                <div className="flex gap-2">
                    {tags.map((tag) => (
                        <span key={tag}
                              className="px-2.5 py-1 text-[11px] font-medium text-gray-500 bg-white/50 rounded-lg border border-white/20">
                            #{tag}
                        </span>
                    ))}
                </div>
                <div
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    <ArrowUpRight size={16}/>
                </div>
            </div>
        </article>
    );
};