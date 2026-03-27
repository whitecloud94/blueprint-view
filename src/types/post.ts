export interface PostSaveRequest {
    titleName: string;
    content: string;
    excerpt?: string;
    boardStatusCode?: string;
}

export interface PostSaveResponse extends PostSaveRequest {
    postId: number;
    writerName: string;
    createdAt: string;
}