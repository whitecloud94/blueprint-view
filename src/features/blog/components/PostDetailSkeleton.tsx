// src/features/blog/components/PostDetailSkeleton.tsx
import {GLASS_STYLES} from '../../../constants/styles';
import {ArrowLeft} from 'lucide-react';

export const PostDetailSkeleton = () => {
    return (
        <div className="space-y-8 animate-pulse">
            {/* Navigation skeleton */}
            <div className="space-y-6">
                <div className="flex items-center gap-2 text-gray-300 font-bold text-sm">
                    <ArrowLeft size={18} />
                    <div className="w-20 h-4 bg-gray-200 dark:bg-gray-800 rounded" />
                </div>

                <div className="space-y-4">
                    {/* Related project badge skeleton */}
                    <div className="w-48 h-6 bg-gray-100 dark:bg-gray-800/50 rounded-full" />
                    
                    {/* Title skeleton */}
                    <div className="w-3/4 h-12 bg-gray-200 dark:bg-gray-800 rounded" />
                    <div className="w-1/2 h-12 bg-gray-200 dark:bg-gray-800 rounded" />
                    
                    {/* Meta info skeleton */}
                    <div className="flex items-center gap-4">
                        <div className="w-32 h-4 bg-gray-200 dark:bg-gray-800 rounded" />
                        <div className="w-1 h-1 rounded-full bg-gray-300" />
                        <div className="w-32 h-4 bg-gray-200 dark:bg-gray-800 rounded" />
                    </div>
                </div>
            </div>

            {/* Content skeleton */}
            <div className={`${GLASS_STYLES.card} bg-white/80 p-8 sm:p-12`}>
                <div className="space-y-4">
                    <div className="w-full h-4 bg-gray-200 dark:bg-gray-800 rounded" />
                    <div className="w-full h-4 bg-gray-200 dark:bg-gray-800 rounded" />
                    <div className="w-5/6 h-4 bg-gray-200 dark:bg-gray-800 rounded" />
                    <div className="w-full h-4 bg-gray-200 dark:bg-gray-800 rounded mt-8" />
                    <div className="w-4/5 h-4 bg-gray-200 dark:bg-gray-800 rounded" />
                    <div className="w-full h-4 bg-gray-200 dark:bg-gray-800 rounded" />
                </div>
            </div>
        </div>
    );
};
