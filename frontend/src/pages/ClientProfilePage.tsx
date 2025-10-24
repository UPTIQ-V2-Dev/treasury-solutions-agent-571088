import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, Calendar, FileText, TrendingUp, Upload, User, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { treasuryService } from '@/services/treasury';
import type { Client } from '@/types/treasury';

export const ClientProfilePage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const {
        data: client,
        isLoading,
        error
    } = useQuery({
        queryKey: ['client', id],
        queryFn: () => treasuryService.getClientById(id!),
        enabled: !!id
    });

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getStatusColor = (status: Client['status']) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'inactive':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (error) {
        return (
            <div className='container max-w-4xl mx-auto py-8 px-4'>
                <Alert>
                    <AlertDescription>Failed to load client information. Please try again.</AlertDescription>
                </Alert>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className='container max-w-6xl mx-auto py-8 px-4 space-y-6'>
                <div className='flex items-center gap-4'>
                    <Skeleton className='h-8 w-8' />
                    <Skeleton className='h-8 w-48' />
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                    <Card>
                        <CardContent className='p-6 space-y-4'>
                            <Skeleton className='h-6 w-32' />
                            <Skeleton className='h-4 w-full' />
                            <Skeleton className='h-4 w-3/4' />
                            <Skeleton className='h-4 w-1/2' />
                        </CardContent>
                    </Card>
                    <div className='lg:col-span-2'>
                        <Card>
                            <CardContent className='p-6 space-y-4'>
                                <Skeleton className='h-6 w-48' />
                                <Skeleton className='h-32 w-full' />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    if (!client) {
        return (
            <div className='container max-w-4xl mx-auto py-8 px-4'>
                <Alert>
                    <AlertDescription>Client not found.</AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className='container max-w-6xl mx-auto py-8 px-4 space-y-6'>
            {/* Header */}
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                    <Button
                        variant='ghost'
                        onClick={() => navigate('/clients')}
                        className='gap-2'
                    >
                        <ArrowLeft className='h-4 w-4' />
                        Back to Clients
                    </Button>
                </div>
                <div className='flex items-center gap-2'>
                    <Button
                        variant='outline'
                        className='gap-2'
                    >
                        <Edit className='h-4 w-4' />
                        Edit Client
                    </Button>
                    <Button className='gap-2'>
                        <Upload className='h-4 w-4' />
                        Upload Statements
                    </Button>
                </div>
            </div>

            {/* Client Header */}
            <Card>
                <CardContent className='p-6'>
                    <div className='flex items-start justify-between'>
                        <div className='flex items-start gap-4'>
                            <div className='p-3 bg-primary/10 rounded-lg'>
                                <Building2 className='h-8 w-8 text-primary' />
                            </div>
                            <div>
                                <h1 className='text-3xl font-bold mb-2'>{client.name}</h1>
                                <div className='flex items-center gap-3 mb-4'>
                                    <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
                                    <span className='text-sm text-muted-foreground'>
                                        Client since {formatDate(client.createdAt)}
                                    </span>
                                </div>
                                <div className='space-y-2 text-sm text-muted-foreground'>
                                    <div className='flex items-center gap-2'>
                                        <User className='h-4 w-4' />
                                        <span>
                                            Relationship Manager: <strong>{client.relationshipManager}</strong>
                                        </span>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <Calendar className='h-4 w-4' />
                                        <span>Last updated: {formatDate(client.updatedAt)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Main Content */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {/* Sidebar - Client Info */}
                <div className='space-y-6'>
                    <Card>
                        <CardHeader>
                            <CardTitle className='text-lg'>Account Information</CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <div>
                                <h4 className='font-medium mb-2'>Associated Accounts</h4>
                                <div className='space-y-2'>
                                    {client.accountIds.map((accountId, index) => (
                                        <div
                                            key={index}
                                            className='p-2 bg-muted rounded text-sm'
                                        >
                                            {accountId}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className='font-medium mb-2'>Client Details</h4>
                                <div className='space-y-2 text-sm'>
                                    <div className='flex justify-between'>
                                        <span className='text-muted-foreground'>Client ID:</span>
                                        <span className='font-mono'>{client.id}</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span className='text-muted-foreground'>Status:</span>
                                        <Badge
                                            variant='outline'
                                            className={getStatusColor(client.status)}
                                        >
                                            {client.status}
                                        </Badge>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span className='text-muted-foreground'>Accounts:</span>
                                        <span>{client.accountIds.length} account(s)</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className='text-lg'>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-2'>
                            <Button
                                variant='outline'
                                className='w-full justify-start gap-2'
                                onClick={() => navigate(`/upload?clientId=${client.id}`)}
                            >
                                <Upload className='h-4 w-4' />
                                Upload New Statements
                            </Button>
                            <Button
                                variant='outline'
                                className='w-full justify-start gap-2'
                            >
                                <TrendingUp className='h-4 w-4' />
                                View Recommendations
                            </Button>
                            <Button
                                variant='outline'
                                className='w-full justify-start gap-2'
                            >
                                <FileText className='h-4 w-4' />
                                Generate Report
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Area */}
                <div className='lg:col-span-2'>
                    <Tabs
                        defaultValue='overview'
                        className='space-y-6'
                    >
                        <TabsList className='grid w-full grid-cols-4'>
                            <TabsTrigger value='overview'>Overview</TabsTrigger>
                            <TabsTrigger value='analyses'>Analyses</TabsTrigger>
                            <TabsTrigger value='recommendations'>Recommendations</TabsTrigger>
                            <TabsTrigger value='notes'>Notes</TabsTrigger>
                        </TabsList>

                        <TabsContent
                            value='overview'
                            className='space-y-6'
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle>Client Overview</CardTitle>
                                    <CardDescription>Summary of client's treasury analysis activity</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className='grid grid-cols-2 gap-6'>
                                        <div className='text-center p-4 bg-muted/50 rounded-lg'>
                                            <div className='text-2xl font-bold text-blue-600'>0</div>
                                            <div className='text-sm text-muted-foreground'>Total Analyses</div>
                                        </div>
                                        <div className='text-center p-4 bg-muted/50 rounded-lg'>
                                            <div className='text-2xl font-bold text-green-600'>$0</div>
                                            <div className='text-sm text-muted-foreground'>Potential Savings</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Recent Activity</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className='text-center py-8 text-muted-foreground'>
                                        No recent activity for this client.
                                        <div className='mt-2'>
                                            <Button
                                                variant='outline'
                                                size='sm'
                                                onClick={() => navigate(`/upload?clientId=${client.id}`)}
                                            >
                                                Upload First Statement
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent
                            value='analyses'
                            className='space-y-6'
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle>Analysis History</CardTitle>
                                    <CardDescription>Previous treasury analyses for this client</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className='text-center py-8 text-muted-foreground'>
                                        No analyses yet for this client.
                                        <div className='mt-2'>
                                            <Button
                                                variant='outline'
                                                size='sm'
                                                onClick={() => navigate(`/upload?clientId=${client.id}`)}
                                            >
                                                Start First Analysis
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent
                            value='recommendations'
                            className='space-y-6'
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle>Treasury Recommendations</CardTitle>
                                    <CardDescription>Product recommendations based on analysis results</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className='text-center py-8 text-muted-foreground'>
                                        No recommendations available yet. Complete an analysis to generate
                                        recommendations.
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent
                            value='notes'
                            className='space-y-6'
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle>Client Notes</CardTitle>
                                    <CardDescription>Internal notes and comments about this client</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className='text-center py-8 text-muted-foreground'>
                                        No notes added yet.
                                        <div className='mt-2'>
                                            <Button
                                                variant='outline'
                                                size='sm'
                                            >
                                                Add Note
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};
