import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import { DashboardPage } from '@/pages/DashboardPage';
import { UploadPage } from '@/pages/UploadPage';
import { ComingSoonPage } from '@/pages/ComingSoonPage';

// Create a client instance
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            gcTime: 1000 * 60 * 30, // 30 minutes (renamed from cacheTime in v5)
            retry: (failureCount, error) => {
                // Don't retry on 4xx errors
                if (error && typeof error === 'object' && 'status' in error) {
                    const status = error.status as number;
                    if (status >= 400 && status < 500) {
                        return false;
                    }
                }
                return failureCount < 3;
            }
        },
        mutations: {
            retry: 1
        }
    }
});

export const App = () => {
    return (
        <ThemeProvider
            attribute='class'
            defaultTheme='light'
            enableSystem
            disableTransitionOnChange
        >
            <QueryClientProvider client={queryClient}>
                <Router>
                    <div className='min-h-screen bg-background font-sans antialiased'>
                        <Routes>
                            <Route
                                path='/'
                                element={<DashboardPage />}
                            />
                            <Route
                                path='/upload'
                                element={<UploadPage />}
                            />
                            <Route
                                path='/clients'
                                element={
                                    <ComingSoonPage
                                        title='Client Management'
                                        description='Manage your client relationships and view their analysis history.'
                                    />
                                }
                            />
                            <Route
                                path='/analysis/:id'
                                element={
                                    <ComingSoonPage
                                        title='Analysis Results'
                                        description='View detailed treasury analysis results and recommendations.'
                                    />
                                }
                            />
                            <Route
                                path='/recommendations/:id'
                                element={
                                    <ComingSoonPage
                                        title='Treasury Recommendations'
                                        description='Review and approve treasury product recommendations.'
                                    />
                                }
                            />
                            <Route
                                path='/reports'
                                element={
                                    <ComingSoonPage
                                        title='Report Generation'
                                        description='Generate and download treasury analysis reports.'
                                    />
                                }
                            />
                            <Route
                                path='/admin'
                                element={
                                    <ComingSoonPage
                                        title='Admin Configuration'
                                        description='Configure system settings and thresholds.'
                                    />
                                }
                            />
                            <Route
                                path='*'
                                element={
                                    <Navigate
                                        to='/'
                                        replace
                                    />
                                }
                            />
                        </Routes>
                    </div>
                    <Toaster />
                </Router>
            </QueryClientProvider>
        </ThemeProvider>
    );
};
