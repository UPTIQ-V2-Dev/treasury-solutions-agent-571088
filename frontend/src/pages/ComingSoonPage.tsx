import { Construction } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ComingSoonPageProps {
    title: string;
    description?: string;
}

export const ComingSoonPage = ({
    title,
    description = 'This feature is currently under development and will be available soon.'
}: ComingSoonPageProps) => {
    const navigate = useNavigate();

    return (
        <div className='container max-w-2xl mx-auto py-16 px-4'>
            <Card>
                <CardHeader className='text-center'>
                    <div className='mx-auto mb-4 p-3 bg-orange-100 rounded-full w-fit'>
                        <Construction className='h-8 w-8 text-orange-600' />
                    </div>
                    <CardTitle className='text-2xl'>{title}</CardTitle>
                    <CardDescription className='text-lg'>{description}</CardDescription>
                </CardHeader>
                <CardContent className='text-center'>
                    <p className='text-muted-foreground mb-6'>
                        We're working hard to bring you this feature. In the meantime, you can:
                    </p>
                    <div className='space-y-2 mb-6'>
                        <Button
                            variant='outline'
                            onClick={() => navigate('/upload')}
                            className='w-full'
                        >
                            Upload Bank Statements
                        </Button>
                        <Button
                            variant='outline'
                            onClick={() => navigate('/')}
                            className='w-full'
                        >
                            Return to Dashboard
                        </Button>
                    </div>
                    <p className='text-sm text-muted-foreground'>
                        Have questions? Contact our support team for assistance.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};
