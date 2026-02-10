import { useForm } from '@inertiajs/react';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import features from '@/routes/features';
import type { Feature } from '@/types/feature';

interface UpvoteDownvoteItemProps {
    feature: Feature;
}

export default function UpvoteDownvoteItem({
    feature,
}: UpvoteDownvoteItemProps) {
    const upvoteForm = useForm({
        upvote: true,
    });
    const downvoteForm = useForm({
        upvote: false,
    });
    const upvoteDownvote = (upvote: boolean) => {
        const form = upvote ? upvoteForm : downvoteForm;
        if (
            (feature.user_has_upvoted && upvote) ||
            (feature.user_has_downvoted && !upvote)
        ) {
            form.delete(features.upvote(feature.id).url, {
                preserveScroll: true,
            });
        } else {
            form.post(features.upvote(feature.id).url, {
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
                    className={`h-6 w-6 ${feature.user_has_upvoted ? 'text-orange-600' : ''}`}
                />
            </Button>
            <span className="text-xs font-bold">{feature.upvotes_count}</span>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => upvoteDownvote(false)}
                className="h-8 w-8 hover:cursor-pointer hover:bg-transparent hover:text-blue-600"
            >
                <ArrowBigDown
                    className={`h-6 w-6 ${feature.user_has_downvoted ? 'text-blue-600' : ''}`}
                />
            </Button>
        </div>
    );
}
