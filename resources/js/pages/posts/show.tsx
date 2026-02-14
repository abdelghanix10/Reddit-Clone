import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Edit, Trash2 } from 'lucide-react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

import UpvoteDownvoteItem from '@/components/upvote-downvote-item';
import AppLayout from '@/layouts/app-layout';
import posts from '@/routes/posts';
import type { BreadcrumbItem, SharedData } from '@/types';
import type { Post } from '@/types/post';

type PostShowProps = {
    post: Post;
};

export default function Show({ post }: PostShowProps) {
    const { auth } = usePage<SharedData>().props;
    const isOwner = auth.user?.id === post.user?.id;
    const comments = post.comments ?? [];
    const commentCount = post.comments_count ?? post.comments?.length ?? 0;

    const { data, setData, post, processing, errors, reset } = useForm({
        content: '',
    });

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        post(posts.comments.store(post.id).url, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => reset('content'),
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Posts',
            href: posts.index().url,
        },
        {
            title: post.title,
            href: posts.show(post.id).url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={post.name} />

            <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-4">
                <Card className="flex flex-row overflow-hidden bg-card">
                    <UpvoteDownvoteItem post={post} />

                    <div className="flex flex-1 flex-col">
                        <CardHeader className="space-y-0 p-4 pb-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <span className="cursor-pointer font-bold text-foreground hover:underline">
                                        r/posts
                                    </span>
                                    <span>|</span>
                                    <span>
                                        Posted by u/
                                        {post.user?.name || 'anonymous'}
                                    </span>
                                    <span>|</span>
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
                                            <Link
                                                href={posts.edit(post.id).url}
                                            >
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
                                                href={
                                                    posts.destroy(post.id).url
                                                }
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
                            <h1 className="mt-2 text-xl font-semibold">
                                {post.name}
                            </h1>
                        </CardHeader>
                        <CardContent className="px-4 py-2">
                            <p className="text-sm whitespace-pre-line text-muted-foreground">
                                {post.description}
                            </p>
                        </CardContent>
                        <CardFooter className="p-2 px-4 pt-0 text-xs text-muted-foreground">
                            {commentCount} Comment
                            {commentCount === 1 ? '' : 's'}
                        </CardFooter>
                    </div>
                </Card>

                <section className="space-y-4">
                    <h2 className="text-lg font-semibold">Add a comment</h2>
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-2 rounded-lg border border-muted bg-card p-4"
                    >
                        <Textarea
                            value={data.content}
                            onChange={(event) =>
                                setData('content', event.target.value)
                            }
                            placeholder="What are your thoughts?"
                            className="min-h-28 resize-y"
                            maxLength={2000}
                            required
                        />
                        <InputError message={errors.content} />
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                                {data.content.length}/2000
                            </span>
                            <Button
                                type="submit"
                                disabled={processing || !data.content.trim()}
                            >
                                {processing ? 'Posting...' : 'Post Comment'}
                            </Button>
                        </div>
                    </form>

                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-muted-foreground">
                            {commentCount} Comment
                            {commentCount === 1 ? '' : 's'}
                        </h3>

                        {comments.length === 0 && (
                            <div className="rounded-lg border border-dashed bg-card py-10 text-center text-sm text-muted-foreground">
                                No comments yet. Be the first to add one.
                            </div>
                        )}

                        {comments.map((comment) => {
                            const isCommentOwner =
                                auth.user?.id === comment.user?.id;

                            return (
                                <Card
                                    key={comment.id}
                                    className="border-muted bg-card"
                                >
                                    <CardHeader className="p-3 pb-2">
                                        <div className="flex items-start justify-between gap-2 text-xs text-muted-foreground">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="font-semibold text-foreground">
                                                    u/
                                                    {comment.user?.name ||
                                                        'anonymous'}
                                                </span>
                                                <span>|</span>
                                                <span>
                                                    {comment.updated_at
                                                        ? `Edited ${comment.updated_at}`
                                                        : comment.created_at}
                                                </span>
                                            </div>
                                            {isCommentOwner && (
                                                <Button
                                                    asChild
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7 text-muted-foreground hover:text-destructive"
                                                >
                                                    <Link
                                                        href={
                                                            posts.comments.destroy(
                                                                {
                                                                    post: post.id,
                                                                    comment:
                                                                        comment.id,
                                                                },
                                                            ).url
                                                        }
                                                        method="delete"
                                                        as="button"
                                                        preserveScroll
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                    </Link>
                                                </Button>
                                            )}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="px-3 pt-0 pb-3 text-sm text-foreground">
                                        {comment.content}
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
