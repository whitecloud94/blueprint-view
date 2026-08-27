import { motion } from 'framer-motion';
import { FolderOpen, Hash, Home, RotateCw } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GLASS_STYLES } from '../../../constants/styles';
import { useBlogNavigation } from '../hooks/useBlogNavigation';

const TAG_PATH_PREFIX = '/blog/tags/';

const STYLES = {
  sectionLabel:
    'text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest px-3 mb-2',
  item: 'relative flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-xl transition-colors z-10 text-left',
  itemActive: 'text-accent-600 dark:text-accent-400',
  itemIdle: 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white',
  count: 'ml-auto text-xs tabular-nums opacity-60',
  // 태그가 늘어나도 사이드바가 화면 밖으로 밀려나지 않도록 목록만 스크롤시킨다.
  list: 'flex flex-col gap-1 max-h-[46vh] overflow-y-auto custom-scrollbar pr-1',
};

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  count: number;
  isActive: boolean;
  onSelect: () => void;
}

const NavItem = ({ icon: Icon, label, count, isActive, onSelect }: NavItemProps) => (
  <button
    type="button"
    onClick={onSelect}
    aria-current={isActive ? 'page' : undefined}
    className={`${STYLES.item} ${isActive ? STYLES.itemActive : STYLES.itemIdle}`}
  >
    {/* 활성 항목을 따라 움직이는 배경. 같은 layoutId 라 항목 사이를 이어서 이동한다. */}
    {isActive && (
      <motion.div
        layoutId="sidebar-active"
        className="absolute inset-0 bg-accent-50 dark:bg-accent-900/30 rounded-xl -z-10"
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
    )}
    <Icon size={16} strokeWidth={isActive ? 2.5 : 2} className="shrink-0" />
    <span className="truncate">{label}</span>
    <span className={STYLES.count}>{count}</span>
  </button>
);

/**
 * 블로그 사이드바.
 *
 * <p>분류 목록은 태그를 그대로 쓴다. 글 8건 규모에서 태그와 별개의 분류 체계를
 * 하나 더 두면, 글을 쓸 때마다 두 곳에 분류를 채워 넣어야 하고 둘이 어긋나기 시작한다.
 *
 * <p>활성 항목은 컴포넌트 상태가 아니라 현재 주소에서 끌어낸다. 상태로 들고 있으면
 * 카드나 본문의 태그를 눌러 이동했을 때 사이드바만 이전 항목을 가리킨 채 남는다.
 */
export const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state, retry } = useBlogNavigation();

  // 슬러그에 한글이 쓰이므로 주소에서 꺼낼 때 디코딩한다.
  const activeSlug = pathname.startsWith(TAG_PATH_PREFIX)
    ? decodeURIComponent(pathname.slice(TAG_PATH_PREFIX.length))
    : null;
  const isAllActive = pathname === '/blog';

  return (
    <aside className={`${GLASS_STYLES.card} p-6 h-fit sticky top-28 flex flex-col gap-8`}>
      <div
        className="flex items-center gap-3 px-2 cursor-pointer group"
        onClick={() => navigate('/')}
      >
        <div className="w-10 h-10 rounded-full bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center text-accent-600 dark:text-accent-400 font-bold text-sm group-hover:bg-accent-600 dark:group-hover:bg-accent-500 group-hover:text-white transition-all">
          DK
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
            Whitecloud
          </h3>
          <p className="text-xs text-gray-400 dark:text-gray-500">DAEKYOUNG KIM</p>
        </div>
      </div>

      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 dark:text-gray-200 bg-white/50 dark:bg-white/5 border border-white/80 dark:border-white/10 rounded-xl hover:bg-white dark:hover:bg-white/10 hover:shadow-sm transition-all"
      >
        <Home size={18} className="text-accent-600 dark:text-accent-400" />
        Back to Portfolio
      </button>

      <nav className="flex flex-col gap-2" aria-label="글 분류">
        <h4 className={STYLES.sectionLabel}>Categories</h4>

        {state.status === 'loading' && <NavSkeleton />}

        {state.status === 'failed' && (
          <div className="px-4 py-2 space-y-2">
            <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
              분류를 불러오지 못했습니다.
            </p>
            <button
              type="button"
              onClick={retry}
              className="flex items-center gap-1.5 text-xs font-bold text-accent-600 dark:text-accent-400 hover:underline"
            >
              <RotateCw size={13} aria-hidden="true" />
              다시 시도
            </button>
          </div>
        )}

        {state.status === 'ready' && (
          <div className={STYLES.list}>
            <NavItem
              icon={FolderOpen}
              label="All Posts"
              count={state.data.totalPostCount}
              isActive={isAllActive}
              onSelect={() => navigate('/blog')}
            />
            {state.data.tags.map((tag) => (
              <NavItem
                key={tag.slug}
                icon={Hash}
                label={tag.name}
                count={tag.postCount}
                isActive={activeSlug === tag.slug}
                onSelect={() => navigate(`${TAG_PATH_PREFIX}${encodeURIComponent(tag.slug)}`)}
              />
            ))}
          </div>
        )}
      </nav>
    </aside>
  );
};

/** 불러오는 동안 자리를 잡아 둔다. 목록이 갑자기 나타나며 사이드바가 밀리지 않게 한다. */
const NavSkeleton = () => (
  <div className="flex flex-col gap-1 px-4" aria-hidden="true">
    {[1, 2, 3, 4, 5].map((row) => (
      <div key={row} className="h-8 rounded-lg bg-gray-100 dark:bg-white/5 animate-pulse" />
    ))}
  </div>
);
