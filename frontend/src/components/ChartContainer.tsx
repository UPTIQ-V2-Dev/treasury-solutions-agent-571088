import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface ChartContainerProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    isLoading?: boolean;
    className?: string;
    actions?: React.ReactNode;
}

export const ChartContainer = ({
    title,
    description,
    children,
    isLoading = false,
    className = '',
    actions
}: ChartContainerProps) => {
    return (
        <Card className={className}>
            <CardHeader>
                <div className='flex items-center justify-between'>
                    <div>
                        <CardTitle className='text-lg'>{title}</CardTitle>
                        {description && <CardDescription>{description}</CardDescription>}
                    </div>
                    {actions && <div className='flex items-center gap-2'>{actions}</div>}
                </div>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className='space-y-3'>
                        <Skeleton className='h-4 w-full' />
                        <Skeleton className='h-32 w-full' />
                        <div className='flex justify-between'>
                            <Skeleton className='h-4 w-16' />
                            <Skeleton className='h-4 w-16' />
                            <Skeleton className='h-4 w-16' />
                            <Skeleton className='h-4 w-16' />
                        </div>
                    </div>
                ) : (
                    children
                )}
            </CardContent>
        </Card>
    );
};
