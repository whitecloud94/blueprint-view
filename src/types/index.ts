import { ReactNode } from "react";

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

export interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    content?: string;
    date: string;
    readTime: string;
    tags: string[];
    relatedProjectId?: number;
}

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
