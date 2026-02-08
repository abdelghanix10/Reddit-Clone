import { Head, useForm } from '@inertiajs/react';
import {
    FileText,
    Image as ImageIcon,
    Link as LinkIcon,
    BarChart2,
} from 'lucide-react';
import React, { useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import features from '@/routes/features';
import type { BreadcrumbItem } from '@/types';
import type { Feature } from '@/types/feature';

type Tab = 'text' | 'media' | 'link' | 'poll';

export default function Edit({ feature }: { feature: { data: Feature } }) {
    const [activeTab, setActiveTab] = useState<Tab>('text');
    const { data, setData, put, processing, errors } = useForm({
        name: feature.data.name || '',
        description: feature.data.description || '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Features',
            href: features.index().url,
        },
        {
            title: 'Edit',
            href: features.edit(feature.data.id).url,
        },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(features.update(feature.data.id).url);
    };

    const tabs = [
        {
            id: 'text',
            label: 'Text',
            icon: <FileText className="mr-2 h-4 w-4" />,
        },
        {
            id: 'media',
            label: 'Images & Video',
            icon: <ImageIcon className="mr-2 h-4 w-4" />,
        },
        {
            id: 'link',
            label: 'Link',
            icon: <LinkIcon className="mr-2 h-4 w-4" />,
        },
        {
            id: 'poll',
            label: 'Poll',
            icon: <BarChart2 className="mr-2 h-4 w-4" />,
            disabled: true,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${feature.data.name}`} />

            <div className="mx-auto max-w-185 p-4 md:p-6">
                <div className="mb-4 flex items-center justify-between border-b border-muted pb-4">
                    <h1 className="text-xl font-medium">Edit post</h1>
                </div>

                <div className="overflow-hidden rounded-md border border-muted bg-background">
                    <div className="flex overflow-x-auto border-b border-muted">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() =>
                                    !tab.disabled && setActiveTab(tab.id as Tab)
                                }
                                className={`flex items-center border-b-2 px-4 py-3 text-sm font-bold whitespace-nowrap transition-colors ${
                                    activeTab === tab.id
                                        ? 'border-primary text-primary'
                                        : 'border-transparent text-muted-foreground hover:bg-muted/50'
                                } ${tab.disabled ? 'cursor-not-allowed opacity-50' : ''}`}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 p-4">
                        <div className="relative">
                            <Input
                                placeholder="Title*"
                                className="h-12 rounded-md border-muted bg-background py-3 pr-12 text-sm focus-visible:border-muted focus-visible:ring-0"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                maxLength={300}
                                required
                            />
                            <div className="pointer-events-none absolute right-3 bottom-3 text-[10px] font-medium text-muted-foreground">
                                {data.name.length}/300
                            </div>
                        </div>
                        <InputError message={errors.name} />

                        {activeTab === 'text' && (
                            <div className="overflow-hidden rounded-md border border-muted">
                                <div className="flex flex-wrap items-center gap-1 border-b border-muted bg-muted/30 p-2">
                                    <button
                                        type="button"
                                        className="rounded p-1.5 text-muted-foreground hover:bg-muted/50"
                                    >
                                        <b>B</b>
                                    </button>
                                    <button
                                        type="button"
                                        className="rounded p-1.5 text-muted-foreground italic hover:bg-muted/50"
                                    >
                                        <i>i</i>
                                    </button>
                                    <button
                                        type="button"
                                        className="rounded p-1.5 text-muted-foreground line-through hover:bg-muted/50"
                                    >
                                        S
                                    </button>
                                    <button
                                        type="button"
                                        className="rounded p-1.5 text-muted-foreground hover:bg-muted/50"
                                    >
                                        X²
                                    </button>
                                    <button
                                        type="button"
                                        className="rounded p-1.5 text-lg text-muted-foreground hover:bg-muted/50"
                                    >
                                        T
                                    </button>
                                    <div className="mx-1 h-6 w-px bg-muted" />
                                    <button
                                        type="button"
                                        className="rounded p-1.5 text-muted-foreground hover:bg-muted/50"
                                    >
                                        <LinkIcon className="h-4 w-4" />
                                    </button>
                                    <button
                                        type="button"
                                        className="rounded p-1.5 text-muted-foreground hover:bg-muted/50"
                                    >
                                        <ImageIcon className="h-4 w-4" />
                                    </button>
                                    <div className="mx-1 h-6 w-px bg-muted" />
                                    <button
                                        type="button"
                                        className="rounded p-1.5 text-muted-foreground hover:bg-muted/50"
                                    >
                                        ...
                                    </button>
                                </div>
                                <Textarea
                                    placeholder="Body text (optional)"
                                    className="min-h-50 resize-y border-none p-3 focus-visible:ring-0"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                />
                            </div>
                        )}

                        <InputError message={errors.description} />

                        <div className="flex justify-end gap-2 border-t border-muted pt-2">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => window.history.back()}
                                className="rounded-full px-4 py-2 font-bold text-muted-foreground hover:bg-muted/50"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing || !data.name}
                                className="rounded-full px-6 py-2 font-bold"
                            >
                                Update
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
