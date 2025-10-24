import { useQuery } from '@tanstack/react-query';
import { Upload, Users, FileText, TrendingUp, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useNavigate } from 'react-router-dom';
import { treasuryService } from '@/services/treasury';

export const DashboardPage = () => {
    const navigate = useNavigate();

    const {
        data: metrics,
        isLoading,
        error
    } = useQuery({
        queryKey: ['dashboard-metrics'],
        queryFn: treasuryService.getDashboardMetrics,
        refetchInterval: 30000 // Refresh every 30 seconds
    });

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'upload':
                return <Upload className='h-4 w-4' />;
            case 'analysis':
                return <FileText className='h-4 w-4' />;
            case 'recommendation':
                return <TrendingUp className='h-4 w-4' />;
            case 'approval':
                return <Users className='h-4 w-4' />;
            default:
                return <FileText className='h-4 w-4' />;
        }
    };

    const getActivityColor = (type: string) => {
        switch (type) {
            case 'upload':
                return 'text-blue-600';
            case 'analysis':
                return 'text-purple-600';
            case 'recommendation':
                return 'text-green-600';
            case 'approval':
                return 'text-orange-600';
            default:
                return 'text-gray-600';
        }
    };

    if (error) {
        return (
            <div className='container max-w-4xl mx-auto py-8 px-4'>
                <Alert>
                    <AlertCircle className='h-4 w-4' />
                    <AlertDescription>Failed to load dashboard data. Please try refreshing the page.</AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className='container max-w-7xl mx-auto py-8 px-4 space-y-8'>
            {/* Header */}
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                <div>
                    <h1 className='text-3xl font-bold'>Treasury Solutions Dashboard</h1>
                    <p className='text-muted-foreground'>
                        Monitor client analyses and treasury optimization opportunities
                    </p>
                </div>
                <Button
                    onClick={() => navigate('/upload')}
                    className='gap-2'
                >
                    <Upload className='h-4 w-4' />
                    New Analysis
                </Button>
            </div>

            {/* Key Metrics */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>Total Clients</CardTitle>
                        <Users className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className='h-8 w-16' />
                        ) : (
                            <div className='text-2xl font-bold'>{metrics?.totalClients || 0}</div>
                        )}
                        <p className='text-xs text-muted-foreground'>Active relationships</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>Active Analyses</CardTitle>
                        <FileText className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className='h-8 w-16' />
                        ) : (
                            <div className='text-2xl font-bold'>{metrics?.activeAnalyses || 0}</div>
                        )}
                        <p className='text-xs text-muted-foreground'>In progress</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>Pending Recommendations</CardTitle>
                        <TrendingUp className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className='h-8 w-16' />
                        ) : (
                            <div className='text-2xl font-bold'>{metrics?.pendingRecommendations || 0}</div>
                        )}
                        <p className='text-xs text-muted-foreground'>Awaiting review</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>Potential Savings</CardTitle>
                        <TrendingUp className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className='h-8 w-24' />
                        ) : (
                            <div className='text-2xl font-bold'>
                                {formatCurrency(metrics?.totalPotentialSavings || 0)}
                            </div>
                        )}
                        <p className='text-xs text-muted-foreground'>Annual opportunity</p>
                    </CardContent>
                </Card>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                {/* Recent Activity */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Latest client activities and analyses</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className='space-y-3'>
                                {[1, 2, 3, 4].map(i => (
                                    <div
                                        key={i}
                                        className='flex items-center space-x-3'
                                    >
                                        <Skeleton className='h-8 w-8 rounded' />
                                        <div className='flex-1 space-y-1'>
                                            <Skeleton className='h-4 w-3/4' />
                                            <Skeleton className='h-3 w-1/2' />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='space-y-3'>
                                {metrics?.recentActivity.map(activity => (
                                    <div
                                        key={activity.id}
                                        className='flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50'
                                    >
                                        <div className={`p-1.5 rounded ${getActivityColor(activity.type)}`}>
                                            {getActivityIcon(activity.type)}
                                        </div>
                                        <div className='flex-1 min-w-0'>
                                            <p className='text-sm font-medium truncate'>{activity.clientName}</p>
                                            <div className='flex items-center gap-2'>
                                                <p className='text-xs text-muted-foreground'>
                                                    {activity.type.replace('_', ' ')}
                                                </p>
                                                <Badge
                                                    variant={
                                                        activity.status === 'completed'
                                                            ? 'default'
                                                            : activity.status === 'processing'
                                                              ? 'secondary'
                                                              : activity.status === 'approved'
                                                                ? 'default'
                                                                : 'outline'
                                                    }
                                                    className='text-xs'
                                                >
                                                    {activity.status.replace('_', ' ')}
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className='text-xs text-muted-foreground'>
                                            {formatDate(activity.timestamp)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Top Opportunities */}
                <Card>
                    <CardHeader>
                        <CardTitle>Top Opportunities</CardTitle>
                        <CardDescription>Highest potential savings by client</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className='space-y-3'>
                                {[1, 2, 3].map(i => (
                                    <div
                                        key={i}
                                        className='flex items-center justify-between p-2'
                                    >
                                        <div className='space-y-1'>
                                            <Skeleton className='h-4 w-32' />
                                            <Skeleton className='h-3 w-20' />
                                        </div>
                                        <Skeleton className='h-6 w-20' />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='space-y-3'>
                                {metrics?.topOpportunities.map((opportunity, index) => (
                                    <div
                                        key={index}
                                        className='flex items-center justify-between p-2 rounded-lg hover:bg-muted/50'
                                    >
                                        <div className='flex-1 min-w-0'>
                                            <p className='text-sm font-medium truncate'>{opportunity.clientName}</p>
                                            <div className='flex items-center gap-2'>
                                                <Badge
                                                    variant='outline'
                                                    className='text-xs'
                                                >
                                                    {opportunity.productCategory}
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className='text-right'>
                                            <p className='text-sm font-semibold text-green-600'>
                                                {formatCurrency(opportunity.potentialSavings)}
                                            </p>
                                            <p className='text-xs text-muted-foreground'>annual savings</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common tasks and workflows</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                        <Button
                            variant='outline'
                            onClick={() => navigate('/upload')}
                            className='h-auto p-6 flex flex-col items-center gap-3'
                        >
                            <Upload className='h-8 w-8' />
                            <div className='text-center'>
                                <div className='font-medium'>Upload Statements</div>
                                <div className='text-sm text-muted-foreground'>Start new analysis</div>
                            </div>
                        </Button>

                        <Button
                            variant='outline'
                            onClick={() => navigate('/clients')}
                            className='h-auto p-6 flex flex-col items-center gap-3'
                        >
                            <Users className='h-8 w-8' />
                            <div className='text-center'>
                                <div className='font-medium'>Manage Clients</div>
                                <div className='text-sm text-muted-foreground'>View client relationships</div>
                            </div>
                        </Button>

                        <Button
                            variant='outline'
                            onClick={() => navigate('/reports')}
                            className='h-auto p-6 flex flex-col items-center gap-3'
                        >
                            <FileText className='h-8 w-8' />
                            <div className='text-center'>
                                <div className='font-medium'>Generate Reports</div>
                                <div className='text-sm text-muted-foreground'>Create client summaries</div>
                            </div>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
