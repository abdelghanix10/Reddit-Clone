import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    Briefcase,
    CircleHelp,
    Code,
    Compass,
    Info,
    Megaphone,
    Mic2,
    Newspaper,
    Star,
    TrendingUp,
    Users,
} from 'lucide-react';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import posts from '@/routes/posts';
import type { NavItem, SharedData } from '@/types';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Popular',
        href: posts.index().url,
        icon: TrendingUp,
    },
    {
        title: 'News',
        href: '#',
        icon: Newspaper,
    },
    {
        title: 'Explore',
        href: '#',
        icon: Compass,
    },
];

const resourceNavItems: NavItem[] = [
    {
        title: 'About ForumX',
        href: '#',
        icon: Info,
    },
    {
        title: 'Advertise',
        href: '#',
        icon: Megaphone,
    },
    {
        title: 'Developer Platform',
        href: '#',
        icon: Code,
    },
    {
        title: 'ForumX Pro',
        href: '#',
        icon: Star,
        badge: 'BETA',
    },
    {
        title: 'Help',
        href: '#',
        icon: CircleHelp,
    },
    {
        title: 'Blog',
        href: '#',
        icon: BookOpen,
    },
    {
        title: 'Careers',
        href: '#',
        icon: Briefcase,
    },
    {
        title: 'Press',
        href: '#',
        icon: Mic2,
    },
];

const communityNavItems: NavItem[] = [
    {
        title: 'Communities',
        href: '#',
        icon: Users,
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/">
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} title="FEEDS" />
                <NavMain items={resourceNavItems} title="RESOURCES" />
                <NavMain items={communityNavItems} title="COMMUNITIES" />
            </SidebarContent>

            <SidebarFooter>{auth.user && <NavUser />}</SidebarFooter>
        </Sidebar>
    );
}
