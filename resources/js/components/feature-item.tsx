import { Link, usePage } from '@inertiajs/react';
import {
    MessageSquare,
    Share2,
    Edit,
    Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import UpvoteDownvoteItem from '@/components/upvote-downvote-item';
import features from '@/routes/features';
import type { SharedData } from '@/types';
import type { Feature } from '@/types/feature';

interface FeatureItemProps {
    feature: Feature;
}

export default function FeatureItem({ feature }: FeatureItemProps) {
    const { auth } = usePage<SharedData>().props;
    const isOwner = auth.user?.id === feature.user?.id;

    return (
        <Card className="flex flex-row overflow-hidden bg-card transition-colors hover:border-gray-400 dark:hover:border-gray-600">
            {/* Voting Section */}
            <UpvoteDownvoteItem feature={feature} />

            {/* Content Section */}
            <div className="flex flex-1 flex-col">
                <CardHeader className="space-y-0 p-4 pb-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="cursor-pointer font-bold text-foreground hover:underline">
                                r/features
                            </span>
                            <span>•</span>
                            <span>
                                Posted by u/{feature.user?.name || 'anonymous'}
                            </span>
                            <span>•</span>
                            <span>
                                {feature.updated_at
                                    ? `Edited ${feature.updated_at}`
                                    : feature.created_at}
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
                                    <Link href={features.edit(feature.id).url}>
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
                                        href={features.destroy(feature.id).url}
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
                    <h3 className="mt-2 text-lg font-semibold">
                        {feature.name}
                    </h3>
                </CardHeader>
                <CardContent className="px-4 py-2">
                    <p className="line-clamp-3 text-sm text-muted-foreground">
                        {feature.description}
                    </p>
                </CardContent>
                <CardFooter className="flex gap-2 p-2 px-4 pt-0">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto gap-2 p-2 text-muted-foreground hover:bg-muted/50"
                    >
                        <MessageSquare className="h-4 w-4" />
                        <span className="text-xs font-bold">
                            {feature.comments_count} Comments
                        </span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto gap-2 p-2 text-muted-foreground hover:bg-muted/50"
                    >
                        <Share2 className="h-4 w-4" />
                        <span className="text-xs font-bold">Share</span>
                    </Button>
                </CardFooter>
            </div>
        </Card>
    );
}
