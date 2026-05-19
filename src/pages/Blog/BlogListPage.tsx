import { useEffect, useState } from 'react';
import { PostCard } from '../../features/blog/components/PostCard';
import { PostCardSkeleton } from '../../features/blog/components/PostCardSkeleton';
import { BlogLayout } from '../../features/blog/components/BlogLayout';
import { AnimatePresence, motion } from 'framer-motion';
import { Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { COMMON_STYLES } from '../../constants/styles';
import { postService } from '../../services/postService';
import type { Post } from '../../schemas/postSchema';

export default function BlogListPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const data = await postService.getPosts();
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    void fetchPosts();
  }, []);

  return (
    <BlogLayout>
      <div className="space-y-6 relative">
        <div className="mb-8 ml-2">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Latest Posts</h1>
          <p className="text-gray-500 dark:text-gray-400">최신 포스트를 조회합니다.</p>
        </div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {[1, 2, 3].map((i) => (
                <PostCardSkeleton key={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {posts.map((post) => (
                <PostCard
                  key={post.postId}
                  post={post}
                  readTime="5 min read"
                  tags={[]}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/blog/write')}
          className={`fixed bottom-8 right-8 w-16 h-16 ${COMMON_STYLES.primaryButton} rounded-2xl shadow-2xl shadow-indigo-200 z-50`}
        >
          <Pencil size={24} />
        </motion.button>
      </div>
    </BlogLayout>
  );
}
