import { Bell, LogOut, Moon, Sun, User } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/useAuth';

export const AppHeader = () => {
    const { user, logout } = useAuth();
    const { theme, setTheme } = useTheme();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const getUserInitials = (name?: string, email?: string) => {
        if (name) {
            return name
                .split(' ')
                .map(part => part.charAt(0))
                .slice(0, 2)
                .join('')
                .toUpperCase();
        }
        if (email) {
            return email.charAt(0).toUpperCase();
        }
        return 'U';
    };

    return (
        <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
            <div className='flex h-14 items-center px-4 lg:px-6'>
                <SidebarTrigger className='mr-4' />

                <div className='flex-1' />

                {/* Right side - Actions */}
                <div className='flex items-center gap-2'>
                    {/* Theme Toggle */}
                    <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                        className='h-8 w-8 px-0'
                    >
                        <Sun className='h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                        <Moon className='absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
                        <span className='sr-only'>Toggle theme</span>
                    </Button>

                    {/* Notifications */}
                    <Button
                        variant='ghost'
                        size='sm'
                        className='h-8 w-8 px-0'
                    >
                        <Bell className='h-4 w-4' />
                        <span className='sr-only'>Notifications</span>
                    </Button>

                    {/* User Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant='ghost'
                                className='relative h-8 w-8 rounded-full'
                            >
                                <Avatar className='h-8 w-8'>
                                    <AvatarImage
                                        src=''
                                        alt={user?.name || user?.email}
                                    />
                                    <AvatarFallback className='text-xs'>
                                        {getUserInitials(user?.name, user?.email)}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className='w-56'
                            align='end'
                            forceMount
                        >
                            <DropdownMenuLabel className='font-normal'>
                                <div className='flex flex-col space-y-1'>
                                    <p className='text-sm font-medium leading-none'>{user?.name || 'User'}</p>
                                    <p className='text-xs leading-none text-muted-foreground'>{user?.email}</p>
                                    <div className='flex items-center gap-2 pt-1'>
                                        <Badge
                                            variant={user?.role === 'ADMIN' ? 'default' : 'secondary'}
                                            className='text-xs'
                                        >
                                            {user?.role?.toLowerCase()}
                                        </Badge>
                                        {user?.isEmailVerified && (
                                            <Badge
                                                variant='outline'
                                                className='text-xs'
                                            >
                                                Verified
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <User className='mr-2 h-4 w-4' />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={handleLogout}
                                className='text-red-600 focus:text-red-600'
                            >
                                <LogOut className='mr-2 h-4 w-4' />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
};
