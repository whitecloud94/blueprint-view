// src/features/blog/components/PostCardSkeleton.tsx
import {COMMON_STYLES} from '../../../constants/styles';

export const PostCardSkeleton = () => {
    return (
        <div className={`${COMMON_STYLES.card} p-6 sm:p-8 animate-pulse`}>
            {/* Meta info skeleton */}
            <div className="flex items-center gap-3 mb-4">
                <div className="w-24 h-4 bg-gray-200 dark:bg-gray-800 rounded" />
                <div className="w-1 h-1 rounded-full bg-gray-300" />
                <div className="w-24 h-4 bg-gray-200 dark:bg-gray-800 rounded" />
            </div>
            
            {/* Title skeleton */}
            <div className="w-3/4 h-8 bg-gray-200 dark:bg-gray-800 rounded mb-3" />
            
            {/* Excerpt skeleton */}
            <div className="w-full h-4 bg-gray-200 dark:bg-gray-800 rounded mb-2" />
            <div className="w-5/6 h-4 bg-gray-200 dark:bg-gray-800 rounded mb-6" />
            
            {/* Footer skeleton */}
            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    <div className="w-12 h-6 bg-gray-200 dark:bg-gray-800 rounded-lg" />
                    <div className="w-12 h-6 bg-gray-200 dark:bg-gray-800 rounded-lg" />
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800" />
            </div>
        </div>
    );
};
