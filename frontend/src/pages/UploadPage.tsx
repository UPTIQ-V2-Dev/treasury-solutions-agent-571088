import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { FileText, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { StatementUploader } from '@/components/StatementUploader';
import { ClientSelector } from '@/components/ClientSelector';
import { treasuryService } from '@/services/treasury';
import type { UploadStatus } from '@/types/treasury';

export const UploadPage = () => {
    const navigate = useNavigate();
    const [selectedClientId, setSelectedClientId] = useState<string | undefined>();
    const [uploadResults, setUploadResults] = useState<UploadStatus[]>([]);
    const [currentStep, setCurrentStep] = useState<'select' | 'upload' | 'processing' | 'complete'>('select');

    const parseStatementsMutation = useMutation({
        mutationFn: treasuryService.parseStatements,
        onSuccess: parseResults => {
            setCurrentStep('complete');
            // Auto-navigate to analysis after successful parsing
            setTimeout(() => {
                if (parseResults.length > 0) {
                    navigate(`/analysis/create`, {
                        state: {
                            clientId: selectedClientId,
                            parseResults
                        }
                    });
                }
            }, 2000);
        },
        onError: error => {
            console.error('Parse error:', error);
        }
    });

    const handleUploadComplete = (results: UploadStatus[]) => {
        setUploadResults(results);
        setCurrentStep('processing');

        // Start parsing the uploaded files
        const fileIds = results.map(result => result.id);
        parseStatementsMutation.mutate(fileIds);
    };

    const handleStartOver = () => {
        setSelectedClientId(undefined);
        setUploadResults([]);
        setCurrentStep('select');
        parseStatementsMutation.reset();
    };

    const handleProceedToAnalysis = () => {
        if (uploadResults.length > 0 && selectedClientId) {
            navigate(`/analysis/create`, {
                state: {
                    clientId: selectedClientId,
                    uploadResults
                }
            });
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 'select':
            case 'upload':
                return (
                    <div className='space-y-6'>
                        <ClientSelector
                            value={selectedClientId}
                            onValueChange={setSelectedClientId}
                            placeholder='Choose a client to analyze...'
                        />

                        {selectedClientId && (
                            <StatementUploader
                                clientId={selectedClientId}
                                onUploadComplete={handleUploadComplete}
                                maxFiles={5}
                                maxSizePerFile={10}
                            />
                        )}
                    </div>
                );

            case 'processing':
                return (
                    <div className='space-y-6 text-center'>
                        <div className='space-y-4'>
                            <FileText className='h-16 w-16 mx-auto text-primary animate-pulse' />
                            <div>
                                <h3 className='text-lg font-semibold mb-2'>Processing Statements</h3>
                                <p className='text-muted-foreground mb-4'>
                                    We're analyzing your bank statements and extracting transaction data. This usually
                                    takes 30-60 seconds.
                                </p>
                                <Progress
                                    value={parseStatementsMutation.isPending ? 65 : 100}
                                    className='w-full max-w-md mx-auto'
                                />
                            </div>
                        </div>

                        {/* Upload Results Summary */}
                        <div className='bg-muted/50 rounded-lg p-4'>
                            <h4 className='font-medium mb-3'>Uploaded Files</h4>
                            <div className='space-y-2'>
                                {uploadResults.map(result => (
                                    <div
                                        key={result.id}
                                        className='flex items-center justify-between text-sm'
                                    >
                                        <span className='flex items-center gap-2'>
                                            <CheckCircle2 className='h-4 w-4 text-green-600' />
                                            {result.filename}
                                        </span>
                                        <span className='text-muted-foreground'>Uploaded</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {parseStatementsMutation.isError && (
                            <Alert className='max-w-md mx-auto'>
                                <AlertDescription>
                                    There was an error processing your statements. Please try uploading again.
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>
                );

            case 'complete':
                return (
                    <div className='space-y-6 text-center'>
                        <div className='space-y-4'>
                            <CheckCircle2 className='h-16 w-16 mx-auto text-green-600' />
                            <div>
                                <h3 className='text-lg font-semibold text-green-600 mb-2'>Processing Complete!</h3>
                                <p className='text-muted-foreground mb-4'>
                                    Your bank statements have been successfully processed and are ready for analysis.
                                </p>
                            </div>
                        </div>

                        {/* Processing Results */}
                        {parseStatementsMutation.data && (
                            <div className='bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto'>
                                <h4 className='font-medium mb-3 text-green-800'>Processing Summary</h4>
                                <div className='space-y-2 text-sm'>
                                    {parseStatementsMutation.data.map(result => (
                                        <div
                                            key={result.id}
                                            className='flex justify-between'
                                        >
                                            <span>Transactions Found:</span>
                                            <span className='font-medium'>{result.totalTransactions}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className='flex justify-center gap-4'>
                            <Button
                                variant='outline'
                                onClick={handleStartOver}
                            >
                                Upload More Files
                            </Button>
                            <Button
                                onClick={handleProceedToAnalysis}
                                className='gap-2'
                            >
                                Proceed to Analysis
                                <ArrowRight className='h-4 w-4' />
                            </Button>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    const getStepNumber = () => {
        switch (currentStep) {
            case 'select':
            case 'upload':
                return 1;
            case 'processing':
                return 2;
            case 'complete':
                return 3;
            default:
                return 1;
        }
    };

    const getStepTitle = () => {
        switch (currentStep) {
            case 'select':
            case 'upload':
                return 'Upload Bank Statements';
            case 'processing':
                return 'Processing Files';
            case 'complete':
                return 'Ready for Analysis';
            default:
                return 'Upload Bank Statements';
        }
    };

    return (
        <div className='container max-w-4xl mx-auto py-8 px-4'>
            {/* Header */}
            <div className='text-center mb-8'>
                <h1 className='text-3xl font-bold mb-2'>Treasury Analysis</h1>
                <p className='text-lg text-muted-foreground'>
                    Upload bank statements to analyze cash flow and discover treasury optimization opportunities
                </p>
            </div>

            {/* Progress Steps */}
            <div className='flex justify-center mb-8'>
                <div className='flex items-center space-x-4'>
                    {[1, 2, 3].map(step => (
                        <div
                            key={step}
                            className='flex items-center'
                        >
                            <div
                                className={`
                flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium
                ${
                    step <= getStepNumber()
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-muted text-muted-foreground'
                }
              `}
                            >
                                {step < getStepNumber() ? <CheckCircle2 className='h-4 w-4' /> : step}
                            </div>
                            {step < 3 && (
                                <div
                                    className={`
                  w-12 h-0.5 mx-2
                  ${step < getStepNumber() ? 'bg-primary' : 'bg-muted'}
                `}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <Card>
                <CardHeader className='text-center'>
                    <CardTitle>{getStepTitle()}</CardTitle>
                    <CardDescription>
                        {currentStep === 'select' || currentStep === 'upload'
                            ? 'Select your client and upload their bank statements for analysis'
                            : currentStep === 'processing'
                              ? 'Please wait while we process your uploaded files'
                              : 'Your statements have been successfully processed'}
                    </CardDescription>
                </CardHeader>
                <CardContent>{renderStepContent()}</CardContent>
            </Card>

            {/* Help Text */}
            <div className='mt-8 text-center space-y-2'>
                <p className='text-sm text-muted-foreground'>
                    <strong>Supported formats:</strong> PDF bank statements, CSV exports, OFX files
                </p>
                <p className='text-sm text-muted-foreground'>
                    <strong>File size limit:</strong> 10MB per file, up to 5 files at once
                </p>
                <p className='text-sm text-muted-foreground'>
                    Your data is encrypted and processed securely in accordance with banking regulations.
                </p>
            </div>
        </div>
    );
};
