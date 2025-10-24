import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DataTable } from '@/components/DataTable';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { treasuryService } from '@/services/treasury';
import {
    Activity,
    Search,
    Filter,
    Calendar as CalendarIcon,
    Download,
    User,
    FileText,
    Settings,
    Shield,
    AlertTriangle
} from 'lucide-react';
import type { AuditEntry } from '@/types/treasury';
import type { ColumnDef } from '@tanstack/react-table';

export const AuditTrailPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState<string>('all');
    const [selectedAction, setSelectedAction] = useState<string>('all');
    const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const {
        data: auditData,
        isLoading,
        error
    } = useQuery({
        queryKey: ['auditLogs', searchQuery, selectedUser, selectedAction, dateRange],
        queryFn: () =>
            treasuryService.getAuditLogs({
                page: 1,
                limit: 25,
                search: searchQuery || undefined,
                userId: selectedUser !== 'all' ? selectedUser : undefined,
                action: selectedAction !== 'all' ? selectedAction : undefined,
                dateFrom: dateRange.from?.toISOString(),
                dateTo: dateRange.to?.toISOString()
            })
    });

    const handleExport = () => {
        const params = {
            search: searchQuery || undefined,
            userId: selectedUser !== 'all' ? selectedUser : undefined,
            action: selectedAction !== 'all' ? selectedAction : undefined,
            dateFrom: dateRange.from?.toISOString(),
            dateTo: dateRange.to?.toISOString()
        };

        // In a real app, this would trigger a file download
        console.log('Exporting audit logs with params:', params);
    };

    const getActionIcon = (action: string) => {
        switch (action.toLowerCase()) {
            case 'login':
            case 'logout':
                return <User className='h-4 w-4' />;
            case 'create':
            case 'update':
            case 'delete':
                return <FileText className='h-4 w-4' />;
            case 'upload':
                return <Download className='h-4 w-4' />;
            case 'config_change':
                return <Settings className='h-4 w-4' />;
            case 'security':
                return <Shield className='h-4 w-4' />;
            default:
                return <Activity className='h-4 w-4' />;
        }
    };

    const getActionBadgeVariant = (action: string) => {
        switch (action.toLowerCase()) {
            case 'create':
                return 'default';
            case 'update':
                return 'secondary';
            case 'delete':
                return 'destructive';
            case 'login':
                return 'outline';
            case 'logout':
                return 'outline';
            case 'security':
                return 'destructive';
            default:
                return 'secondary';
        }
    };

    const getSeverityBadgeVariant = (severity: string) => {
        switch (severity.toLowerCase()) {
            case 'high':
                return 'destructive';
            case 'medium':
                return 'default';
            case 'low':
                return 'secondary';
            default:
                return 'outline';
        }
    };

    const formatDate = (dateString: string) => {
        return format(new Date(dateString), 'MMM dd, yyyy HH:mm:ss');
    };

    const columns: ColumnDef<AuditEntry>[] = [
        {
            accessorKey: 'timestamp',
            header: 'Timestamp',
            cell: ({ row }) => <div className='text-sm'>{formatDate(row.original.timestamp)}</div>
        },
        {
            accessorKey: 'user',
            header: 'User',
            cell: ({ row }) => {
                const audit = row.original;
                return (
                    <div className='space-y-1'>
                        <div className='font-medium'>{audit.userName}</div>
                        <div className='text-sm text-muted-foreground'>{audit.userEmail}</div>
                    </div>
                );
            }
        },
        {
            accessorKey: 'action',
            header: 'Action',
            cell: ({ row }) => {
                const action = row.original.action;
                return (
                    <div className='flex items-center gap-2'>
                        {getActionIcon(action)}
                        <Badge variant={getActionBadgeVariant(action)}>{action.replace('_', ' ').toUpperCase()}</Badge>
                    </div>
                );
            }
        },
        {
            accessorKey: 'resource',
            header: 'Resource',
            cell: ({ row }) => {
                const audit = row.original;
                return (
                    <div className='space-y-1'>
                        <div className='font-medium'>{audit.resource}</div>
                        {audit.resourceId && (
                            <div className='text-sm text-muted-foreground font-mono'>ID: {audit.resourceId}</div>
                        )}
                    </div>
                );
            }
        },
        {
            accessorKey: 'severity',
            header: 'Severity',
            cell: ({ row }) => (
                <Badge variant={getSeverityBadgeVariant(row.original.severity)}>{row.original.severity}</Badge>
            )
        },
        {
            accessorKey: 'ipAddress',
            header: 'IP Address',
            cell: ({ row }) => <div className='font-mono text-sm'>{row.original.ipAddress}</div>
        },
        {
            accessorKey: 'details',
            header: 'Details',
            cell: ({ row }) => (
                <div className='max-w-xs truncate text-sm text-muted-foreground'>{row.original.details}</div>
            )
        }
    ];

    const filteredAuditLogs =
        auditData?.logs.filter(log => {
            const matchesSearch =
                !searchQuery ||
                log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                log.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                log.resource.toLowerCase().includes(searchQuery.toLowerCase()) ||
                log.details.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesSearch;
        }) || [];

    if (error) {
        return (
            <div className='container max-w-7xl mx-auto py-8 px-4 space-y-8'>
                <Alert>
                    <AlertTriangle className='h-4 w-4' />
                    <AlertDescription>Failed to load audit logs. Please try refreshing the page.</AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className='container max-w-7xl mx-auto py-8 px-4 space-y-8'>
            {/* Header */}
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                <div>
                    <h1 className='text-3xl font-bold'>Audit Trail</h1>
                    <p className='text-muted-foreground'>Track system activity and user actions across the platform</p>
                </div>
                <Button
                    onClick={handleExport}
                    variant='outline'
                >
                    <Download className='h-4 w-4 mr-2' />
                    Export Logs
                </Button>
            </div>

            {/* Summary Cards */}
            {auditData && (
                <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                    <Card>
                        <CardContent className='p-6'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p className='text-sm font-medium text-muted-foreground'>Total Events</p>
                                    <p className='text-2xl font-bold'>{auditData.totalCount}</p>
                                </div>
                                <Activity className='h-8 w-8 text-muted-foreground' />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className='p-6'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p className='text-sm font-medium text-muted-foreground'>High Severity</p>
                                    <p className='text-2xl font-bold text-destructive'>
                                        {auditData.logs.filter(log => log.severity === 'high').length}
                                    </p>
                                </div>
                                <AlertTriangle className='h-8 w-8 text-destructive' />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className='p-6'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p className='text-sm font-medium text-muted-foreground'>Unique Users</p>
                                    <p className='text-2xl font-bold'>
                                        {new Set(auditData.logs.map(log => log.userId)).size}
                                    </p>
                                </div>
                                <User className='h-8 w-8 text-muted-foreground' />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className='p-6'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p className='text-sm font-medium text-muted-foreground'>Recent Activity</p>
                                    <p className='text-2xl font-bold'>
                                        {
                                            auditData.logs.filter(log => {
                                                const logDate = new Date(log.timestamp);
                                                const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
                                                return logDate > oneDayAgo;
                                            }).length
                                        }
                                    </p>
                                </div>
                                <FileText className='h-8 w-8 text-muted-foreground' />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Filters */}
            <Card>
                <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                        <Filter className='h-5 w-5' />
                        Filters
                    </CardTitle>
                    <CardDescription>Filter audit logs by user, action, date range, or search terms</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-col gap-4'>
                        {/* Search and basic filters */}
                        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                            <div className='relative'>
                                <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                                <Input
                                    placeholder='Search logs...'
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    className='pl-9'
                                />
                            </div>

                            <Select
                                value={selectedUser}
                                onValueChange={setSelectedUser}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder='All users' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='all'>All Users</SelectItem>
                                    {auditData &&
                                        Array.from(new Set(auditData.logs.map(log => log.userId))).map(userId => {
                                            const user = auditData.logs.find(log => log.userId === userId);
                                            return user ? (
                                                <SelectItem
                                                    key={userId}
                                                    value={userId}
                                                >
                                                    {user.userName} ({user.userEmail})
                                                </SelectItem>
                                            ) : null;
                                        })}
                                </SelectContent>
                            </Select>

                            <Select
                                value={selectedAction}
                                onValueChange={setSelectedAction}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder='All actions' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='all'>All Actions</SelectItem>
                                    {auditData &&
                                        Array.from(new Set(auditData.logs.map(log => log.action))).map(action => (
                                            <SelectItem
                                                key={action}
                                                value={action}
                                            >
                                                {action.replace('_', ' ').toUpperCase()}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>

                            <Popover
                                open={isDatePickerOpen}
                                onOpenChange={setIsDatePickerOpen}
                            >
                                <PopoverTrigger asChild>
                                    <Button
                                        variant='outline'
                                        className='justify-start text-left font-normal'
                                    >
                                        <CalendarIcon className='mr-2 h-4 w-4' />
                                        {dateRange.from ? (
                                            dateRange.to ? (
                                                <>
                                                    {format(dateRange.from, 'LLL dd')} -{' '}
                                                    {format(dateRange.to, 'LLL dd')}
                                                </>
                                            ) : (
                                                format(dateRange.from, 'LLL dd')
                                            )
                                        ) : (
                                            'Pick a date range'
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    className='w-auto p-0'
                                    align='start'
                                >
                                    <Calendar
                                        initialFocus
                                        mode='range'
                                        defaultMonth={dateRange.from}
                                        selected={{ from: dateRange.from, to: dateRange.to }}
                                        onSelect={range => {
                                            setDateRange(range || {});
                                            setIsDatePickerOpen(false);
                                        }}
                                        numberOfMonths={2}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Clear filters button */}
                        {(searchQuery || selectedUser !== 'all' || selectedAction !== 'all' || dateRange.from) && (
                            <div>
                                <Button
                                    variant='ghost'
                                    onClick={() => {
                                        setSearchQuery('');
                                        setSelectedUser('all');
                                        setSelectedAction('all');
                                        setDateRange({});
                                    }}
                                >
                                    Clear Filters
                                </Button>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Audit Logs Table */}
            <Card>
                <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                        <Activity className='h-5 w-5' />
                        Audit Logs ({filteredAuditLogs.length})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className='text-center py-8 text-muted-foreground'>
                            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto'></div>
                            <p className='mt-4'>Loading audit logs...</p>
                        </div>
                    ) : filteredAuditLogs.length === 0 ? (
                        <div className='text-center py-8 text-muted-foreground'>
                            <Activity className='h-12 w-12 mx-auto mb-4 opacity-50' />
                            <h3 className='text-lg font-medium mb-2'>No audit logs found</h3>
                            <p>
                                {searchQuery || selectedUser !== 'all' || selectedAction !== 'all' || dateRange.from
                                    ? 'Try adjusting your filters.'
                                    : 'No audit activity recorded yet.'}
                            </p>
                        </div>
                    ) : (
                        <DataTable
                            columns={columns}
                            data={filteredAuditLogs}
                            searchKey='userName'
                            searchPlaceholder='Search audit logs...'
                        />
                    )}
                </CardContent>
            </Card>
        </div>
    );
};
