import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/DataTable';
import { ClientSelector } from '@/components/ClientSelector';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '@/components/ui/alert-dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { treasuryService } from '@/services/treasury';
import { FileText, Download, MoreHorizontal, Plus, Search, Filter, Trash2, Eye, Calendar, User } from 'lucide-react';
import type { ReportMetadata } from '@/types/treasury';
import type { ColumnDef } from '@tanstack/react-table';

export const ReportHistoryPage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [currentPage] = useState(1);
    const [selectedClient, setSelectedClient] = useState<string | undefined>('');
    const [searchQuery, setSearchQuery] = useState('');
    const [reportToDelete, setReportToDelete] = useState<ReportMetadata | null>(null);

    const pageSize = 10;

    const {
        data: reportData,
        isLoading,
        error
    } = useQuery({
        queryKey: ['reportHistory', currentPage, selectedClient],
        queryFn: () => treasuryService.getReportHistory(currentPage, pageSize, selectedClient || undefined)
    });

    const deleteReportMutation = useMutation({
        mutationFn: treasuryService.deleteReport,
        onSuccess: () => {
            toast.success('Report deleted successfully');
            queryClient.invalidateQueries({ queryKey: ['reportHistory'] });
            setReportToDelete(null);
        },
        onError: error => {
            toast.error('Failed to delete report: ' + error.message);
        }
    });

    const downloadReportMutation = useMutation({
        mutationFn: treasuryService.downloadReport,
        onSuccess: (blob, reportId) => {
            const url = window.URL.createObjectURL(blob);
            const report = reportData?.reports.find(r => r.id === reportId);
            const filename = report ? `${report.title}.${report.format}` : `report-${reportId}.pdf`;

            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            toast.success('Report downloaded successfully');
        },
        onError: error => {
            toast.error('Failed to download report: ' + error.message);
        }
    });

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusVariant = (status: ReportMetadata['status']) => {
        switch (status) {
            case 'ready':
                return 'default';
            case 'generating':
                return 'secondary';
            case 'error':
                return 'destructive';
            default:
                return 'outline';
        }
    };

    const getFormatVariant = (format: string) => {
        switch (format) {
            case 'pdf':
                return 'default';
            case 'excel':
                return 'secondary';
            case 'html':
                return 'outline';
            default:
                return 'outline';
        }
    };

    const columns: ColumnDef<ReportMetadata>[] = [
        {
            accessorKey: 'title',
            header: 'Report Title',
            cell: ({ row }) => {
                const report = row.original;
                return (
                    <div className='space-y-1'>
                        <div className='font-medium'>{report.title}</div>
                        <div className='text-sm text-muted-foreground'>{report.clientName}</div>
                    </div>
                );
            }
        },
        {
            accessorKey: 'template',
            header: 'Template',
            cell: ({ row }) => (
                <Badge
                    variant='outline'
                    className='font-mono text-xs'
                >
                    {row.original.template}
                </Badge>
            )
        },
        {
            accessorKey: 'format',
            header: 'Format',
            cell: ({ row }) => (
                <Badge
                    variant={getFormatVariant(row.original.format)}
                    className='uppercase'
                >
                    {row.original.format}
                </Badge>
            )
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => (
                <Badge
                    variant={getStatusVariant(row.original.status)}
                    className='capitalize'
                >
                    {row.original.status}
                </Badge>
            )
        },
        {
            accessorKey: 'createdAt',
            header: 'Created',
            cell: ({ row }) => (
                <div className='space-y-1'>
                    <div className='text-sm'>{formatDate(row.original.createdAt)}</div>
                    <div className='text-xs text-muted-foreground flex items-center gap-1'>
                        <User className='h-3 w-3' />
                        {row.original.createdBy}
                    </div>
                </div>
            )
        },
        {
            accessorKey: 'fileSize',
            header: 'Size',
            cell: ({ row }) => (
                <div className='text-sm'>{row.original.fileSize > 0 ? formatFileSize(row.original.fileSize) : '-'}</div>
            )
        },
        {
            accessorKey: 'downloadCount',
            header: 'Downloads',
            cell: ({ row }) => (
                <div className='text-center'>
                    <Badge
                        variant='secondary'
                        className='text-xs'
                    >
                        {row.original.downloadCount}
                    </Badge>
                </div>
            )
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => {
                const report = row.original;
                const canDownload = report.status === 'ready';

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant='ghost'
                                className='h-8 w-8 p-0'
                            >
                                <MoreHorizontal className='h-4 w-4' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                            {canDownload && (
                                <DropdownMenuItem
                                    onClick={() => downloadReportMutation.mutate(report.id)}
                                    disabled={downloadReportMutation.isPending}
                                >
                                    <Download className='mr-2 h-4 w-4' />
                                    Download
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => navigate(`/analysis/${report.analysisId}`)}>
                                <Eye className='mr-2 h-4 w-4' />
                                View Analysis
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setReportToDelete(report)}
                                className='text-destructive focus:text-destructive'
                            >
                                <Trash2 className='mr-2 h-4 w-4' />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            }
        }
    ];

    const filteredReports =
        reportData?.reports.filter(
            report =>
                report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                report.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                report.template.toLowerCase().includes(searchQuery.toLowerCase())
        ) || [];

    return (
        <div className='container max-w-7xl mx-auto py-8 px-4 space-y-8'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-3xl font-bold'>Report History</h1>
                    <p className='text-muted-foreground mt-1'>View and manage previously generated reports</p>
                </div>
                <Button onClick={() => navigate('/reports/generate')}>
                    <Plus className='h-4 w-4 mr-2' />
                    Generate New Report
                </Button>
            </div>

            {/* Filters */}
            <Card>
                <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                        <Filter className='h-5 w-5' />
                        Filters
                    </CardTitle>
                    <CardDescription>Filter reports by client, search terms, or other criteria</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-col sm:flex-row gap-4'>
                        <div className='flex-1'>
                            <div className='relative'>
                                <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                                <Input
                                    placeholder='Search reports, clients, or templates...'
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    className='pl-9'
                                />
                            </div>
                        </div>
                        <div className='sm:w-64'>
                            <ClientSelector
                                value={selectedClient}
                                onValueChange={setSelectedClient}
                                placeholder='All clients'
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Reports Table */}
            <Card>
                <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                        <FileText className='h-5 w-5' />
                        Reports ({reportData?.totalCount || 0})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {error ? (
                        <div className='text-center py-8 text-muted-foreground'>
                            <FileText className='h-12 w-12 mx-auto mb-4 opacity-50' />
                            <p>Failed to load reports. Please try again.</p>
                            <Button
                                variant='outline'
                                className='mt-4'
                                onClick={() => window.location.reload()}
                            >
                                Retry
                            </Button>
                        </div>
                    ) : isLoading ? (
                        <div className='text-center py-8 text-muted-foreground'>
                            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto'></div>
                            <p className='mt-4'>Loading reports...</p>
                        </div>
                    ) : filteredReports.length === 0 ? (
                        <div className='text-center py-8 text-muted-foreground'>
                            <FileText className='h-12 w-12 mx-auto mb-4 opacity-50' />
                            <h3 className='text-lg font-medium mb-2'>No reports found</h3>
                            <p className='mb-4'>
                                {selectedClient || searchQuery
                                    ? 'Try adjusting your filters or search terms.'
                                    : 'Generate your first report to get started.'}
                            </p>
                            <Button onClick={() => navigate('/reports/generate')}>
                                <Plus className='h-4 w-4 mr-2' />
                                Generate Report
                            </Button>
                        </div>
                    ) : (
                        <DataTable
                            columns={columns}
                            data={filteredReports}
                            searchKey='title'
                            searchPlaceholder='Search reports...'
                        />
                    )}
                </CardContent>
            </Card>

            {/* Quick Stats */}
            {reportData && reportData.reports.length > 0 && (
                <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                    <Card>
                        <CardContent className='p-6'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p className='text-sm font-medium text-muted-foreground'>Total Reports</p>
                                    <p className='text-2xl font-bold'>{reportData.totalCount}</p>
                                </div>
                                <FileText className='h-8 w-8 text-muted-foreground' />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className='p-6'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p className='text-sm font-medium text-muted-foreground'>Ready to Download</p>
                                    <p className='text-2xl font-bold'>
                                        {reportData.reports.filter(r => r.status === 'ready').length}
                                    </p>
                                </div>
                                <Download className='h-8 w-8 text-muted-foreground' />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className='p-6'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p className='text-sm font-medium text-muted-foreground'>Generating</p>
                                    <p className='text-2xl font-bold'>
                                        {reportData.reports.filter(r => r.status === 'generating').length}
                                    </p>
                                </div>
                                <Calendar className='h-8 w-8 text-muted-foreground' />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className='p-6'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p className='text-sm font-medium text-muted-foreground'>Total Downloads</p>
                                    <p className='text-2xl font-bold'>
                                        {reportData.reports.reduce((sum, r) => sum + r.downloadCount, 0)}
                                    </p>
                                </div>
                                <Eye className='h-8 w-8 text-muted-foreground' />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Delete Confirmation Dialog */}
            <AlertDialog
                open={!!reportToDelete}
                onOpenChange={() => setReportToDelete(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Report</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete "{reportToDelete?.title}"? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => reportToDelete && deleteReportMutation.mutate(reportToDelete.id)}
                            disabled={deleteReportMutation.isPending}
                            className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                        >
                            {deleteReportMutation.isPending ? 'Deleting...' : 'Delete'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};
