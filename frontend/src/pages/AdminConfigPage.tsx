import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { treasuryService } from '@/services/treasury';
import { Settings, DollarSign, Shield, Zap, AlertTriangle, Save, RefreshCw } from 'lucide-react';

const configFormSchema = z.object({
    thresholds: z.object({
        idleCashThreshold: z.number().min(0, 'Must be non-negative'),
        liquidityWarningThreshold: z.number().min(0, 'Must be non-negative'),
        lowBalanceThreshold: z.number().min(0, 'Must be non-negative'),
        highRiskThreshold: z.number().min(0, 'Must be non-negative')
    }),
    features: z.object({
        enableAutoAnalysis: z.boolean(),
        enableEmailNotifications: z.boolean(),
        enableRecommendationEngine: z.boolean(),
        enableAdvancedReports: z.boolean()
    }),
    integrations: z.object({
        bankApiEnabled: z.boolean(),
        webhooksEnabled: z.boolean(),
        apiRateLimit: z.number().min(1, 'Must be at least 1'),
        maxFileSize: z.number().min(1, 'Must be at least 1 MB')
    }),
    security: z.object({
        sessionTimeout: z.number().min(5, 'Must be at least 5 minutes'),
        passwordExpiry: z.number().min(30, 'Must be at least 30 days'),
        requireMfa: z.boolean(),
        auditLogRetention: z.number().min(30, 'Must be at least 30 days')
    })
});

type ConfigFormValues = z.infer<typeof configFormSchema>;

