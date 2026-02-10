import type { User } from '@/types/auth';

export type Comment = {
    id: number;
    content: string;
    user: User;
    created_at: string;
    updated_at: string;
};
