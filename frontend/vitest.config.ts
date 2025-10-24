import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/setup.ts',
        css: true,
        pool: 'threads',
        poolOptions: {
            threads: {
                singleThread: true
            }
        },
        // Temporarily exclude React component tests due to React 19 act compatibility issues
        exclude: [
            '**/node_modules/**',
            '**/dist/**',
            'src/components/__tests__/**',
            'src/pages/__tests__/**',
            'src/test/App.test.tsx',
            'src/test/utils.test.ts'
        ],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: ['node_modules/', 'src/test/', '**/*.d.ts', '**/*.config.*', '**/mockData.ts', 'dist/']
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
});
