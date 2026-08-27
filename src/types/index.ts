import { ReactNode } from 'react';

export interface Project {
  id?: number;
  title: string;
  period: string;
  sub: string;
  icon: ReactNode;
  bg: string;
  active?: boolean;
  /** CLAUDE.md 우선순위 프로젝트. Projects 리스트에서 강조 표시된다. */
  featured?: boolean;
  achievements?: string[];
  tech: string[];
}


export interface ProjectItemProps {
  title: string;
  sub: string;
  icon: ReactNode;
  bg: string;
  active?: boolean;
  featured?: boolean;
  onClick?: () => void;
  className?: string;
  rightIcon?: ReactNode;
}
