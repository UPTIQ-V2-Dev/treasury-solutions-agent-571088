import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll, afterAll, vi } from 'vitest';
import { server } from './mocks/server';

// Mock React.act for React 19 compatibility
vi.mock('react', async importOriginal => {
    const actual = await importOriginal<typeof import('react')>();
    return {
        ...actual,
        act: vi.fn(callback => {
            const result = callback();
            return Promise.resolve(result);
        })
    };
});

// Configure React Testing Library for React 19
import { configure } from '@testing-library/react';
configure({ testIdAttribute: 'data-testid' });

// Start server before all tests
beforeAll(() => server.listen());

// Reset handlers after each test `important for test isolation`
afterEach(() => {
    cleanup();
    server.resetHandlers();
});

// Close server after all tests
afterAll(() => server.close());
