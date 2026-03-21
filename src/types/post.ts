export interface PostSaveRequest {
    title: string;
    content: string;
    // tags: string[];
}

export interface PostSaveResponse extends PostSaveRequest {
    id: number;
    writerName: string;
    createdAt: string;
}