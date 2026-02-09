import { Head, useForm } from '@inertiajs/react';
import {
    FileText,
    Image as ImageIcon,
    Link as LinkIcon,
    BarChart2,
    ChevronDown,
    Info,
} from 'lucide-react';
import React, { useState } from 'react';

import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import features from '@/routes/features';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Features',
        href: features.index().url,
    },
    {
        title: 'Create',
        href: features.create().url,
    },
];

type Tab = 'text' | 'media' | 'link' | 'poll';

export default function Create() {
    const [activeTab, setActiveTab] = useState<Tab>('text');
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
    });

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        post(features.store().url, {
            preserveScroll: true,
        });
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
            <Head title="Create Feature" />

            <div className="mx-auto max-w-185 p-4 md:p-6">
                <div className="mb-4 flex items-center justify-between border-b border-muted pb-4">
                    <h1 className="text-xl font-medium">Create post</h1>
                    <Button
                        variant="ghost"
                        className="px-0 text-sm font-bold text-muted-foreground hover:bg-transparent"
                    >
                        Drafts{' '}
                        <Badge className="ml-1 h-4 min-w-4 border-none bg-muted px-1.5 py-0 text-[10px] text-muted-foreground hover:bg-muted">
                            0
                        </Badge>
                    </Button>
                </div>

                <div className="mb-4">
                    <Button
                        variant="outline"
                        className="flex h-10 items-center gap-2 rounded-full border-muted bg-background px-4"
                    >
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
                            <span className="text-[10px] font-bold">r/</span>
                        </div>
                        <span className="text-sm font-semibold">
                            Select a community
                        </span>
                        <ChevronDown className="h-4 w-4" />
                    </Button>
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

                        <div className="flex gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                className="h-8 rounded-full border-muted bg-muted/20 px-3 text-xs font-bold"
                            >
                                Add tags
                            </Button>
                        </div>

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

                        {activeTab === 'media' && (
                            <div className="flex min-h-75 flex-col items-center justify-center rounded-md border-2 border-dashed border-muted bg-muted/10 p-6">
                                <div className="space-y-4 text-center text-muted-foreground">
                                    <div className="flex justify-center">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/30">
                                            <ImageIcon className="h-8 w-8 opacity-50" />
                                        </div>
                                    </div>
                                    <p className="text-lg font-medium">
                                        Drag and Drop or upload media
                                    </p>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="rounded-full border-muted font-bold text-foreground"
                                    >
                                        Upload
                                    </Button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'link' && (
                            <div className="relative">
                                <Textarea
                                    placeholder="Link URL *"
                                    className="min-h-14 overflow-hidden rounded-md border-muted bg-background py-3 pr-12 text-sm focus-visible:border-muted focus-visible:ring-0"
                                    required
                                />
                            </div>
                        )}

                        <InputError message={errors.description} />

                        <div className="flex justify-end gap-2 border-t border-muted pt-2">
                            <Button
                                type="button"
                                variant="ghost"
                                className="rounded-full px-4 py-2 font-bold text-muted-foreground hover:bg-muted/50"
                            >
                                Save Draft
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing || !data.name}
                                className="rounded-full px-6 py-2 font-bold"
                            >
                                Post
                            </Button>
                        </div>
                    </form>
                </div>

                <div className="mt-4 flex gap-4 text-xs font-medium text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <input
                            type="checkbox"
                            id="send-replies"
                            className="rounded border-muted bg-transparent"
                            defaultChecked
                        />
                        <label htmlFor="send-replies">
                            Send me post reply notifications
                        </label>
                    </div>
                    <div className="flex items-center gap-1">
                        <button className="text-blue-500 hover:underline">
                            Connect accounts to share your post
                        </button>
                        <Info className="h-3 w-3" />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
