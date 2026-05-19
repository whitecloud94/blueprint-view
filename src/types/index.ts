import { ReactNode } from 'react';
import { Post } from '../schemas/postSchema';

export interface Project {
  id?: number;
  title: string;
  period: string;
  sub: string;
  icon: ReactNode;
  bg: string;
  active?: boolean;
  achievements?: string[];
  tech: string[];
  blogId?: number;
}

/** 목업/UI 전용 확장 필드 (DB 스키마에 없음) */
export type PostDisplay = Post & {
  readTime?: string;
  tags?: string[];
  relatedProjectId?: number;
};

export interface ProjectItemProps {
  title: string;
  sub: string;
  icon: ReactNode;
  bg: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
  rightIcon?: ReactNode;
}
