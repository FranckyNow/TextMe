export interface Article {
    id?: string;
    userId: string;
    type: string;
    ask: string;
    article: string;
    dateArticle: Date;
    totalPrice: number;
    issue: string | null;
    appreciation: boolean | null;
    state: 'start' | 'free' | 'paid';
}