export const AdminConfigPage = () => {
    const queryClient = useQueryClient();
    const [activeTab, setActiveTab] = useState('thresholds');
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const { data: config, error } = useQuery({
        queryKey: ['systemConfig'],
        queryFn: treasuryService.getSystemConfig
    });

    const form = useForm<ConfigFormValues>({
        resolver: zodResolver(configFormSchema),
        values: config
            ? {
                  thresholds: {
                      idleCashThreshold: config.thresholds?.idleCashThreshold || 100000,
                      liquidityWarningThreshold: config.thresholds?.liquidityWarningThreshold || 50000,
                      lowBalanceThreshold: config.thresholds?.lowBalanceThreshold || 10000,
                      highRiskThreshold: config.thresholds?.highRiskThreshold || 500000
                  },
                  features: {
                      enableAutoAnalysis: config.features?.enableAutoAnalysis || true,
                      enableEmailNotifications: config.features?.enableEmailNotifications || true,
                      enableRecommendationEngine: config.features?.enableRecommendationEngine || true,
                      enableAdvancedReports: config.features?.enableAdvancedReports || true
                  },
                  integrations: {
                      bankApiEnabled: config.integrations?.bankApiEnabled || false,
                      webhooksEnabled: config.integrations?.webhooksEnabled || false,
                      apiRateLimit: config.integrations?.apiRateLimit || 1000,
                      maxFileSize: config.integrations?.maxFileSize || 50
                  },
                  security: {
                      sessionTimeout: config.security?.sessionTimeout || 60,
                      passwordExpiry: config.security?.passwordExpiry || 90,
                      requireMfa: config.security?.requireMfa || false,
                      auditLogRetention: config.security?.auditLogRetention || 365
                  }
              }
            : undefined
    });

    const updateConfigMutation = useMutation({
        mutationFn: treasuryService.updateSystemConfig,
        onSuccess: () => {
            toast.success('Configuration updated successfully');
            queryClient.invalidateQueries({ queryKey: ['systemConfig'] });
            setHasUnsavedChanges(false);
        },
        onError: error => {
            toast.error('Failed to update configuration: ' + error.message);
        }
    });

    const resetToDefaultsMutation = useMutation({
        mutationFn: treasuryService.resetConfigToDefaults,
        onSuccess: () => {
            toast.success('Configuration reset to defaults');
            queryClient.invalidateQueries({ queryKey: ['systemConfig'] });
            setHasUnsavedChanges(false);
        },
        onError: error => {
            toast.error('Failed to reset configuration: ' + error.message);
        }
    });

    const onSubmit = (values: ConfigFormValues) => {
        updateConfigMutation.mutate(values);
    };

    const handleResetToDefaults = () => {
        resetToDefaultsMutation.mutate();
    };

    // Watch for form changes
    const watchedValues = form.watch();

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    if (error) {
        return (
            <div className='container max-w-7xl mx-auto py-8 px-4 space-y-8'>
                <Alert>
                    <AlertTriangle className='h-4 w-4' />
                    <AlertDescription>
                        Failed to load system configuration. Please try refreshing the page.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className='container max-w-7xl mx-auto py-8 px-4 space-y-8'>
            {/* Header */}
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                <div>
                    <h1 className='text-3xl font-bold'>System Configuration</h1>
                    <p className='text-muted-foreground'>Configure system settings, thresholds, and integrations</p>
                </div>
                <div className='flex gap-2'>
                    <Button
                        variant='outline'
                        onClick={handleResetToDefaults}
                        disabled={resetToDefaultsMutation.isPending}
                    >
                        <RefreshCw className='h-4 w-4 mr-2' />
                        Reset to Defaults
                    </Button>
                    <Button
                        onClick={form.handleSubmit(onSubmit)}
                        disabled={updateConfigMutation.isPending || !hasUnsavedChanges}
                    >
                        <Save className='h-4 w-4 mr-2' />
                        {updateConfigMutation.isPending ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </div>

            {hasUnsavedChanges && (
                <Alert>
                    <AlertTriangle className='h-4 w-4' />
                    <AlertDescription>
                        You have unsaved changes. Don't forget to save your configuration.
                    </AlertDescription>
                </Alert>
            )}

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-8'
                >
                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className='space-y-6'
                    >
                        <TabsList className='grid w-full grid-cols-4'>
                            <TabsTrigger
                                value='thresholds'
                                className='flex items-center gap-2'
                            >
                                <DollarSign className='h-4 w-4' />
                                Thresholds
                            </TabsTrigger>
                            <TabsTrigger
                                value='features'
                                className='flex items-center gap-2'
                            >
                                <Zap className='h-4 w-4' />
                                Features
                            </TabsTrigger>
                            <TabsTrigger
                                value='integrations'
                                className='flex items-center gap-2'
                            >
                                <Settings className='h-4 w-4' />
                                Integrations
                            </TabsTrigger>
                            <TabsTrigger
                                value='security'
                                className='flex items-center gap-2'
                            >
                                <Shield className='h-4 w-4' />
                                Security
                            </TabsTrigger>
                        </TabsList>

                        {/* Thresholds Tab */}
                        <TabsContent
                            value='thresholds'
                            className='space-y-6'
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle className='flex items-center gap-2'>
                                        <DollarSign className='h-5 w-5' />
                                        Financial Thresholds
                                    </CardTitle>
                                    <CardDescription>
                                        Configure threshold amounts for analysis and alerts
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className='space-y-6'>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                        <FormField
                                            control={form.control}
                                            name='thresholds.idleCashThreshold'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Idle Cash Threshold</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type='number'
                                                            placeholder='100000'
                                                            {...field}
                                                            onChange={e => {
                                                                field.onChange(Number(e.target.value));
                                                                setHasUnsavedChanges(true);
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Amount above which cash is considered idle (
                                                        {formatCurrency(field.value || 0)})
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name='thresholds.liquidityWarningThreshold'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Liquidity Warning Threshold</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type='number'
                                                            placeholder='50000'
                                                            {...field}
                                                            onChange={e => {
                                                                field.onChange(Number(e.target.value));
                                                                setHasUnsavedChanges(true);
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Amount below which to show liquidity warnings (
                                                        {formatCurrency(field.value || 0)})
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name='thresholds.lowBalanceThreshold'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Low Balance Threshold</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type='number'
                                                            placeholder='10000'
                                                            {...field}
                                                            onChange={e => {
                                                                field.onChange(Number(e.target.value));
                                                                setHasUnsavedChanges(true);
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Amount below which to trigger low balance alerts (
                                                        {formatCurrency(field.value || 0)})
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name='thresholds.highRiskThreshold'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>High Risk Threshold</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type='number'
                                                            placeholder='500000'
                                                            {...field}
                                                            onChange={e => {
                                                                field.onChange(Number(e.target.value));
                                                                setHasUnsavedChanges(true);
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Amount above which to flag high-risk positions (
                                                        {formatCurrency(field.value || 0)})
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Features Tab */}
                        <TabsContent
                            value='features'
                            className='space-y-6'
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle className='flex items-center gap-2'>
                                        <Zap className='h-5 w-5' />
                                        Platform Features
                                    </CardTitle>
                                    <CardDescription>
                                        Enable or disable platform features and capabilities
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className='space-y-6'>
                                    <div className='grid gap-6'>
                                        <FormField
                                            control={form.control}
                                            name='features.enableAutoAnalysis'
                                            render={({ field }) => (
                                                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                                                    <div className='space-y-0.5'>
                                                        <FormLabel className='text-base'>Auto Analysis</FormLabel>
                                                        <FormDescription>
                                                            Automatically analyze uploaded statements
                                                        </FormDescription>
                                                    </div>
                                                    <FormControl>
                                                        <Switch
                                                            checked={field.value}
                                                            onCheckedChange={value => {
                                                                field.onChange(value);
                                                                setHasUnsavedChanges(true);
                                                            }}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name='features.enableEmailNotifications'
                                            render={({ field }) => (
                                                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                                                    <div className='space-y-0.5'>
                                                        <FormLabel className='text-base'>Email Notifications</FormLabel>
                                                        <FormDescription>
                                                            Send email alerts and reports to users
                                                        </FormDescription>
                                                    </div>
                                                    <FormControl>
                                                        <Switch
                                                            checked={field.value}
                                                            onCheckedChange={value => {
                                                                field.onChange(value);
                                                                setHasUnsavedChanges(true);
                                                            }}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name='features.enableRecommendationEngine'
                                            render={({ field }) => (
                                                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                                                    <div className='space-y-0.5'>
                                                        <FormLabel className='text-base'>
                                                            Recommendation Engine
                                                        </FormLabel>
                                                        <FormDescription>
                                                            Generate treasury product recommendations
                                                        </FormDescription>
                                                    </div>
                                                    <FormControl>
                                                        <Switch
                                                            checked={field.value}
                                                            onCheckedChange={value => {
                                                                field.onChange(value);
                                                                setHasUnsavedChanges(true);
                                                            }}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name='features.enableAdvancedReports'
                                            render={({ field }) => (
                                                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                                                    <div className='space-y-0.5'>
                                                        <FormLabel className='text-base'>Advanced Reports</FormLabel>
                                                        <FormDescription>
                                                            Enable advanced report templates and customization
                                                        </FormDescription>
                                                    </div>
                                                    <FormControl>
                                                        <Switch
                                                            checked={field.value}
                                                            onCheckedChange={value => {
                                                                field.onChange(value);
                                                                setHasUnsavedChanges(true);
                                                            }}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Integrations Tab */}
                        <TabsContent
                            value='integrations'
                            className='space-y-6'
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle className='flex items-center gap-2'>
                                        <Settings className='h-5 w-5' />
                                        External Integrations
                                    </CardTitle>
                                    <CardDescription>Configure external API integrations and limits</CardDescription>
                                </CardHeader>
                                <CardContent className='space-y-6'>
                                    <div className='grid gap-6'>
                                        <FormField
                                            control={form.control}
                                            name='integrations.bankApiEnabled'
                                            render={({ field }) => (
                                                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                                                    <div className='space-y-0.5'>
                                                        <FormLabel className='text-base'>
                                                            Bank API Integration
                                                        </FormLabel>
                                                        <FormDescription>
                                                            Enable direct bank API connections for statement retrieval
                                                        </FormDescription>
                                                    </div>
                                                    <FormControl>
                                                        <Switch
                                                            checked={field.value}
                                                            onCheckedChange={value => {
                                                                field.onChange(value);
                                                                setHasUnsavedChanges(true);
                                                            }}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name='integrations.webhooksEnabled'
                                            render={({ field }) => (
                                                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                                                    <div className='space-y-0.5'>
                                                        <FormLabel className='text-base'>Webhooks</FormLabel>
                                                        <FormDescription>
                                                            Enable webhook notifications for external systems
                                                        </FormDescription>
                                                    </div>
                                                    <FormControl>
                                                        <Switch
                                                            checked={field.value}
                                                            onCheckedChange={value => {
                                                                field.onChange(value);
                                                                setHasUnsavedChanges(true);
                                                            }}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />

                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                            <FormField
                                                control={form.control}
                                                name='integrations.apiRateLimit'
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>API Rate Limit</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type='number'
                                                                placeholder='1000'
                                                                {...field}
                                                                onChange={e => {
                                                                    field.onChange(Number(e.target.value));
                                                                    setHasUnsavedChanges(true);
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormDescription>
                                                            Maximum API requests per hour per user
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name='integrations.maxFileSize'
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Max File Size (MB)</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type='number'
                                                                placeholder='50'
                                                                {...field}
                                                                onChange={e => {
                                                                    field.onChange(Number(e.target.value));
                                                                    setHasUnsavedChanges(true);
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormDescription>
                                                            Maximum file upload size in megabytes
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Security Tab */}
                        <TabsContent
                            value='security'
                            className='space-y-6'
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle className='flex items-center gap-2'>
                                        <Shield className='h-5 w-5' />
                                        Security Settings
                                    </CardTitle>
                                    <CardDescription>Configure security policies and access controls</CardDescription>
                                </CardHeader>
                                <CardContent className='space-y-6'>
                                    <div className='grid gap-6'>
                                        <FormField
                                            control={form.control}
                                            name='security.requireMfa'
                                            render={({ field }) => (
                                                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                                                    <div className='space-y-0.5'>
                                                        <FormLabel className='text-base'>
                                                            Require Multi-Factor Authentication
                                                        </FormLabel>
                                                        <FormDescription>
                                                            Require MFA for all user logins
                                                        </FormDescription>
                                                    </div>
                                                    <FormControl>
                                                        <Switch
                                                            checked={field.value}
                                                            onCheckedChange={value => {
                                                                field.onChange(value);
                                                                setHasUnsavedChanges(true);
                                                            }}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />

                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                            <FormField
                                                control={form.control}
                                                name='security.sessionTimeout'
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Session Timeout (minutes)</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type='number'
                                                                placeholder='60'
                                                                {...field}
                                                                onChange={e => {
                                                                    field.onChange(Number(e.target.value));
                                                                    setHasUnsavedChanges(true);
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormDescription>
                                                            Automatic logout after inactivity
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name='security.passwordExpiry'
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Password Expiry (days)</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type='number'
                                                                placeholder='90'
                                                                {...field}
                                                                onChange={e => {
                                                                    field.onChange(Number(e.target.value));
                                                                    setHasUnsavedChanges(true);
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormDescription>
                                                            Days after which passwords must be changed
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name='security.auditLogRetention'
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Audit Log Retention (days)</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type='number'
                                                                placeholder='365'
                                                                {...field}
                                                                onChange={e => {
                                                                    field.onChange(Number(e.target.value));
                                                                    setHasUnsavedChanges(true);
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormDescription>
                                                            Days to retain audit log entries
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </form>
            </Form>

            {/* Configuration Status */}
            <Card>
                <CardHeader>
                    <CardTitle>Configuration Status</CardTitle>
                    <CardDescription>Current system configuration overview</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                        <div className='text-center'>
                            <div className='text-2xl font-bold'>
                                {formatCurrency(watchedValues.thresholds?.idleCashThreshold || 0)}
                            </div>
                            <div className='text-sm text-muted-foreground'>Idle Cash Threshold</div>
                        </div>
                        <div className='text-center'>
                            <div className='text-2xl font-bold'>{watchedValues.integrations?.apiRateLimit || 0}</div>
                            <div className='text-sm text-muted-foreground'>API Rate Limit</div>
                        </div>
                        <div className='text-center'>
                            <div className='text-2xl font-bold'>{watchedValues.security?.sessionTimeout || 0}m</div>
                            <div className='text-sm text-muted-foreground'>Session Timeout</div>
                        </div>
                        <div className='text-center'>
                            <div className='text-2xl font-bold'>{watchedValues.integrations?.maxFileSize || 0}MB</div>
                            <div className='text-sm text-muted-foreground'>Max File Size</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
