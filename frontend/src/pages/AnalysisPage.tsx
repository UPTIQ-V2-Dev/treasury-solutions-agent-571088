import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    TrendingUp,
    TrendingDown,
    DollarSign,
    Calendar,
    BarChart3,
    Filter,
    Download,
    Share,
    Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DataTable } from '@/components/DataTable';
import { ChartContainer } from '@/components/ChartContainer';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    AreaChart,
    Area,
    PieChart as RechartsPieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';
import { treasuryService } from '@/services/treasury';
import type { Transaction } from '@/types/treasury';
import type { ColumnDef } from '@tanstack/react-table';

export const AnalysisPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [transactionPage] = useState(1);
    const [categoryFilter, setCategoryFilter] = useState<string>('all');

    const {
        data: analysis,
        isLoading: analysisLoading,
        error: analysisError
    } = useQuery({
        queryKey: ['analysis', id],
        queryFn: () => treasuryService.getAnalysis(id!),
        enabled: !!id
    });

    const { data: transactionData, isLoading: transactionsLoading } = useQuery({
        queryKey: ['analysis-transactions', id, transactionPage],
        queryFn: () => treasuryService.getAnalysisTransactions(id!, transactionPage, 50),
        enabled: !!id && !!analysis
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
            day: 'numeric'
        });
    };

    const getTransactionColumns = (): ColumnDef<Transaction>[] => [
        {
            accessorKey: 'date',
            header: 'Date',
            cell: ({ row }) => formatDate(row.getValue('date'))
        },
        {
            accessorKey: 'description',
            header: 'Description',
            cell: ({ row }) => <div className='max-w-48 truncate'>{row.getValue('description')}</div>
        },
        {
            accessorKey: 'category',
            header: 'Category',
            cell: ({ row }) => <Badge variant='outline'>{row.getValue('category')}</Badge>
        },
        {
            accessorKey: 'type',
            header: 'Type',
            cell: ({ row }) => {
                const type = row.getValue('type') as Transaction['type'];
                const color = type === 'credit' ? 'text-green-600' : 'text-red-600';
                return <span className={`capitalize ${color}`}>{type}</span>;
            }
        },
        {
            accessorKey: 'amount',
            header: 'Amount',
            cell: ({ row }) => {
                const amount = row.getValue('amount') as number;
                const type = row.original.type;
                const color = type === 'credit' ? 'text-green-600' : 'text-red-600';
                const prefix = type === 'credit' ? '+' : '-';
                return (
                    <span className={`font-medium ${color}`}>
                        {prefix}
                        {formatCurrency(Math.abs(amount))}
                    </span>
                );
            }
        },
        {
            accessorKey: 'balanceAfter',
            header: 'Balance After',
            cell: ({ row }) => formatCurrency(row.getValue('balanceAfter'))
        }
    ];

    const CHART_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

    if (analysisError) {
        return (
            <div className='container max-w-4xl mx-auto py-8 px-4'>
                <Alert>
                    <AlertDescription>Failed to load analysis data. Please try again.</AlertDescription>
                </Alert>
            </div>
        );
    }

    if (analysisLoading) {
        return (
            <div className='container max-w-7xl mx-auto py-8 px-4 space-y-6'>
                <div className='flex items-center gap-4'>
                    <Skeleton className='h-8 w-8' />
                    <Skeleton className='h-8 w-48' />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
                    {[1, 2, 3, 4].map(i => (
                        <Card key={i}>
                            <CardContent className='p-6'>
                                <Skeleton className='h-6 w-32 mb-2' />
                                <Skeleton className='h-8 w-20' />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    if (!analysis) {
        return (
            <div className='container max-w-4xl mx-auto py-8 px-4'>
                <Alert>
                    <AlertDescription>Analysis not found.</AlertDescription>
                </Alert>
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
                        onClick={() => navigate('/')}
                        className='gap-2'
                    >
                        <ArrowLeft className='h-4 w-4' />
                        Back to Dashboard
                    </Button>
                </div>
                <div className='flex items-center gap-2'>
                    <Button
                        variant='outline'
                        className='gap-2'
                    >
                        <Share className='h-4 w-4' />
                        Share
                    </Button>
                    <Button
                        variant='outline'
                        className='gap-2'
                    >
                        <Download className='h-4 w-4' />
                        Export
                    </Button>
                    <Button className='gap-2'>
                        <Eye className='h-4 w-4' />
                        View Recommendations
                    </Button>
                </div>
            </div>

            {/* Analysis Header */}
            <Card>
                <CardHeader>
                    <div className='flex items-start justify-between'>
                        <div>
                            <CardTitle className='text-2xl mb-2'>Treasury Analysis Results</CardTitle>
                            <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                                <div className='flex items-center gap-2'>
                                    <Calendar className='h-4 w-4' />
                                    <span>
                                        Analysis Period: {formatDate(analysis.summary.dateRange.startDate)} -{' '}
                                        {formatDate(analysis.summary.dateRange.endDate)}
                                    </span>
                                </div>
                                <Badge variant={analysis.status === 'completed' ? 'default' : 'secondary'}>
                                    {analysis.status}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Summary Cards */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                <Card>
                    <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-sm font-medium text-muted-foreground'>Total Inflow</p>
                                <p className='text-2xl font-bold text-green-600'>
                                    {formatCurrency(analysis.summary.totalInflow)}
                                </p>
                            </div>
                            <TrendingUp className='h-8 w-8 text-green-600' />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-sm font-medium text-muted-foreground'>Total Outflow</p>
                                <p className='text-2xl font-bold text-red-600'>
                                    {formatCurrency(analysis.summary.totalOutflow)}
                                </p>
                            </div>
                            <TrendingDown className='h-8 w-8 text-red-600' />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-sm font-medium text-muted-foreground'>Net Cash Flow</p>
                                <p
                                    className={`text-2xl font-bold ${analysis.summary.netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}
                                >
                                    {formatCurrency(analysis.summary.netCashFlow)}
                                </p>
                            </div>
                            <DollarSign
                                className={`h-8 w-8 ${analysis.summary.netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-sm font-medium text-muted-foreground'>Avg Daily Balance</p>
                                <p className='text-2xl font-bold'>{formatCurrency(analysis.summary.avgDailyBalance)}</p>
                            </div>
                            <BarChart3 className='h-8 w-8 text-blue-600' />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Tabs */}
            <Tabs
                defaultValue='overview'
                className='space-y-6'
            >
                <TabsList>
                    <TabsTrigger value='overview'>Overview</TabsTrigger>
                    <TabsTrigger value='liquidity'>Liquidity Analysis</TabsTrigger>
                    <TabsTrigger value='spending'>Spending Breakdown</TabsTrigger>
                    <TabsTrigger value='transactions'>Transactions</TabsTrigger>
                </TabsList>

                <TabsContent
                    value='overview'
                    className='space-y-6'
                >
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        <ChartContainer
                            title='Cash Flow Trends'
                            description='Daily cash flow over the analysis period'
                        >
                            <ResponsiveContainer
                                width='100%'
                                height={300}
                            >
                                <AreaChart data={analysis.liquidityMetrics.cashFlowTrends}>
                                    <CartesianGrid strokeDasharray='3 3' />
                                    <XAxis
                                        dataKey='date'
                                        tickFormatter={formatDate}
                                    />
                                    <YAxis tickFormatter={value => formatCurrency(value)} />
                                    <Tooltip
                                        formatter={(value: any, name: string) => [formatCurrency(value), name]}
                                        labelFormatter={value => formatDate(value)}
                                    />
                                    <Legend />
                                    <Area
                                        type='monotone'
                                        dataKey='inflow'
                                        stackId='1'
                                        stroke='#00C49F'
                                        fill='#00C49F'
                                        fillOpacity={0.6}
                                        name='Inflow'
                                    />
                                    <Area
                                        type='monotone'
                                        dataKey='outflow'
                                        stackId='2'
                                        stroke='#FF8042'
                                        fill='#FF8042'
                                        fillOpacity={0.6}
                                        name='Outflow'
                                    />
                                    <Line
                                        type='monotone'
                                        dataKey='balance'
                                        stroke='#0088FE'
                                        strokeWidth={2}
                                        name='Balance'
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </ChartContainer>

                        <ChartContainer
                            title='Spending by Category'
                            description='Breakdown of expenses by category'
                        >
                            <ResponsiveContainer
                                width='100%'
                                height={300}
                            >
                                <RechartsPieChart>
                                    <Pie
                                        dataKey='amount'
                                        data={analysis.spendingBreakdown.map(item => ({
                                            ...item,
                                            name: item.category
                                        }))}
                                        cx='50%'
                                        cy='50%'
                                        outerRadius={100}
                                        fill='#8884d8'
                                        label={({ category, percentage }) => `${category}: ${percentage}%`}
                                    >
                                        {analysis.spendingBreakdown.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={CHART_COLORS[index % CHART_COLORS.length]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value: any) => formatCurrency(value)} />
                                </RechartsPieChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </div>
                </TabsContent>

                <TabsContent
                    value='liquidity'
                    className='space-y-6'
                >
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
                        <Card>
                            <CardContent className='p-6 text-center'>
                                <p className='text-sm font-medium text-muted-foreground mb-2'>Min Balance</p>
                                <p className='text-2xl font-bold'>
                                    {formatCurrency(analysis.liquidityMetrics.minBalance)}
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className='p-6 text-center'>
                                <p className='text-sm font-medium text-muted-foreground mb-2'>Max Balance</p>
                                <p className='text-2xl font-bold'>
                                    {formatCurrency(analysis.liquidityMetrics.maxBalance)}
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className='p-6 text-center'>
                                <p className='text-sm font-medium text-muted-foreground mb-2'>Volatility</p>
                                <p className='text-2xl font-bold'>
                                    {(analysis.liquidityMetrics.volatility * 100).toFixed(1)}%
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <ChartContainer
                        title='Idle Balance Analysis'
                        description='Track periods where cash could be optimized'
                    >
                        <ResponsiveContainer
                            width='100%'
                            height={300}
                        >
                            <LineChart data={analysis.idleBalanceAnalysis.idleBalanceHistory}>
                                <CartesianGrid strokeDasharray='3 3' />
                                <XAxis
                                    dataKey='date'
                                    tickFormatter={formatDate}
                                />
                                <YAxis tickFormatter={value => formatCurrency(value)} />
                                <Tooltip
                                    formatter={(value: any) => [formatCurrency(value), 'Idle Balance']}
                                    labelFormatter={value => formatDate(value)}
                                />
                                <Line
                                    type='monotone'
                                    dataKey='amount'
                                    stroke='#8884d8'
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartContainer>

                    <Card>
                        <CardHeader>
                            <CardTitle>Idle Balance Opportunities</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div>
                                    <p className='text-sm text-muted-foreground mb-1'>Average Idle Amount</p>
                                    <p className='text-xl font-semibold'>
                                        {formatCurrency(analysis.idleBalanceAnalysis.avgIdleAmount)}
                                    </p>
                                </div>
                                <div>
                                    <p className='text-sm text-muted-foreground mb-1'>Potential Annual Yield Gain</p>
                                    <p className='text-xl font-semibold text-green-600'>
                                        {formatCurrency(analysis.idleBalanceAnalysis.potentialYieldGain)}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent
                    value='spending'
                    className='space-y-6'
                >
                    <div className='grid gap-6'>
                        {analysis.spendingBreakdown.map((category, index) => (
                            <Card key={category.category}>
                                <CardHeader>
                                    <div className='flex items-center justify-between'>
                                        <CardTitle className='text-lg'>{category.category}</CardTitle>
                                        <Badge variant='outline'>{category.percentage}% of total</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
                                        <div>
                                            <p className='text-sm text-muted-foreground'>Total Amount</p>
                                            <p className='text-lg font-semibold'>{formatCurrency(category.amount)}</p>
                                        </div>
                                        <div>
                                            <p className='text-sm text-muted-foreground'>Transaction Count</p>
                                            <p className='text-lg font-semibold'>{category.transactionCount}</p>
                                        </div>
                                        <div>
                                            <p className='text-sm text-muted-foreground'>Avg Transaction Size</p>
                                            <p className='text-lg font-semibold'>
                                                {formatCurrency(category.avgTransactionSize)}
                                            </p>
                                        </div>
                                    </div>
                                    {category.topVendors.length > 0 && (
                                        <div>
                                            <p className='text-sm font-medium mb-2'>Top Vendors</p>
                                            <div className='space-y-1'>
                                                {category.topVendors.slice(0, 3).map((vendor, vIndex) => (
                                                    <div
                                                        key={vIndex}
                                                        className='flex justify-between text-sm'
                                                    >
                                                        <span>{vendor.name}</span>
                                                        <span>{formatCurrency(vendor.amount)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent
                    value='transactions'
                    className='space-y-6'
                >
                    <Card>
                        <CardHeader>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <CardTitle>Transaction Details</CardTitle>
                                    <CardDescription>Complete transaction history for this analysis</CardDescription>
                                </div>
                                <Select
                                    value={categoryFilter}
                                    onValueChange={setCategoryFilter}
                                >
                                    <SelectTrigger className='w-48'>
                                        <Filter className='h-4 w-4 mr-2' />
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='all'>All Categories</SelectItem>
                                        {analysis.spendingBreakdown.map(category => (
                                            <SelectItem
                                                key={category.category}
                                                value={category.category}
                                            >
                                                {category.category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {transactionsLoading ? (
                                <div className='space-y-3'>
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <Skeleton
                                            key={i}
                                            className='h-12 w-full'
                                        />
                                    ))}
                                </div>
                            ) : transactionData ? (
                                <DataTable
                                    columns={getTransactionColumns()}
                                    data={transactionData.transactions}
                                    searchKey='description'
                                    searchPlaceholder='Search transactions...'
                                />
                            ) : (
                                <div className='text-center py-8 text-muted-foreground'>
                                    No transaction data available.
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};
