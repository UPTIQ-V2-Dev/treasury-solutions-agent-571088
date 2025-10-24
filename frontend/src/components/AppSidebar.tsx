import { Building2, FileText, Home, Package, Settings, Upload, Users, History } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarFooter
} from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/useAuth';

interface NavItem {
    title: string;
    url: string;
    icon: React.ComponentType<any>;
    requireAdmin?: boolean;
}

const navItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/',
        icon: Home
    },
    {
        title: 'Upload Statements',
        url: '/upload',
        icon: Upload
    }
];

const clientItems: NavItem[] = [
    {
        title: 'Client Management',
        url: '/clients',
        icon: Users
    }
];

const analysisItems: NavItem[] = [
    {
        title: 'Product Catalog',
        url: '/products',
        icon: Package
    }
];

const reportItems: NavItem[] = [
    {
        title: 'Generate Reports',
        url: '/reports',
        icon: FileText
    },
    {
        title: 'Report History',
        url: '/reports/history',
        icon: History
    }
];

const adminItems: NavItem[] = [
    {
        title: 'System Configuration',
        url: '/admin',
        icon: Settings,
        requireAdmin: true
    },
    {
        title: 'Audit Trail',
        url: '/admin/audit',
        icon: FileText,
        requireAdmin: true
    }
];

interface AppSidebarProps {
    className?: string;
}

export const AppSidebar = ({ className }: AppSidebarProps) => {
    const location = useLocation();
    const { user } = useAuth();
    const isAdmin = user?.role === 'ADMIN';

    const isActive = (url: string) => {
        if (url === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(url);
    };

    const renderNavSection = (items: NavItem[], title: string) => {
        const filteredItems = items.filter(item => !item.requireAdmin || (item.requireAdmin && isAdmin));

        if (filteredItems.length === 0) return null;

        return (
            <SidebarGroup>
                <SidebarGroupLabel>{title}</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {filteredItems.map(item => (
                            <SidebarMenuItem key={item.url}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={isActive(item.url)}
                                    className='w-full'
                                >
                                    <Link to={item.url}>
                                        <item.icon className='h-4 w-4' />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        );
    };

    return (
        <Sidebar className={className}>
            <SidebarHeader className='border-b'>
                <div className='flex items-center gap-2 px-4 py-2'>
                    <Building2 className='h-6 w-6 text-primary' />
                    <span className='font-semibold text-lg'>Treasury Solutions</span>
                </div>
            </SidebarHeader>

            <SidebarContent>
                {renderNavSection(navItems, 'Main')}
                {renderNavSection(clientItems, 'Clients')}
                {renderNavSection(analysisItems, 'Analysis')}
                {renderNavSection(reportItems, 'Reports')}
                {renderNavSection(adminItems, 'Administration')}
            </SidebarContent>

            <SidebarFooter className='border-t'>
                <div className='px-4 py-2 text-xs text-muted-foreground'>
                    <p>Logged in as</p>
                    <p className='font-medium truncate'>{user?.name || user?.email}</p>
                    <p className='text-xs capitalize'>{user?.role?.toLowerCase()}</p>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
};
