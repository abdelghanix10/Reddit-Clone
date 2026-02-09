import { Head, InfiniteScroll, Link } from '@inertiajs/react';

import { Plus } from 'lucide-react';
import FeatureItem from '@/components/feature-item';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import features from '@/routes/features';
import type { BreadcrumbItem, PaginatedResponse } from '@/types';
import type { Feature } from '@/types/feature';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Features',
        href: features.index().url,
    },
];

export default function Index({
    features: featuresData,
}: {
    features: PaginatedResponse<Feature>;
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Features" />

            <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 p-4">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Features</h2>
                    <Button asChild className="rounded-full">
                        <Link href={features.create().url}>
                            <Plus className="mr-2 h-4 w-4" />
                            Create Feature
                        </Link>
                    </Button>
                </div>

                <InfiniteScroll
                    data="features"
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
                    {featuresData.data.map((feature) => (
                        <FeatureItem key={feature.id} feature={feature} />
                    ))}
                </InfiniteScroll>

                {featuresData.data.length === 0 && (
                    <div className="rounded-lg border border-dashed bg-card py-12 text-center text-muted-foreground">
                        No features found. Be the first to create one!
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
