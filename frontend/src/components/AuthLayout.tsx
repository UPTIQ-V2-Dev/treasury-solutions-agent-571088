import { Building2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    description: string;
}

export const AuthLayout = ({ children, title, description }: AuthLayoutProps) => {
    return (
        <div className='min-h-screen flex'>
            {/* Left side - Branding */}
            <div className='hidden lg:flex lg:flex-1 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground'>
                <div className='flex flex-col justify-center px-12 py-16 max-w-md'>
                    <div className='flex items-center gap-3 mb-8'>
                        <Building2 className='h-8 w-8' />
                        <span className='text-2xl font-bold'>Treasury Solutions</span>
                    </div>
                    <h1 className='text-4xl font-bold mb-4'>Optimize Your Treasury Operations</h1>
                    <p className='text-lg text-primary-foreground/80 mb-8'>
                        Unlock hidden value in your cash management with AI-powered analysis and personalized treasury
                        product recommendations.
                    </p>
                    <ul className='space-y-3'>
                        <li className='flex items-center gap-3'>
                            <div className='w-2 h-2 bg-primary-foreground rounded-full' />
                            <span>Automated statement analysis</span>
                        </li>
                        <li className='flex items-center gap-3'>
                            <div className='w-2 h-2 bg-primary-foreground rounded-full' />
                            <span>Intelligent product recommendations</span>
                        </li>
                        <li className='flex items-center gap-3'>
                            <div className='w-2 h-2 bg-primary-foreground rounded-full' />
                            <span>Comprehensive reporting</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Right side - Auth Form */}
            <div className='flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24'>
                <div className='mx-auto w-full max-w-sm'>
                    <div className='lg:hidden mb-8 text-center'>
                        <div className='flex items-center justify-center gap-3 mb-4'>
                            <Building2 className='h-8 w-8 text-primary' />
                            <span className='text-2xl font-bold'>Treasury Solutions</span>
                        </div>
                    </div>

                    <div className='text-center mb-8'>
                        <h2 className='text-3xl font-bold'>{title}</h2>
                        <p className='mt-2 text-muted-foreground'>{description}</p>
                    </div>

                    <Card className='p-6'>{children}</Card>

                    <div className='mt-8 text-center text-sm text-muted-foreground'>
                        <p>Secure • Compliant • Bank-grade encryption</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
