import { Head, InfiniteScroll, Link } from '@inertiajs/react';

import { Plus } from 'lucide-react';
import PostItem from '@/components/post-item';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import posts from '@/routes/posts';
import type { BreadcrumbItem, PaginatedResponse } from '@/types';
import type { Post } from '@/types/post';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: posts.index().url,
    },
];

export default function Index({
    posts: postsData,
}: {
    posts: PaginatedResponse<Post>;
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />

            <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 p-4">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Posts</h2>
                    <Button asChild className="rounded-full">
                        <Link href={posts.create().url}>
                            <Plus className="mr-2 h-4 w-4" />
                            Create Post
                        </Link>
                    </Button>
                </div>

                <InfiniteScroll
                    data="posts"
                    manualAfter={3}
                    buffer={300}
                    previous={({ loading, fetch, hasMore }) =>
                        hasMore && (
                            <Button
                                variant="ghost"
                                className="w-full border"
                                onClick={fetch}
                                disabled={loading}
                            >
                                {loading ? 'Loading...' : 'Load previous'}
                            </Button>
                        )
                    }
                    next={({ loading, fetch, hasMore }) =>
                        hasMore && (
                            <Button
                                variant="ghost"
                                className="w-full border"
                                onClick={fetch}
                                disabled={loading}
                            >
                                {loading ? 'Loading...' : 'Load more'}
                            </Button>
                        )
                    }
                >
                    {postsData.data.map((post) => (
                        <PostItem key={post.id} post={post} />
                    ))}
                </InfiniteScroll>

                {postsData.data.length === 0 && (
                    <div className="rounded-lg border border-dashed bg-card py-12 text-center text-muted-foreground">
                        No posts found. Be the first to create one!
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
