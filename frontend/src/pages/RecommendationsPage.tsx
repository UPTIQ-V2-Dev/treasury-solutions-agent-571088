import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, Clock, Filter, Download, Eye, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { treasuryService } from '@/services/treasury';
import type { Recommendation } from '@/types/treasury';

export const RecommendationsPage = () => {
    const { id } = useParams<{ id: string }>(); // analysisId
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [priorityFilter, setPriorityFilter] = useState<string>('all');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);
    const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false);
    const [approvalAction, setApprovalAction] = useState<'approve' | 'reject' | null>(null);

    const {
        data: recommendations = [],
        isLoading: recommendationsLoading,
        error: recommendationsError
    } = useQuery({
        queryKey: ['recommendations', id],
        queryFn: () => treasuryService.getRecommendations(id!),
        enabled: !!id
    });

    const { data: products = [] } = useQuery({
        queryKey: ['treasury-products'],
        queryFn: treasuryService.getTreasuryProducts
    });

    const { isLoading: analysisLoading, error: analysisError } = useQuery({
        queryKey: ['analysis', id],
        queryFn: () => treasuryService.getAnalysis(id!),
        enabled: !!id
    });

    const approveRecommendationMutation = useMutation({
        mutationFn: ({ recommendationId, approvedBy }: { recommendationId: string; approvedBy: string }) =>
            treasuryService.approveRecommendation(recommendationId, approvedBy),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['recommendations', id] });
            setIsApprovalDialogOpen(false);
            setSelectedRecommendation(null);
            setApprovalAction(null);
        }
    });

    const rejectRecommendationMutation = useMutation({
        mutationFn: (recommendationId: string) => treasuryService.rejectRecommendation(recommendationId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['recommendations', id] });
            setIsApprovalDialogOpen(false);
            setSelectedRecommendation(null);
            setApprovalAction(null);
        }
    });

    const formatCurrency = (amount: number | undefined) => {
        if (!amount) return 'N/A';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const getPriorityColor = (priority: Recommendation['priority']) => {
        switch (priority) {
            case 'high':
                return 'bg-red-100 text-red-800';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800';
            case 'low':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusColor = (status: Recommendation['status']) => {
        switch (status) {
            case 'approved':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            case 'implemented':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: Recommendation['status']) => {
        switch (status) {
            case 'approved':
                return <CheckCircle2 className='h-4 w-4' />;
            case 'rejected':
                return <XCircle className='h-4 w-4' />;
            case 'pending':
                return <Clock className='h-4 w-4' />;
            case 'implemented':
                return <CheckCircle2 className='h-4 w-4' />;
            default:
                return <Clock className='h-4 w-4' />;
        }
    };

    const filteredRecommendations = recommendations.filter(rec => {
        const matchesPriority = priorityFilter === 'all' || rec.priority === priorityFilter;
        const matchesStatus = statusFilter === 'all' || rec.status === statusFilter;
        return matchesPriority && matchesStatus;
    });

    const handleApprovalAction = (recommendation: Recommendation, action: 'approve' | 'reject') => {
        setSelectedRecommendation(recommendation);
        setApprovalAction(action);
        setIsApprovalDialogOpen(true);
    };

    const confirmApprovalAction = () => {
        if (!selectedRecommendation || !approvalAction) return;

        if (approvalAction === 'approve') {
            approveRecommendationMutation.mutate({
                recommendationId: selectedRecommendation.id,
                approvedBy: 'Current User' // In real app, get from auth context
            });
        } else {
            rejectRecommendationMutation.mutate(selectedRecommendation.id);
        }
    };

    if (recommendationsError || analysisError) {
        return (
            <div className='container max-w-4xl mx-auto py-8 px-4'>
                <Alert>
                    <AlertDescription>Failed to load recommendations data. Please try again.</AlertDescription>
                </Alert>
            </div>
        );
    }

    if (recommendationsLoading || analysisLoading) {
        return (
            <div className='container max-w-7xl mx-auto py-8 px-4 space-y-6'>
                <div className='flex items-center gap-4'>
                    <Skeleton className='h-8 w-8' />
                    <Skeleton className='h-8 w-48' />
                </div>
                <div className='grid gap-6'>
                    {[1, 2, 3].map(i => (
                        <Card key={i}>
                            <CardContent className='p-6'>
                                <div className='space-y-4'>
                                    <Skeleton className='h-6 w-64' />
                                    <Skeleton className='h-4 w-full' />
                                    <Skeleton className='h-4 w-3/4' />
                                    <div className='flex gap-2'>
                                        <Skeleton className='h-8 w-20' />
                                        <Skeleton className='h-8 w-20' />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className='container max-w-7xl mx-auto py-8 px-4 space-y-6'>
            {/* Header */}
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                    <Button
                        variant='ghost'
                        onClick={() => navigate(`/analysis/${id}`)}
                        className='gap-2'
                    >
                        <ArrowLeft className='h-4 w-4' />
                        Back to Analysis
                    </Button>
                </div>
                <div className='flex items-center gap-2'>
                    <Button
                        variant='outline'
                        className='gap-2'
                    >
                        <Download className='h-4 w-4' />
                        Export Report
                    </Button>
                    <Button
                        variant='outline'
                        className='gap-2'
                    >
                        <Eye className='h-4 w-4' />
                        View Analysis
                    </Button>
                </div>
            </div>

            {/* Summary Header */}
            <Card>
                <CardHeader>
                    <div className='flex items-start justify-between'>
                        <div>
                            <CardTitle className='text-2xl mb-2'>Treasury Recommendations</CardTitle>
                            <CardDescription>
                                Personalized treasury product recommendations based on cash flow analysis
                            </CardDescription>
                        </div>
                        <div className='text-right'>
                            <div className='text-sm text-muted-foreground'>Total Recommendations</div>
                            <div className='text-2xl font-bold'>{recommendations.length}</div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        <div className='text-center p-4 bg-green-50 rounded-lg'>
                            <div className='text-2xl font-bold text-green-600'>
                                {recommendations.filter(r => r.status === 'approved').length}
                            </div>
                            <div className='text-sm text-green-700'>Approved</div>
                        </div>
                        <div className='text-center p-4 bg-yellow-50 rounded-lg'>
                            <div className='text-2xl font-bold text-yellow-600'>
                                {recommendations.filter(r => r.status === 'pending').length}
                            </div>
                            <div className='text-sm text-yellow-700'>Pending Review</div>
                        </div>
                        <div className='text-center p-4 bg-blue-50 rounded-lg'>
                            <div className='text-2xl font-bold text-blue-600'>
                                {formatCurrency(
                                    recommendations.reduce(
                                        (total, rec) =>
                                            total +
                                            (rec.benefitProjection.annualYieldIncrease || 0) +
                                            (rec.benefitProjection.annualCostSavings || 0),
                                        0
                                    )
                                )}
                            </div>
                            <div className='text-sm text-blue-700'>Potential Annual Savings</div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Filters */}
            <Card>
                <CardHeader>
                    <CardTitle className='text-lg'>Filter Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-col md:flex-row gap-4'>
                        <Select
                            value={priorityFilter}
                            onValueChange={setPriorityFilter}
                        >
                            <SelectTrigger className='w-full md:w-48'>
                                <Filter className='h-4 w-4 mr-2' />
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='all'>All Priorities</SelectItem>
                                <SelectItem value='high'>High Priority</SelectItem>
                                <SelectItem value='medium'>Medium Priority</SelectItem>
                                <SelectItem value='low'>Low Priority</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select
                            value={statusFilter}
                            onValueChange={setStatusFilter}
                        >
                            <SelectTrigger className='w-full md:w-48'>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='all'>All Statuses</SelectItem>
                                <SelectItem value='pending'>Pending</SelectItem>
                                <SelectItem value='approved'>Approved</SelectItem>
                                <SelectItem value='rejected'>Rejected</SelectItem>
                                <SelectItem value='implemented'>Implemented</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Recommendations List */}
            <div className='space-y-6'>
                {filteredRecommendations.length === 0 ? (
                    <Card>
                        <CardContent className='p-12 text-center'>
                            <div className='text-muted-foreground'>
                                {priorityFilter !== 'all' || statusFilter !== 'all'
                                    ? 'No recommendations match your filter criteria.'
                                    : 'No recommendations available yet.'}
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    filteredRecommendations.map(recommendation => {
                        const product = products.find(p => p.id === recommendation.productId);

                        return (
                            <Card
                                key={recommendation.id}
                                className='hover:shadow-lg transition-shadow'
                            >
                                <CardHeader>
                                    <div className='flex items-start justify-between'>
                                        <div className='space-y-2'>
                                            <div className='flex items-center gap-3'>
                                                <CardTitle className='text-xl'>
                                                    {product?.name || 'Treasury Product'}
                                                </CardTitle>
                                                <Badge className={getPriorityColor(recommendation.priority)}>
                                                    {recommendation.priority} priority
                                                </Badge>
                                                <Badge
                                                    className={`${getStatusColor(recommendation.status)} flex items-center gap-1`}
                                                >
                                                    {getStatusIcon(recommendation.status)}
                                                    {recommendation.status}
                                                </Badge>
                                            </div>
                                            <CardDescription className='text-base'>
                                                {product?.description}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className='space-y-6'>
                                    {/* Rationale */}
                                    <div>
                                        <h4 className='font-medium mb-2'>Why This Recommendation?</h4>
                                        <p className='text-muted-foreground'>{recommendation.rationale}</p>
                                    </div>

                                    {/* Key Data Points */}
                                    {recommendation.dataPoints.length > 0 && (
                                        <div>
                                            <h4 className='font-medium mb-2'>Supporting Data</h4>
                                            <ul className='space-y-1'>
                                                {recommendation.dataPoints.map((point, index) => (
                                                    <li
                                                        key={index}
                                                        className='text-sm text-muted-foreground flex items-start gap-2'
                                                    >
                                                        <div className='w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0' />
                                                        {point}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Benefit Projections */}
                                    <div>
                                        <h4 className='font-medium mb-3'>Projected Benefits</h4>
                                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                                            {recommendation.benefitProjection.annualYieldIncrease && (
                                                <div className='p-3 bg-green-50 rounded-lg text-center'>
                                                    <div className='text-lg font-semibold text-green-600'>
                                                        {formatCurrency(
                                                            recommendation.benefitProjection.annualYieldIncrease
                                                        )}
                                                    </div>
                                                    <div className='text-sm text-green-700'>Annual Yield Increase</div>
                                                </div>
                                            )}
                                            {recommendation.benefitProjection.annualCostSavings && (
                                                <div className='p-3 bg-blue-50 rounded-lg text-center'>
                                                    <div className='text-lg font-semibold text-blue-600'>
                                                        {formatCurrency(
                                                            recommendation.benefitProjection.annualCostSavings
                                                        )}
                                                    </div>
                                                    <div className='text-sm text-blue-700'>Annual Cost Savings</div>
                                                </div>
                                            )}
                                            {recommendation.benefitProjection.paybackPeriod && (
                                                <div className='p-3 bg-orange-50 rounded-lg text-center'>
                                                    <div className='text-lg font-semibold text-orange-600'>
                                                        {recommendation.benefitProjection.paybackPeriod} months
                                                    </div>
                                                    <div className='text-sm text-orange-700'>Payback Period</div>
                                                </div>
                                            )}
                                            {recommendation.benefitProjection.roi && (
                                                <div className='p-3 bg-purple-50 rounded-lg text-center'>
                                                    <div className='text-lg font-semibold text-purple-600'>
                                                        {(recommendation.benefitProjection.roi * 100).toFixed(1)}%
                                                    </div>
                                                    <div className='text-sm text-purple-700'>Annual ROI</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Product Features */}
                                    {product?.features && product.features.length > 0 && (
                                        <div>
                                            <h4 className='font-medium mb-2'>Key Features</h4>
                                            <div className='flex flex-wrap gap-2'>
                                                {product.features.slice(0, 5).map((feature, index) => (
                                                    <Badge
                                                        key={index}
                                                        variant='outline'
                                                    >
                                                        {feature}
                                                    </Badge>
                                                ))}
                                                {product.features.length > 5 && (
                                                    <Badge variant='outline'>+{product.features.length - 5} more</Badge>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className='flex items-center justify-between pt-4 border-t'>
                                        <div className='text-sm text-muted-foreground'>
                                            Created on {new Date(recommendation.createdAt).toLocaleDateString()}
                                            {recommendation.approvedBy && (
                                                <span> • Approved by {recommendation.approvedBy}</span>
                                            )}
                                        </div>
                                        {recommendation.status === 'pending' && (
                                            <div className='flex items-center gap-2'>
                                                <Button
                                                    variant='outline'
                                                    size='sm'
                                                    onClick={() => handleApprovalAction(recommendation, 'reject')}
                                                    className='gap-2 text-red-600 hover:text-red-700'
                                                >
                                                    <ThumbsDown className='h-4 w-4' />
                                                    Reject
                                                </Button>
                                                <Button
                                                    size='sm'
                                                    onClick={() => handleApprovalAction(recommendation, 'approve')}
                                                    className='gap-2'
                                                >
                                                    <ThumbsUp className='h-4 w-4' />
                                                    Approve
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })
                )}
            </div>

            {/* Approval Dialog */}
            <Dialog
                open={isApprovalDialogOpen}
                onOpenChange={setIsApprovalDialogOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{approvalAction === 'approve' ? 'Approve' : 'Reject'} Recommendation</DialogTitle>
                        <DialogDescription>
                            {approvalAction === 'approve'
                                ? 'Are you sure you want to approve this treasury product recommendation? This will move it to implementation phase.'
                                : 'Are you sure you want to reject this recommendation? This action cannot be undone.'}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant='outline'
                            onClick={() => setIsApprovalDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={confirmApprovalAction}
                            disabled={approveRecommendationMutation.isPending || rejectRecommendationMutation.isPending}
                            variant={approvalAction === 'approve' ? 'default' : 'destructive'}
                        >
                            {approveRecommendationMutation.isPending || rejectRecommendationMutation.isPending
                                ? 'Processing...'
                                : approvalAction === 'approve'
                                  ? 'Approve'
                                  : 'Reject'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};
