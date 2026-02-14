import { Link, usePage } from '@inertiajs/react';
import { MessageSquare, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import UpvoteDownvoteItem from '@/components/upvote-downvote-item';
import posts from '@/routes/posts';
import type { SharedData } from '@/types';
import type { Post } from '@/types/post';

interface PostItemProps {
    post: Post;
}

export default function PostItem({ post }: PostItemProps) {
    const { auth } = usePage<SharedData>().props;
    const isOwner = auth.user?.id === post.user?.id;

    return (
        <Card className="flex flex-row overflow-hidden bg-card transition-colors hover:border-gray-400 dark:hover:border-gray-600">
            {/* Voting Section */}
            <UpvoteDownvoteItem post={post} />

            {/* Content Section */}
            <div className="flex flex-1 flex-col">
                <CardHeader className="space-y-0 p-4 pb-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="cursor-pointer font-bold text-foreground hover:underline">
                                r/posts
                            </span>
                            <span>•</span>
                            <span>
                                Posted by u/{post.user?.name || 'anonymous'}
                            </span>
                            <span>•</span>
                            <span>
                                {post.updated_at
                                    ? `Edited ${post.updated_at}`
                                    : post.created_at}
                            </span>
                        </div>
                        {isOwner && (
                            <div className="flex gap-1">
                                <Button
                                    asChild
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 text-muted-foreground hover:text-foreground"
                                >
                                    <Link href={posts.edit(post.id).url}>
                                        <Edit className="h-3.5 w-3.5" />
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 text-muted-foreground hover:text-destructive"
                                >
                                    <Link
                                        href={posts.destroy(post.id).url}
                                        method="delete"
                                        as="button"
                                        className="h-7 w-7 text-muted-foreground hover:text-destructive"
                                        preserveScroll
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </div>
                    <h3 className="mt-2 text-lg font-semibold">{post.name}</h3>
                </CardHeader>
                <CardContent className="px-4 py-2">
                    <p className="line-clamp-3 text-sm text-muted-foreground">
                        {post.description}
                    </p>
                </CardContent>
                <CardFooter className="flex gap-2 p-2 px-4 pt-0">
                    <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="h-auto gap-2 p-2 text-muted-foreground hover:bg-muted/50"
                    >
                        <Link href={posts.show(post.id).url}>
                            <MessageSquare className="h-4 w-4" />
                            <span className="text-xs font-bold">
                                {post.comments_count} Comments
                            </span>
                        </Link>
                    </Button>
                </CardFooter>
            </div>
        </Card>
    );
}
