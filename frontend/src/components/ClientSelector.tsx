import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Check, ChevronsUpDown, Building, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { treasuryService } from '@/services/treasury';
import type { Client } from '@/types/treasury';

interface ClientSelectorProps {
    value?: string;
    onValueChange: (clientId: string | undefined) => void;
    onCreateClient?: () => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
}

export const ClientSelector = ({
    value,
    onValueChange,
    onCreateClient,
    placeholder = 'Select a client...',
    className,
    disabled = false
}: ClientSelectorProps) => {
    const [open, setOpen] = useState(false);

    const {
        data: clients,
        isLoading,
        error
    } = useQuery({
        queryKey: ['clients'],
        queryFn: treasuryService.getClients,
        staleTime: 5 * 60 * 1000 // 5 minutes
    });

    const selectedClient = clients?.find(client => client.id === value);

    const getStatusColor = (status: Client['status']) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800 hover:bg-green-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
            case 'inactive':
                return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
            default:
                return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
        }
    };

    if (isLoading) {
        return (
            <div className={cn('space-y-2', className)}>
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-10 w-full' />
            </div>
        );
    }

    if (error) {
        return (
            <div className={cn('space-y-2', className)}>
                <p className='text-sm font-medium'>Client</p>
                <div className='p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md'>
                    Failed to load clients. Please try again.
                </div>
            </div>
        );
    }

    return (
        <div className={cn('space-y-2', className)}>
            <label className='text-sm font-medium'>Client</label>
            <Popover
                open={open}
                onOpenChange={setOpen}
            >
                <PopoverTrigger asChild>
                    <Button
                        variant='outline'
                        role='combobox'
                        aria-expanded={open}
                        className={cn('justify-between w-full', !value && 'text-muted-foreground')}
                        disabled={disabled}
                    >
                        <div className='flex items-center gap-2'>
                            {selectedClient ? (
                                <>
                                    <Building className='h-4 w-4' />
                                    <span className='truncate'>{selectedClient.name}</span>
                                    <Badge
                                        variant='secondary'
                                        className={cn('text-xs', getStatusColor(selectedClient.status))}
                                    >
                                        {selectedClient.status}
                                    </Badge>
                                </>
                            ) : (
                                <span>{placeholder}</span>
                            )}
                        </div>
                        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className='w-full p-0'
                    align='start'
                >
                    <Command>
                        <CommandInput
                            placeholder='Search clients...'
                            className='h-9'
                        />
                        <CommandList>
                            <CommandEmpty>
                                <div className='py-4 text-center'>
                                    <p className='text-sm text-muted-foreground mb-2'>No clients found.</p>
                                    {onCreateClient && (
                                        <Button
                                            variant='outline'
                                            size='sm'
                                            onClick={() => {
                                                onCreateClient();
                                                setOpen(false);
                                            }}
                                            className='gap-2'
                                        >
                                            <Plus className='h-4 w-4' />
                                            Create New Client
                                        </Button>
                                    )}
                                </div>
                            </CommandEmpty>

                            <CommandGroup>
                                {clients?.map(client => (
                                    <CommandItem
                                        key={client.id}
                                        value={`${client.name} ${client.relationshipManager}`.toLowerCase()}
                                        onSelect={() => {
                                            onValueChange(client.id === value ? undefined : client.id);
                                            setOpen(false);
                                        }}
                                        className='gap-2'
                                    >
                                        <Check
                                            className={cn('h-4 w-4', value === client.id ? 'opacity-100' : 'opacity-0')}
                                        />
                                        <Building className='h-4 w-4 text-muted-foreground' />
                                        <div className='flex-1 min-w-0'>
                                            <div className='flex items-center justify-between'>
                                                <span className='font-medium truncate'>{client.name}</span>
                                                <Badge
                                                    variant='secondary'
                                                    className={cn('text-xs ml-2', getStatusColor(client.status))}
                                                >
                                                    {client.status}
                                                </Badge>
                                            </div>
                                            <div className='text-xs text-muted-foreground truncate'>
                                                RM: {client.relationshipManager}
                                            </div>
                                            {client.accountIds.length > 0 && (
                                                <div className='text-xs text-muted-foreground'>
                                                    {client.accountIds.length} account
                                                    {client.accountIds.length > 1 ? 's' : ''}
                                                </div>
                                            )}
                                        </div>
                                    </CommandItem>
                                ))}
                            </CommandGroup>

                            {onCreateClient && clients && clients.length > 0 && (
                                <CommandGroup>
                                    <CommandItem
                                        onSelect={() => {
                                            onCreateClient();
                                            setOpen(false);
                                        }}
                                        className='gap-2 text-primary'
                                    >
                                        <Plus className='h-4 w-4' />
                                        Create New Client
                                    </CommandItem>
                                </CommandGroup>
                            )}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            {selectedClient && (
                <div className='text-xs text-muted-foreground space-y-1'>
                    <p>Relationship Manager: {selectedClient.relationshipManager}</p>
                    {selectedClient.accountIds.length > 0 && <p>Accounts: {selectedClient.accountIds.join(', ')}</p>}
                </div>
            )}
        </div>
    );
};
