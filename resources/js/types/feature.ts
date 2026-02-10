import type { User } from '@/types/auth';

export type Feature = {
    id: number;
    name: string;
    description: string;
    user: User;
    upvotes_count: number;
    comments_count: number;
    user_has_upvoted: boolean;
    user_has_downvoted: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}
