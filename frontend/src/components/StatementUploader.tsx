import { useState, useRef, useCallback } from 'react';
import { Upload, FileText, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import type { UploadStatus } from '@/types/treasury';

interface StatementUploaderProps {
    onUploadComplete: (uploadResults: UploadStatus[]) => void;
    clientId?: string;
    maxFiles?: number;
    maxSizePerFile?: number; // in MB
    disabled?: boolean;
    className?: string;
}

const ACCEPTED_FILE_TYPES = ['application/pdf', 'text/csv', 'application/vnd.ms-excel', 'text/plain'];
const ACCEPTED_EXTENSIONS = ['.pdf', '.csv', '.ofx', '.txt'];
const DEFAULT_MAX_FILES = 5;
const DEFAULT_MAX_SIZE_MB = 10;

interface FileWithStatus {
    file: File;
    status: 'pending' | 'uploading' | 'completed' | 'error';
    progress: number;
    error?: string;
    id: string;
}

export const StatementUploader = ({
    onUploadComplete,
    clientId,
    maxFiles = DEFAULT_MAX_FILES,
    maxSizePerFile = DEFAULT_MAX_SIZE_MB,
    disabled = false,
    className
}: StatementUploaderProps) => {
    const [files, setFiles] = useState<FileWithStatus[]>([]);
    const [isDragOver, setIsDragOver] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const validateFile = useCallback(
        (file: File): string | null => {
            // Check file type
            const isValidType =
                ACCEPTED_FILE_TYPES.includes(file.type) ||
                ACCEPTED_EXTENSIONS.some(ext => file.name.toLowerCase().endsWith(ext));

            if (!isValidType) {
                return 'Unsupported file type. Please upload PDF, CSV, or OFX files.';
            }

            // Check file size
            const fileSizeMB = file.size / (1024 * 1024);
            if (fileSizeMB > maxSizePerFile) {
                return `File size exceeds ${maxSizePerFile}MB limit.`;
            }

            return null;
        },
        [maxSizePerFile]
    );

    const addFiles = useCallback(
        (newFiles: FileList | File[]) => {
            const filesToAdd: FileWithStatus[] = [];
            const errors: string[] = [];

            Array.from(newFiles).forEach(file => {
                // Check if file already exists
                const exists = files.some(f => f.file.name === file.name && f.file.size === file.size);
                if (exists) {
                    errors.push(`${file.name} is already added.`);
                    return;
                }

                // Validate file
                const validationError = validateFile(file);
                if (validationError) {
                    errors.push(`${file.name}: ${validationError}`);
                    return;
                }

                filesToAdd.push({
                    file,
                    status: 'pending',
                    progress: 0,
                    id: `${file.name}-${Date.now()}-${Math.random()}`
                });
            });

            // Check total file count
            if (files.length + filesToAdd.length > maxFiles) {
                errors.push(`Cannot upload more than ${maxFiles} files at once.`);
                return;
            }

            if (errors.length > 0) {
                // Show errors (in a real app, you might want to use a toast notification)
                console.error('File validation errors:', errors);
                return;
            }

            setFiles(prev => [...prev, ...filesToAdd]);
        },
        [files, maxFiles, validateFile]
    );

    const removeFile = (fileId: string) => {
        setFiles(prev => prev.filter(f => f.id !== fileId));
    };

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
            setIsDragOver(true);
        }
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
            setIsDragOver(false);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);

        if (disabled || !e.dataTransfer.files.length) return;

        addFiles(e.dataTransfer.files);
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            addFiles(e.target.files);
        }
    };

    const simulateUpload = async (fileWithStatus: FileWithStatus): Promise<UploadStatus> => {
        const { file, id } = fileWithStatus;

        // Simulate upload progress
        return new Promise(resolve => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 20;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);

                    // Update file status
                    setFiles(prev => prev.map(f => (f.id === id ? { ...f, status: 'completed', progress: 100 } : f)));

                    resolve({
                        id: `upload-${Date.now()}`,
                        status: 'completed',
                        progress: 100,
                        filename: file.name
                    });
                } else {
                    // Update progress
                    setFiles(prev =>
                        prev.map(f => (f.id === id ? { ...f, status: 'uploading', progress: Math.round(progress) } : f))
                    );
                }
            }, 200);
        });
    };

    const handleUpload = async () => {
        if (!clientId || files.length === 0) return;

        setIsUploading(true);

        try {
            // Update all files to uploading status
            setFiles(prev => prev.map(f => ({ ...f, status: 'uploading' as const })));

            // Simulate upload for each file
            const uploadPromises = files.map(fileWithStatus => simulateUpload(fileWithStatus));
            const uploadResults = await Promise.all(uploadPromises);

            onUploadComplete(uploadResults);

            // Clear files after successful upload
            setTimeout(() => {
                setFiles([]);
            }, 2000);
        } catch (error) {
            console.error('Upload error:', error);
            // Update files to error status
            setFiles(prev =>
                prev.map(f => ({
                    ...f,
                    status: 'error' as const,
                    error: 'Upload failed. Please try again.'
                }))
            );
        } finally {
            setIsUploading(false);
        }
    };

    const openFileDialog = () => {
        if (!disabled) {
            fileInputRef.current?.click();
        }
    };

    const getFileIcon = () => {
        return <FileText className='h-5 w-5 text-muted-foreground' />;
    };

    const getStatusIcon = (status: FileWithStatus['status']) => {
        switch (status) {
            case 'completed':
                return <CheckCircle2 className='h-4 w-4 text-green-600' />;
            case 'error':
                return <AlertCircle className='h-4 w-4 text-red-600' />;
            default:
                return null;
        }
    };

    const canUpload = files.length > 0 && !isUploading && clientId && files.some(f => f.status === 'pending');

    return (
        <div className={cn('space-y-4', className)}>
            {/* Drop Zone */}
            <Card
                className={cn(
                    'border-2 border-dashed transition-colors duration-200 cursor-pointer',
                    isDragOver && !disabled && 'border-primary bg-primary/5',
                    disabled && 'opacity-50 cursor-not-allowed',
                    !disabled && 'hover:border-primary/50'
                )}
                onClick={openFileDialog}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <CardContent className='flex flex-col items-center justify-center py-8'>
                    <Upload
                        className={cn(
                            'h-10 w-10 mb-4',
                            isDragOver && !disabled ? 'text-primary' : 'text-muted-foreground'
                        )}
                    />
                    <div className='text-center space-y-2'>
                        <p className='text-lg font-medium'>
                            {isDragOver && !disabled ? 'Drop files here' : 'Upload Bank Statements'}
                        </p>
                        <p className='text-sm text-muted-foreground'>Drag and drop files or click to browse</p>
                        <p className='text-xs text-muted-foreground'>
                            Supports PDF, CSV, OFX files up to {maxSizePerFile}MB each (max {maxFiles} files)
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type='file'
                multiple
                accept={ACCEPTED_EXTENSIONS.join(',')}
                onChange={handleFileInputChange}
                className='hidden'
                disabled={disabled}
            />

            {/* File List */}
            {files.length > 0 && (
                <div className='space-y-2'>
                    <h4 className='font-medium'>Selected Files</h4>
                    {files.map(fileWithStatus => (
                        <Card key={fileWithStatus.id}>
                            <CardContent className='p-3'>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center space-x-3 flex-1'>
                                        {getFileIcon()}
                                        <div className='flex-1 min-w-0'>
                                            <p className='text-sm font-medium truncate'>{fileWithStatus.file.name}</p>
                                            <p className='text-xs text-muted-foreground'>
                                                {(fileWithStatus.file.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                    </div>

                                    <div className='flex items-center space-x-2'>
                                        {getStatusIcon(fileWithStatus.status)}

                                        {fileWithStatus.status === 'uploading' && (
                                            <div className='w-24'>
                                                <Progress
                                                    value={fileWithStatus.progress}
                                                    className='h-2'
                                                />
                                            </div>
                                        )}

                                        {(fileWithStatus.status === 'pending' || fileWithStatus.status === 'error') && (
                                            <Button
                                                variant='ghost'
                                                size='sm'
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    removeFile(fileWithStatus.id);
                                                }}
                                                disabled={isUploading}
                                            >
                                                <X className='h-4 w-4' />
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                {fileWithStatus.error && (
                                    <Alert className='mt-2'>
                                        <AlertCircle className='h-4 w-4' />
                                        <AlertDescription className='text-sm'>{fileWithStatus.error}</AlertDescription>
                                    </Alert>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Upload Actions */}
            {files.length > 0 && (
                <div className='flex justify-end space-x-2'>
                    <Button
                        variant='outline'
                        onClick={() => setFiles([])}
                        disabled={isUploading}
                    >
                        Clear All
                    </Button>
                    <Button
                        onClick={handleUpload}
                        disabled={!canUpload}
                        className='min-w-24'
                    >
                        {isUploading ? 'Uploading...' : `Upload ${files.length} File${files.length > 1 ? 's' : ''}`}
                    </Button>
                </div>
            )}

            {/* Client ID Warning */}
            {!clientId && files.length > 0 && (
                <Alert>
                    <AlertCircle className='h-4 w-4' />
                    <AlertDescription>Please select a client before uploading statements.</AlertDescription>
                </Alert>
            )}
        </div>
    );
};
