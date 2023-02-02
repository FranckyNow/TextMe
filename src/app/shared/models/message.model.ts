export interface Message {
    id?: string;
    userId: string;
    type: string;
    message: string;
    date: Date;
    articleId: string | null;
    finish: boolean;
}
