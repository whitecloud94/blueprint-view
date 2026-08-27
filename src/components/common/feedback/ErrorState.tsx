import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { COMMON_STYLES, GLASS_STYLES } from '../../../constants/styles';

interface ErrorStateProps {
  icon: LucideIcon;
  /** HTTP 상태 코드 등 짧은 식별자. 없으면 배지를 그리지 않는다. */
  code?: string;
  /** 배지에 함께 표시할 영문 라벨. */
  label?: string;
  title: string;
  description: string;
  /** 버튼 등 복구 동선. 화면마다 갈 곳이 달라 호출자가 정한다. */
  actions?: ReactNode;
  className?: string;
}

/**
 * 오류·빈 상태를 알리는 카드.
 *
 * <p>404, 403, 렌더링 실패, 조회 실패가 각자 다른 모양으로 흩어져 있으면 사용자는
 * 매번 새로운 화면을 만난다. 한 컴포넌트로 모아 형태를 고정하고, 상황별로 달라지는
 * 것은 문구와 복구 동선만 남긴다.
 *
 * <p>장식을 더하지 않고 기존 카드/섹션 헤더 표기를 그대로 쓴다. 오류 화면은
 * 무슨 일이 일어났고 다음에 무엇을 할 수 있는지가 먼저다.
 */
export const ErrorState = ({
  icon: Icon,
  code,
  label,
  title,
  description,
  actions,
  className = '',
}: ErrorStateProps) => (
  <div
    role="alert"
    className={`${GLASS_STYLES.card} w-full max-w-[480px] px-8 py-12 sm:px-10 flex flex-col items-center gap-5 text-center ${className}`}
  >
    <span className="w-14 h-14 rounded-2xl bg-accent-50 dark:bg-accent-500/10 flex items-center justify-center text-accent-500 dark:text-accent-400">
      <Icon size={26} aria-hidden="true" />
    </span>

    {code && (
      <div className={COMMON_STYLES.sectionHeader}>
        <span className={COMMON_STYLES.dot} />
        <span className="font-mono">{label ? `${code} · ${label}` : code}</span>
      </div>
    )}

    <div className="space-y-2">
      <h1 className={`${GLASS_STYLES.heading} text-2xl sm:text-[28px] leading-tight`}>{title}</h1>
      <p className={`${GLASS_STYLES.subtext} text-sm leading-relaxed`}>{description}</p>
    </div>

    {actions && <div className="flex flex-wrap items-center justify-center gap-2 pt-1">{actions}</div>}
  </div>
);

/** 오류 화면에서 반복되는 버튼 표기. 화면마다 크기가 달라지지 않도록 고정한다. */
export const ERROR_ACTION_STYLES = {
  primary: `${COMMON_STYLES.primaryButton} dark:bg-white dark:text-black px-5 py-2.5 text-sm`,
  secondary: `${COMMON_STYLES.secondaryButton} dark:bg-white/10 dark:text-white dark:border-white/15 px-5 py-2.5 text-sm`,
};
