import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { render } from '@/test/test-utils';
import { DataTable } from '../DataTable';
import type { ColumnDef } from '@tanstack/react-table';

interface TestData {
    id: string;
    name: string;
    email: string;
    status: string;
}

const mockData: TestData[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com', status: 'active' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', status: 'active' }
];

const columns: ColumnDef<TestData>[] = [
    {
        accessorKey: 'name',
        header: 'Name'
    },
    {
        accessorKey: 'email',
        header: 'Email'
    },
    {
        accessorKey: 'status',
        header: 'Status'
    }
];

describe('DataTable', () => {
    it('renders table with data', () => {
        render(
            <DataTable
                columns={columns}
                data={mockData}
                searchKey='name'
            />
        );

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('jane@example.com')).toBeInTheDocument();
        expect(screen.getByText('active')).toBeInTheDocument();
    });

    it('filters data based on search input', async () => {
        const user = userEvent.setup();
        render(
            <DataTable
                columns={columns}
                data={mockData}
                searchKey='name'
                searchPlaceholder='Search by name...'
            />
        );

        const searchInput = screen.getByPlaceholderText('Search by name...');
        await user.type(searchInput, 'John');

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
        expect(screen.queryByText('Bob Johnson')).not.toBeInTheDocument();
    });

    it('displays column toggle dropdown when enabled', async () => {
        const user = userEvent.setup();
        render(
            <DataTable
                columns={columns}
                data={mockData}
                showColumnToggle={true}
            />
        );

        const columnToggle = screen.getByRole('button', { name: /columns/i });
        await user.click(columnToggle);

        expect(screen.getByRole('menuitem', { name: /name/i })).toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: /email/i })).toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: /status/i })).toBeInTheDocument();
    });

    it('displays pagination when enabled', () => {
        render(
            <DataTable
                columns={columns}
                data={mockData}
                showPagination={true}
            />
        );

        expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
        expect(screen.getByText(/row\(s\) selected/)).toBeInTheDocument();
    });

    it('shows no results message when data is empty', () => {
        render(
            <DataTable
                columns={columns}
                data={[]}
            />
        );

        expect(screen.getByText(/no results found/i)).toBeInTheDocument();
    });

    it('hides search when searchKey is not provided', () => {
        render(
            <DataTable
                columns={columns}
                data={mockData}
            />
        );

        expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    });

    it('hides column toggle when disabled', () => {
        render(
            <DataTable
                columns={columns}
                data={mockData}
                showColumnToggle={false}
            />
        );

        expect(screen.queryByRole('button', { name: /columns/i })).not.toBeInTheDocument();
    });

    it('hides pagination when disabled', () => {
        render(
            <DataTable
                columns={columns}
                data={mockData}
                showPagination={false}
            />
        );

        expect(screen.queryByRole('button', { name: /previous/i })).not.toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /next/i })).not.toBeInTheDocument();
    });
});
