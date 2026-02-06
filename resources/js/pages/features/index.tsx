import { Head } from '@inertiajs/react';

import FeatureItem from '@/components/feature-item';
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

export default function Index({ features }: { features: PaginatedResponse<Feature> }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Features" />

            <div className="flex flex-col gap-4 p-4 max-w-4xl mx-auto">
                {features.data.map((feature) => (
                    <FeatureItem key={feature.id} feature={feature} />
                ))}

                {features.data.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        No features found.
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
