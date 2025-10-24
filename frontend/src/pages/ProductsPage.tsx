import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Package, DollarSign, TrendingUp, Shield, Filter, Search, Eye, CheckCircle2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { treasuryService } from '@/services/treasury';
import type { TreasuryProduct } from '@/types/treasury';

export const ProductsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [selectedProduct, setSelectedProduct] = useState<TreasuryProduct | null>(null);
    const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

    const {
        data: products = [],
        isLoading,
        error
    } = useQuery({
        queryKey: ['treasury-products'],
        queryFn: treasuryService.getTreasuryProducts
    });

    const formatCurrency = (amount: number | undefined) => {
        if (!amount) return 'N/A';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const getCategoryIcon = (category: TreasuryProduct['category']) => {
        switch (category) {
            case 'sweep':
                return <TrendingUp className='h-5 w-5 text-blue-600' />;
            case 'zba':
                return <Shield className='h-5 w-5 text-green-600' />;
            case 'merchant':
                return <DollarSign className='h-5 w-5 text-purple-600' />;
            case 'lockbox':
                return <Package className='h-5 w-5 text-orange-600' />;
            case 'rdc':
                return <Package className='h-5 w-5 text-red-600' />;
            case 'disbursement':
                return <TrendingUp className='h-5 w-5 text-indigo-600' />;
            default:
                return <Package className='h-5 w-5 text-gray-600' />;
        }
    };

    const getCategoryColor = (category: TreasuryProduct['category']) => {
        switch (category) {
            case 'sweep':
                return 'bg-blue-100 text-blue-800';
            case 'zba':
                return 'bg-green-100 text-green-800';
            case 'merchant':
                return 'bg-purple-100 text-purple-800';
            case 'lockbox':
                return 'bg-orange-100 text-orange-800';
            case 'rdc':
                return 'bg-red-100 text-red-800';
            case 'disbursement':
                return 'bg-indigo-100 text-indigo-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const categories = Array.from(new Set(products.map(p => p.category)));

    const filteredProducts = products.filter(product => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const handleViewDetails = (product: TreasuryProduct) => {
        setSelectedProduct(product);
        setIsDetailsDialogOpen(true);
    };

    if (error) {
        return (
            <div className='container max-w-4xl mx-auto py-8 px-4'>
                <Alert>
                    <AlertDescription>
                        Failed to load treasury products. Please try refreshing the page.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className='container max-w-7xl mx-auto py-8 px-4 space-y-6'>
            {/* Header */}
            <div className='text-center space-y-2'>
                <h1 className='text-3xl font-bold'>Treasury Product Catalog</h1>
                <p className='text-lg text-muted-foreground'>
                    Discover our comprehensive suite of treasury management solutions
                </p>
            </div>

            {/* Filters */}
            <Card>
                <CardHeader>
                    <CardTitle className='text-lg'>Find the Right Solution</CardTitle>
                    <CardDescription>Filter products by category or search for specific features</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <div className='flex flex-col md:flex-row gap-4'>
                        <div className='flex-1'>
                            <div className='relative'>
                                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
                                <Input
                                    placeholder='Search products and features...'
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    className='pl-9'
                                />
                            </div>
                        </div>
                        <Select
                            value={categoryFilter}
                            onValueChange={setCategoryFilter}
                        >
                            <SelectTrigger className='w-full md:w-48'>
                                <Filter className='h-4 w-4 mr-2' />
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='all'>All Categories</SelectItem>
                                {categories.map(category => (
                                    <SelectItem
                                        key={category}
                                        value={category}
                                    >
                                        {category.toUpperCase()}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Product Stats */}
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                <Card>
                    <CardContent className='p-4 text-center'>
                        <div className='text-2xl font-bold'>{products.length}</div>
                        <div className='text-sm text-muted-foreground'>Total Products</div>
                    </CardContent>
                </Card>
                {categories.slice(0, 3).map(category => (
                    <Card key={category}>
                        <CardContent className='p-4 text-center'>
                            <div className='text-2xl font-bold'>
                                {products.filter(p => p.category === category).length}
                            </div>
                            <div className='text-sm text-muted-foreground capitalize'>{category} Solutions</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Products Grid */}
            <div className='grid gap-6'>
                {isLoading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <Card key={i}>
                            <CardContent className='p-6'>
                                <div className='flex items-start gap-4'>
                                    <Skeleton className='h-12 w-12 rounded' />
                                    <div className='flex-1 space-y-2'>
                                        <Skeleton className='h-6 w-48' />
                                        <Skeleton className='h-4 w-full' />
                                        <Skeleton className='h-4 w-3/4' />
                                        <div className='flex gap-2'>
                                            <Skeleton className='h-6 w-20' />
                                            <Skeleton className='h-6 w-16' />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : filteredProducts.length === 0 ? (
                    <Card>
                        <CardContent className='p-12 text-center'>
                            <div className='text-muted-foreground'>
                                {searchTerm || categoryFilter !== 'all'
                                    ? 'No products match your search criteria.'
                                    : 'No treasury products available.'}
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    filteredProducts.map(product => (
                        <Card
                            key={product.id}
                            className='hover:shadow-lg transition-shadow'
                        >
                            <CardContent className='p-6'>
                                <div className='flex items-start gap-4'>
                                    <div className='p-3 rounded-lg bg-muted'>{getCategoryIcon(product.category)}</div>
                                    <div className='flex-1 space-y-4'>
                                        <div className='flex items-start justify-between'>
                                            <div className='space-y-2'>
                                                <div className='flex items-center gap-3'>
                                                    <h3 className='text-xl font-semibold'>{product.name}</h3>
                                                    <Badge className={getCategoryColor(product.category)}>
                                                        {product.category.toUpperCase()}
                                                    </Badge>
                                                </div>
                                                <p className='text-muted-foreground'>{product.description}</p>
                                            </div>
                                            <Button
                                                variant='outline'
                                                onClick={() => handleViewDetails(product)}
                                                className='gap-2'
                                            >
                                                <Eye className='h-4 w-4' />
                                                View Details
                                            </Button>
                                        </div>

                                        {/* Key Features */}
                                        <div>
                                            <h4 className='font-medium mb-2'>Key Features</h4>
                                            <div className='flex flex-wrap gap-2'>
                                                {product.features.slice(0, 4).map((feature, index) => (
                                                    <Badge
                                                        key={index}
                                                        variant='outline'
                                                        className='text-xs'
                                                    >
                                                        <CheckCircle2 className='h-3 w-3 mr-1' />
                                                        {feature}
                                                    </Badge>
                                                ))}
                                                {product.features.length > 4 && (
                                                    <Badge
                                                        variant='outline'
                                                        className='text-xs'
                                                    >
                                                        +{product.features.length - 4} more
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>

                                        {/* Benefits & Pricing */}
                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                            <div>
                                                <h4 className='font-medium mb-2'>Benefits</h4>
                                                <div className='space-y-1 text-sm'>
                                                    {product.benefits.yieldImprovement && (
                                                        <div className='flex items-center gap-2 text-green-600'>
                                                            <TrendingUp className='h-3 w-3' />
                                                            Yield improvement:{' '}
                                                            {(product.benefits.yieldImprovement * 100).toFixed(2)}%
                                                        </div>
                                                    )}
                                                    {product.benefits.costReduction && (
                                                        <div className='flex items-center gap-2 text-blue-600'>
                                                            <DollarSign className='h-3 w-3' />
                                                            Cost reduction:{' '}
                                                            {(product.benefits.costReduction * 100).toFixed(2)}%
                                                        </div>
                                                    )}
                                                    {product.benefits.efficiencyGain && (
                                                        <div className='text-muted-foreground'>
                                                            {product.benefits.efficiencyGain}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className='font-medium mb-2'>Pricing</h4>
                                                <div className='space-y-1 text-sm'>
                                                    {product.pricing.setupFee && (
                                                        <div>Setup fee: {formatCurrency(product.pricing.setupFee)}</div>
                                                    )}
                                                    {product.pricing.monthlyFee && (
                                                        <div>
                                                            Monthly fee: {formatCurrency(product.pricing.monthlyFee)}
                                                        </div>
                                                    )}
                                                    {product.pricing.transactionFee && (
                                                        <div>
                                                            Per transaction:{' '}
                                                            {formatCurrency(product.pricing.transactionFee)}
                                                        </div>
                                                    )}
                                                    {product.pricing.basisPoints && (
                                                        <div>Rate: {product.pricing.basisPoints} basis points</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Eligibility */}
                                        <div>
                                            <h4 className='font-medium mb-2'>Eligibility Requirements</h4>
                                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
                                                {product.eligibilityRules.minBalance && (
                                                    <div className='flex items-center gap-2'>
                                                        <Info className='h-3 w-3 text-muted-foreground' />
                                                        Min balance:{' '}
                                                        {formatCurrency(product.eligibilityRules.minBalance)}
                                                    </div>
                                                )}
                                                {product.eligibilityRules.minTransactionVolume && (
                                                    <div className='flex items-center gap-2'>
                                                        <Info className='h-3 w-3 text-muted-foreground' />
                                                        Min transaction volume:{' '}
                                                        {formatCurrency(product.eligibilityRules.minTransactionVolume)}
                                                    </div>
                                                )}
                                                <div className='flex items-center gap-2'>
                                                    <Info className='h-3 w-3 text-muted-foreground' />
                                                    Account types: {product.eligibilityRules.accountTypes.join(', ')}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            {/* Product Details Modal */}
            <Dialog
                open={isDetailsDialogOpen}
                onOpenChange={setIsDetailsDialogOpen}
            >
                <DialogContent className='max-w-4xl max-h-[80vh] overflow-y-auto'>
                    <DialogHeader>
                        <div className='flex items-center gap-3'>
                            <div className='p-2 rounded-lg bg-muted'>
                                {selectedProduct && getCategoryIcon(selectedProduct.category)}
                            </div>
                            <div>
                                <DialogTitle className='text-xl'>{selectedProduct?.name}</DialogTitle>
                                <DialogDescription className='text-base'>
                                    {selectedProduct?.description}
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    {selectedProduct && (
                        <div className='space-y-6'>
                            <Separator />

                            {/* Complete Features List */}
                            <div>
                                <h4 className='font-semibold text-lg mb-3'>Complete Feature Set</h4>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                                    {selectedProduct.features.map((feature, index) => (
                                        <div
                                            key={index}
                                            className='flex items-center gap-2 text-sm'
                                        >
                                            <CheckCircle2 className='h-4 w-4 text-green-600' />
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Separator />

                            {/* Detailed Benefits */}
                            <div>
                                <h4 className='font-semibold text-lg mb-3'>Benefits Analysis</h4>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                    <div className='space-y-4'>
                                        <h5 className='font-medium'>Financial Benefits</h5>
                                        {selectedProduct.benefits.yieldImprovement && (
                                            <div className='p-3 bg-green-50 rounded-lg'>
                                                <div className='text-lg font-semibold text-green-600'>
                                                    {(selectedProduct.benefits.yieldImprovement * 100).toFixed(2)}%
                                                </div>
                                                <div className='text-sm text-green-700'>Yield Improvement</div>
                                            </div>
                                        )}
                                        {selectedProduct.benefits.costReduction && (
                                            <div className='p-3 bg-blue-50 rounded-lg'>
                                                <div className='text-lg font-semibold text-blue-600'>
                                                    {(selectedProduct.benefits.costReduction * 100).toFixed(2)}%
                                                </div>
                                                <div className='text-sm text-blue-700'>Cost Reduction</div>
                                            </div>
                                        )}
                                    </div>

                                    <div className='space-y-4'>
                                        <h5 className='font-medium'>Operational Benefits</h5>
                                        {selectedProduct.benefits.efficiencyGain && (
                                            <div className='p-3 bg-purple-50 rounded-lg'>
                                                <div className='text-sm text-purple-700'>
                                                    {selectedProduct.benefits.efficiencyGain}
                                                </div>
                                            </div>
                                        )}
                                        {selectedProduct.benefits.riskReduction && (
                                            <div className='p-3 bg-orange-50 rounded-lg'>
                                                <div className='text-sm text-orange-700'>
                                                    {selectedProduct.benefits.riskReduction}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Detailed Pricing */}
                            <div>
                                <h4 className='font-semibold text-lg mb-3'>Pricing Structure</h4>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    {Object.entries(selectedProduct.pricing).map(([key, value]) => {
                                        if (!value) return null;
                                        return (
                                            <div
                                                key={key}
                                                className='p-3 bg-muted rounded-lg'
                                            >
                                                <div className='text-sm text-muted-foreground capitalize'>
                                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                                </div>
                                                <div className='font-semibold'>
                                                    {typeof value === 'number' && key !== 'basisPoints'
                                                        ? formatCurrency(value)
                                                        : key === 'basisPoints'
                                                          ? `${value} basis points`
                                                          : value}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <Separator />

                            {/* Detailed Eligibility */}
                            <div>
                                <h4 className='font-semibold text-lg mb-3'>Eligibility Requirements</h4>
                                <div className='space-y-3'>
                                    {selectedProduct.eligibilityRules.minBalance && (
                                        <div className='flex items-center justify-between p-3 bg-muted rounded-lg'>
                                            <span className='text-sm'>Minimum Account Balance</span>
                                            <span className='font-semibold'>
                                                {formatCurrency(selectedProduct.eligibilityRules.minBalance)}
                                            </span>
                                        </div>
                                    )}
                                    {selectedProduct.eligibilityRules.minTransactionVolume && (
                                        <div className='flex items-center justify-between p-3 bg-muted rounded-lg'>
                                            <span className='text-sm'>Minimum Monthly Transaction Volume</span>
                                            <span className='font-semibold'>
                                                {formatCurrency(selectedProduct.eligibilityRules.minTransactionVolume)}
                                            </span>
                                        </div>
                                    )}
                                    <div className='p-3 bg-muted rounded-lg'>
                                        <div className='text-sm mb-2'>Eligible Account Types</div>
                                        <div className='flex flex-wrap gap-2'>
                                            {selectedProduct.eligibilityRules.accountTypes.map((type, index) => (
                                                <Badge
                                                    key={index}
                                                    variant='outline'
                                                >
                                                    {type}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                    {selectedProduct.eligibilityRules.businessTypes &&
                                        selectedProduct.eligibilityRules.businessTypes.length > 0 && (
                                            <div className='p-3 bg-muted rounded-lg'>
                                                <div className='text-sm mb-2'>Eligible Business Types</div>
                                                <div className='flex flex-wrap gap-2'>
                                                    {selectedProduct.eligibilityRules.businessTypes.map(
                                                        (type, index) => (
                                                            <Badge
                                                                key={index}
                                                                variant='outline'
                                                            >
                                                                {type}
                                                            </Badge>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button
                            variant='outline'
                            onClick={() => setIsDetailsDialogOpen(false)}
                        >
                            Close
                        </Button>
                        <Button>Contact Treasury Team</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};
