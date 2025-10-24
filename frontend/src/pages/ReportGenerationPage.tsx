import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ClientSelector } from '@/components/ClientSelector';
import { treasuryService } from '@/services/treasury';
import { FileText, Download, Eye, Settings } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { CreateReportRequest } from '@/types/treasury';

const reportFormSchema = z.object({
    analysisId: z.string().min(1, 'Analysis is required'),
    templateId: z.string().min(1, 'Template is required'),
    format: z.enum(['pdf', 'html', 'excel']),
    includeCharts: z.boolean(),
    includeDataTables: z.boolean(),
    includeRecommendations: z.boolean(),
    customTitle: z.string().optional()
});

type ReportFormValues = z.infer<typeof reportFormSchema>;

export const ReportGenerationPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [selectedClient, setSelectedClient] = useState<string | undefined>('');
    const [previewVisible, setPreviewVisible] = useState(false);

    const form = useForm<ReportFormValues>({
        resolver: zodResolver(reportFormSchema),
        defaultValues: {
            analysisId: searchParams.get('analysisId') || '',
            templateId: '',
            format: 'pdf',
            includeCharts: true,
            includeDataTables: true,
            includeRecommendations: true,
            customTitle: ''
        }
    });

    const { data: templates = [], isLoading: templatesLoading } = useQuery({
        queryKey: ['reportTemplates'],
        queryFn: treasuryService.getReportTemplates
    });

    const { data: analyses = [], isLoading: analysesLoading } = useQuery({
        queryKey: ['analyses', selectedClient],
        queryFn: async () => {
            if (!selectedClient) return [];
            return []; // In real app, would fetch analyses for client
        },
        enabled: !!selectedClient
    });

    const generateReportMutation = useMutation({
        mutationFn: async (values: ReportFormValues) => {
            const selectedTemplate = templates.find(t => t.id === values.templateId);
            if (!selectedTemplate) throw new Error('Template not found');

            const request: CreateReportRequest = {
                analysisId: values.analysisId,
                format: values.format,
                template: selectedTemplate.name as 'standard' | 'executive' | 'detailed',
                includeDataTables: values.includeDataTables
            };

            return treasuryService.generateReport(request);
        },
        onSuccess: data => {
            toast.success('Report generated successfully!');
            navigate('/reports/history');
        },
        onError: error => {
            toast.error('Failed to generate report: ' + error.message);
        }
    });

    const watchedValues = form.watch();
    const selectedTemplate = templates.find(t => t.id === watchedValues.templateId);

    const onSubmit = (values: ReportFormValues) => {
        generateReportMutation.mutate(values);
    };

    return (
        <div className='container max-w-7xl mx-auto py-8 px-4 space-y-8'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-3xl font-bold'>Generate Report</h1>
                    <p className='text-muted-foreground mt-1'>Create customized treasury analysis reports</p>
                </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {/* Configuration Panel */}
                <div className='lg:col-span-2'>
                    <Card>
                        <CardHeader>
                            <CardTitle className='flex items-center gap-2'>
                                <Settings className='h-5 w-5' />
                                Report Configuration
                            </CardTitle>
                            <CardDescription>Configure your report settings and template options</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className='space-y-6'
                                >
                                    {/* Client Selection */}
                                    <div className='space-y-2'>
                                        <Label htmlFor='client'>Select Client</Label>
                                        <ClientSelector
                                            value={selectedClient}
                                            onValueChange={setSelectedClient}
                                            placeholder='Choose a client...'
                                        />
                                    </div>

                                    {/* Analysis Selection */}
                                    <FormField
                                        control={form.control}
                                        name='analysisId'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Analysis</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder='Select an analysis...' />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {analysesLoading ? (
                                                            <SelectItem
                                                                value='loading'
                                                                disabled
                                                            >
                                                                Loading analyses...
                                                            </SelectItem>
                                                        ) : analyses.length === 0 ? (
                                                            <SelectItem
                                                                value='none'
                                                                disabled
                                                            >
                                                                {selectedClient
                                                                    ? 'No analyses found'
                                                                    : 'Select a client first'}
                                                            </SelectItem>
                                                        ) : (
                                                            analyses.map((analysis: any) => (
                                                                <SelectItem
                                                                    key={analysis.id}
                                                                    value={analysis.id}
                                                                >
                                                                    {analysis.title}
                                                                </SelectItem>
                                                            ))
                                                        )}
                                                        {/* Mock options for demo */}
                                                        <SelectItem value='analysis-1'>Q4 2024 Analysis</SelectItem>
                                                        <SelectItem value='analysis-2'>
                                                            October 2024 Analysis
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Separator />

                                    {/* Template Selection */}
                                    <FormField
                                        control={form.control}
                                        name='templateId'
                                        render={({ field }) => (
                                            <FormItem className='space-y-3'>
                                                <FormLabel>Report Template</FormLabel>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={field.onChange}
                                                        value={field.value}
                                                        className='grid gap-4'
                                                    >
                                                        {templatesLoading ? (
                                                            <div className='text-sm text-muted-foreground'>
                                                                Loading templates...
                                                            </div>
                                                        ) : (
                                                            templates.map(template => (
                                                                <div
                                                                    key={template.id}
                                                                    className='flex items-start space-x-3 space-y-0'
                                                                >
                                                                    <RadioGroupItem
                                                                        value={template.id}
                                                                        className='mt-1'
                                                                    />
                                                                    <div className='grid gap-1.5 leading-none flex-1'>
                                                                        <div className='flex items-center gap-2'>
                                                                            <Label className='font-medium'>
                                                                                {template.name}
                                                                            </Label>
                                                                            <Badge
                                                                                variant='outline'
                                                                                className='capitalize'
                                                                            >
                                                                                {template.format}
                                                                            </Badge>
                                                                        </div>
                                                                        <p className='text-sm text-muted-foreground'>
                                                                            {template.description}
                                                                        </p>
                                                                        <div className='flex flex-wrap gap-1 mt-1'>
                                                                            {template.sections
                                                                                .slice(0, 3)
                                                                                .map(section => (
                                                                                    <Badge
                                                                                        key={section}
                                                                                        variant='secondary'
                                                                                        className='text-xs'
                                                                                    >
                                                                                        {section}
                                                                                    </Badge>
                                                                                ))}
                                                                            {template.sections.length > 3 && (
                                                                                <Badge
                                                                                    variant='secondary'
                                                                                    className='text-xs'
                                                                                >
                                                                                    +{template.sections.length - 3} more
                                                                                </Badge>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        )}
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Separator />

                                    {/* Format Selection */}
                                    <FormField
                                        control={form.control}
                                        name='format'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Export Format</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value='pdf'>PDF Document</SelectItem>
                                                        <SelectItem value='html'>HTML Report</SelectItem>
                                                        <SelectItem value='excel'>Excel Spreadsheet</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Custom Title */}
                                    <FormField
                                        control={form.control}
                                        name='customTitle'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Custom Title (Optional)</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder='Enter custom report title...'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Leave blank to use the default template title
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Separator />

                                    {/* Content Options */}
                                    <div className='space-y-4'>
                                        <h4 className='font-medium'>Content Options</h4>

                                        <FormField
                                            control={form.control}
                                            name='includeCharts'
                                            render={({ field }) => (
                                                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                                                    <div className='space-y-0.5'>
                                                        <FormLabel>Include Charts</FormLabel>
                                                        <FormDescription>
                                                            Add visual charts and graphs to the report
                                                        </FormDescription>
                                                    </div>
                                                    <FormControl>
                                                        <Switch
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name='includeDataTables'
                                            render={({ field }) => (
                                                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                                                    <div className='space-y-0.5'>
                                                        <FormLabel>Include Data Tables</FormLabel>
                                                        <FormDescription>
                                                            Include detailed transaction and analysis tables
                                                        </FormDescription>
                                                    </div>
                                                    <FormControl>
                                                        <Switch
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name='includeRecommendations'
                                            render={({ field }) => (
                                                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                                                    <div className='space-y-0.5'>
                                                        <FormLabel>Include Recommendations</FormLabel>
                                                        <FormDescription>
                                                            Add treasury product recommendations and analysis
                                                        </FormDescription>
                                                    </div>
                                                    <FormControl>
                                                        <Switch
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className='flex gap-3 pt-4'>
                                        <Button
                                            type='button'
                                            variant='outline'
                                            onClick={() => setPreviewVisible(!previewVisible)}
                                            disabled={!selectedTemplate}
                                        >
                                            <Eye className='h-4 w-4 mr-2' />
                                            {previewVisible ? 'Hide Preview' : 'Show Preview'}
                                        </Button>
                                        <Button
                                            type='submit'
                                            disabled={generateReportMutation.isPending || !selectedTemplate}
                                        >
                                            <FileText className='h-4 w-4 mr-2' />
                                            {generateReportMutation.isPending ? 'Generating...' : 'Generate Report'}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>

                {/* Preview Panel */}
                <div className='space-y-6'>
                    {selectedTemplate && (
                        <Card>
                            <CardHeader>
                                <CardTitle className='flex items-center gap-2'>
                                    <Eye className='h-5 w-5' />
                                    Template Preview
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='space-y-4'>
                                <div>
                                    <h4 className='font-medium mb-2'>Sections Included:</h4>
                                    <div className='space-y-1'>
                                        {selectedTemplate.sections.map(section => (
                                            <div
                                                key={section}
                                                className='flex items-center gap-2 text-sm'
                                            >
                                                <div className='h-1.5 w-1.5 rounded-full bg-primary' />
                                                {section}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <h4 className='font-medium mb-2'>Format Details:</h4>
                                    <div className='space-y-1 text-sm text-muted-foreground'>
                                        <div>Format: {watchedValues.format?.toUpperCase()}</div>
                                        <div>Charts: {watchedValues.includeCharts ? 'Included' : 'Excluded'}</div>
                                        <div>
                                            Data Tables: {watchedValues.includeDataTables ? 'Included' : 'Excluded'}
                                        </div>
                                        <div>
                                            Recommendations:{' '}
                                            {watchedValues.includeRecommendations ? 'Included' : 'Excluded'}
                                        </div>
                                    </div>
                                </div>

                                {watchedValues.customTitle && (
                                    <>
                                        <Separator />
                                        <div>
                                            <h4 className='font-medium mb-1'>Custom Title:</h4>
                                            <p className='text-sm text-muted-foreground'>{watchedValues.customTitle}</p>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-2'>
                            <Button
                                variant='outline'
                                className='w-full justify-start'
                                onClick={() => navigate('/reports/history')}
                            >
                                <FileText className='h-4 w-4 mr-2' />
                                View Report History
                            </Button>
                            <Button
                                variant='outline'
                                className='w-full justify-start'
                                onClick={() => navigate('/clients')}
                            >
                                <Download className='h-4 w-4 mr-2' />
                                Manage Clients
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
