import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import { AppLayout } from '@/components/AppLayout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { DashboardPage } from '@/pages/DashboardPage';
import { UploadPage } from '@/pages/UploadPage';
import { LoginPage } from '@/pages/LoginPage';
import { SignupPage } from '@/pages/SignupPage';
import { ClientsPage } from '@/pages/ClientsPage';
import { ClientProfilePage } from '@/pages/ClientProfilePage';
import { AnalysisPage } from '@/pages/AnalysisPage';
import { RecommendationsPage } from '@/pages/RecommendationsPage';
import { ProductsPage } from '@/pages/ProductsPage';
import { ReportGenerationPage } from '@/pages/ReportGenerationPage';
import { ReportHistoryPage } from '@/pages/ReportHistoryPage';
import { AdminConfigPage } from '@/pages/AdminConfigPage';
import { AuditTrailPage } from '@/pages/AuditTrailPage';

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
                            {/* Auth routes */}
                            <Route
                                path='/login'
                                element={<LoginPage />}
                            />
                            <Route
                                path='/signup'
                                element={<SignupPage />}
                            />

                            {/* Protected routes with layout */}
                            <Route
                                path='/'
                                element={
                                    <ProtectedRoute>
                                        <AppLayout>
                                            <DashboardPage />
                                        </AppLayout>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path='/upload'
                                element={
                                    <ProtectedRoute>
                                        <AppLayout>
                                            <UploadPage />
                                        </AppLayout>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path='/clients'
                                element={
                                    <ProtectedRoute>
                                        <AppLayout>
                                            <ClientsPage />
                                        </AppLayout>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path='/clients/:id'
                                element={
                                    <ProtectedRoute>
                                        <AppLayout>
                                            <ClientProfilePage />
                                        </AppLayout>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path='/analysis/:id'
                                element={
                                    <ProtectedRoute>
                                        <AppLayout>
                                            <AnalysisPage />
                                        </AppLayout>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path='/recommendations/:id'
                                element={
                                    <ProtectedRoute>
                                        <AppLayout>
                                            <RecommendationsPage />
                                        </AppLayout>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path='/products'
                                element={
                                    <ProtectedRoute>
                                        <AppLayout>
                                            <ProductsPage />
                                        </AppLayout>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path='/reports'
                                element={
                                    <ProtectedRoute>
                                        <AppLayout>
                                            <ReportGenerationPage />
                                        </AppLayout>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path='/reports/generate'
                                element={
                                    <ProtectedRoute>
                                        <AppLayout>
                                            <ReportGenerationPage />
                                        </AppLayout>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path='/reports/history'
                                element={
                                    <ProtectedRoute>
                                        <AppLayout>
                                            <ReportHistoryPage />
                                        </AppLayout>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path='/admin'
                                element={
                                    <ProtectedRoute requireAdmin>
                                        <AppLayout>
                                            <AdminConfigPage />
                                        </AppLayout>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path='/admin/config'
                                element={
                                    <ProtectedRoute requireAdmin>
                                        <AppLayout>
                                            <AdminConfigPage />
                                        </AppLayout>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path='/admin/audit'
                                element={
                                    <ProtectedRoute requireAdmin>
                                        <AppLayout>
                                            <AuditTrailPage />
                                        </AppLayout>
                                    </ProtectedRoute>
                                }
                            />

                            {/* Fallback */}
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
