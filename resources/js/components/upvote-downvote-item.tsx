import { useForm } from '@inertiajs/react';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import posts from '@/routes/posts';
import type { Post } from '@/types/post';

interface UpvoteDownvoteItemProps {
    post: Post;
}

export default function UpvoteDownvoteItem({ post }: UpvoteDownvoteItemProps) {
    const upvoteForm = useForm({
        upvote: true,
    });
    const downvoteForm = useForm({
        upvote: false,
    });
    const upvoteDownvote = (upvote: boolean) => {
        const form = upvote ? upvoteForm : downvoteForm;
        if (
            (post.user_has_upvoted && upvote) ||
            (post.user_has_downvoted && !upvote)
        ) {
            form.delete(posts.upvote(post.id).url, {
                preserveScroll: true,
            });
        } else {
            form.post(posts.upvote(post.id).url, {
                preserveScroll: true,
            });
        }
    };

    return (
        <div className="flex w-12 flex-col items-center gap-1 bg-muted/30 p-2">
            <Button
                variant="ghost"
                size="icon"
                onClick={() => upvoteDownvote(true)}
                className="h-8 w-8 hover:cursor-pointer hover:bg-transparent hover:text-orange-600"
            >
                <ArrowBigUp
                    className={`h-6 w-6 ${post.user_has_upvoted ? 'text-orange-600' : ''}`}
                />
            </Button>
            <span className="text-xs font-bold">{post.upvotes_count}</span>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => upvoteDownvote(false)}
                className="h-8 w-8 hover:cursor-pointer hover:bg-transparent hover:text-blue-600"
            >
                <ArrowBigDown
                    className={`h-6 w-6 ${post.user_has_downvoted ? 'text-blue-600' : ''}`}
                />
            </Button>
        </div>
    );
}
