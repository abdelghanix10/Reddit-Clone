import { Link, usePage } from '@inertiajs/react';
import { ArrowBigDown, ArrowBigUp, MessageSquare, Share2, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
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
        <Card className="flex flex-row overflow-hidden hover:border-gray-400 dark:hover:border-gray-600 transition-colors bg-card">
            {/* Voting Section */}
            <div className="flex flex-col items-center gap-1 p-2 bg-muted/30 w-12">
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-orange-600 hover:bg-transparent">
                    <ArrowBigUp className="h-6 w-6" />
                </Button>
                <span className="text-xs font-bold">{feature.upvotes_count}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-blue-600 hover:bg-transparent">
                    <ArrowBigDown className="h-6 w-6" />
                </Button>
            </div>

            <div className="flex-1 flex flex-col">
                <CardHeader className="p-4 pb-2 space-y-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="font-bold text-foreground hover:underline cursor-pointer">r/features</span>
                            <span>•</span>
                            <span>Posted by u/{feature.user?.name || 'anonymous'}</span>
                            <span>•</span>
                            <span>{feature.updated_at ? `Edited ${feature.updated_at}` : feature.created_at}</span>
                        </div>
                        {isOwner && (
                            <div className="flex gap-1">
                                <Button asChild variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                                    <Link href={features.edit(feature.id).url}>
                                        <Edit className="h-3.5 w-3.5" />
                                    </Link>
                                </Button>
                                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive">
                                    <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        )}
                    </div>
                    <h3 className="text-lg font-semibold mt-2">{feature.name}</h3>
                </CardHeader>
                <CardContent className="px-4 py-2">
                    <p className="text-sm line-clamp-3 text-muted-foreground">{feature.description}</p>
                </CardContent>
                <CardFooter className="p-2 px-4 pt-0 flex gap-2">
                    <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:bg-muted/50 p-2 h-auto">
                        <MessageSquare className="h-4 w-4" />
                        <span className="text-xs font-bold">{feature.comments_count} Comments</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:bg-muted/50 p-2 h-auto">
                        <Share2 className="h-4 w-4" />
                        <span className="text-xs font-bold">Share</span>
                    </Button>
                </CardFooter>
            </div>
        </Card>
    );
}





