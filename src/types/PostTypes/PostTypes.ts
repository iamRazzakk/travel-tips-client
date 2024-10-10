export interface IPost {
    _id: string;
    title: string;
    content: string;
    markdownContent?: string;
    images: string[];
    category: string;
    isPremium: boolean;
    userId: string;
    tags?: string[];
    status?: 'published' | 'draft' | 'deleted';
}
