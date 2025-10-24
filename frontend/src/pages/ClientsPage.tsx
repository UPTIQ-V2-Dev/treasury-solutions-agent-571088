import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { treasuryService } from '@/services/treasury';
import type { Client } from '@/types/treasury';

export const ClientsPage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [newClient, setNewClient] = useState({
        name: '',
        relationshipManager: '',
        status: 'active' as Client['status'],
        accountIds: ['']
    });

    const {
        data: clients = [],
        isLoading,
        error
    } = useQuery({
        queryKey: ['clients'],
        queryFn: treasuryService.getClients
    });

    const createClientMutation = useMutation({
        mutationFn: treasuryService.createClient,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clients'] });
            setIsAddDialogOpen(false);
            setNewClient({
                name: '',
                relationshipManager: '',
                status: 'active' as Client['status'],
                accountIds: ['']
            });
        }
    });

    const filteredClients = clients.filter(client => {
        const matchesSearch =
            client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.relationshipManager.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleCreateClient = () => {
        createClientMutation.mutate({
            ...newClient,
            accountIds: newClient.accountIds.filter(id => id.trim() !== '')
        });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
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
                    <AlertDescription>Failed to load clients. Please try refreshing the page.</AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className='container max-w-7xl mx-auto py-8 px-4 space-y-6'>
            {/* Header */}
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                <div>
                    <h1 className='text-3xl font-bold'>Client Management</h1>
                    <p className='text-muted-foreground'>
                        Manage your client relationships and view their analysis history
                    </p>
                </div>
                <Dialog
                    open={isAddDialogOpen}
                    onOpenChange={setIsAddDialogOpen}
                >
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className='h-4 w-4 mr-2' />
                            Add Client
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Client</DialogTitle>
                            <DialogDescription>Create a new client profile for treasury analysis.</DialogDescription>
                        </DialogHeader>
                        <div className='space-y-4'>
                            <div className='space-y-2'>
                                <Label htmlFor='clientName'>Client Name</Label>
                                <Input
                                    id='clientName'
                                    value={newClient.name}
                                    onChange={e => setNewClient({ ...newClient, name: e.target.value })}
                                    placeholder='Enter client name'
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='relationshipManager'>Relationship Manager</Label>
                                <Input
                                    id='relationshipManager'
                                    value={newClient.relationshipManager}
                                    onChange={e => setNewClient({ ...newClient, relationshipManager: e.target.value })}
                                    placeholder='Enter relationship manager name'
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='accountId'>Initial Account ID</Label>
                                <Input
                                    id='accountId'
                                    value={newClient.accountIds[0] || ''}
                                    onChange={e =>
                                        setNewClient({
                                            ...newClient,
                                            accountIds: [e.target.value]
                                        })
                                    }
                                    placeholder='Enter account identifier'
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='status'>Status</Label>
                                <Select
                                    value={newClient.status}
                                    onValueChange={(value: string) =>
                                        setNewClient({ ...newClient, status: value as Client['status'] })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='active'>Active</SelectItem>
                                        <SelectItem value='pending'>Pending</SelectItem>
                                        <SelectItem value='inactive'>Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant='outline'
                                onClick={() => setIsAddDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleCreateClient}
                                disabled={
                                    !newClient.name || !newClient.relationshipManager || createClientMutation.isPending
                                }
                            >
                                {createClientMutation.isPending ? 'Creating...' : 'Create Client'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Filters */}
            <Card>
                <CardHeader>
                    <CardTitle className='text-lg'>Filter & Search</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <div className='flex flex-col md:flex-row gap-4'>
                        <div className='flex-1'>
                            <div className='relative'>
                                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
                                <Input
                                    placeholder='Search clients or relationship managers...'
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    className='pl-9'
                                />
                            </div>
                        </div>
                        <Select
                            value={statusFilter}
                            onValueChange={setStatusFilter}
                        >
                            <SelectTrigger className='w-full md:w-48'>
                                <Filter className='h-4 w-4 mr-2' />
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='all'>All Statuses</SelectItem>
                                <SelectItem value='active'>Active</SelectItem>
                                <SelectItem value='pending'>Pending</SelectItem>
                                <SelectItem value='inactive'>Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Client List */}
            <div className='grid gap-6'>
                {isLoading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <Card key={i}>
                            <CardContent className='p-6'>
                                <div className='flex items-start justify-between'>
                                    <div className='space-y-2 flex-1'>
                                        <Skeleton className='h-6 w-48' />
                                        <Skeleton className='h-4 w-32' />
                                        <Skeleton className='h-4 w-24' />
                                    </div>
                                    <Skeleton className='h-6 w-20' />
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : filteredClients.length === 0 ? (
                    <Card>
                        <CardContent className='p-12 text-center'>
                            <div className='text-muted-foreground'>
                                {searchTerm || statusFilter !== 'all'
                                    ? 'No clients match your search criteria.'
                                    : 'No clients yet. Add your first client to get started.'}
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    filteredClients.map(client => (
                        <Card
                            key={client.id}
                            className='hover:shadow-md transition-shadow'
                        >
                            <CardContent className='p-6'>
                                <div className='flex items-start justify-between'>
                                    <div className='space-y-3 flex-1'>
                                        <div className='flex items-center gap-3'>
                                            <h3 className='text-lg font-semibold'>{client.name}</h3>
                                            <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
                                        </div>
                                        <div className='space-y-1 text-sm text-muted-foreground'>
                                            <p>
                                                <strong>Relationship Manager:</strong> {client.relationshipManager}
                                            </p>
                                            <p>
                                                <strong>Accounts:</strong> {client.accountIds.length} account(s)
                                            </p>
                                            <p>
                                                <strong>Created:</strong> {formatDate(client.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant='ghost'
                                                size='sm'
                                            >
                                                <MoreHorizontal className='h-4 w-4' />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align='end'>
                                            <DropdownMenuItem onClick={() => navigate(`/clients/${client.id}`)}>
                                                <Eye className='h-4 w-4 mr-2' />
                                                View Profile
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Edit className='h-4 w-4 mr-2' />
                                                Edit Client
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className='text-red-600'>
                                                <Trash2 className='h-4 w-4 mr-2' />
                                                Delete Client
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};
