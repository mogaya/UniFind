import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CustomSection from '@/layouts/custom-section';
import Layout from '@/layouts/Layout';
import { router, usePage } from '@inertiajs/react';
import { AlertTriangle, ArrowLeft, Calendar, MapPin, MessageCircle, Phone } from 'lucide-react';
import { toast } from 'sonner';

type ItemProps = {
    id: number;
    item_name: string;
    description: string;
    last_seen_location: string;
    date_lost: string;
    contact_info: string;
    photo_url: string;
    status: string;
    category_name: string;
    user_name: string;
    user_email: string;
};

const Show = () => {
    const { item } = usePage<{ item: ItemProps }>().props;

    const handleClaimItem = () => {
        toast('Claim Request Submitted', {
            description: "We've notified the finder. They will contact you to verify ownership.",
            action: {
                label: 'Undo',
                onClick: () => console.log('Undo'),
            },
        });
    };

    const handleContactFinder = () => {
        const contact = item.contact_info || item.user_email;
        toast('Contact Information', {
            description: `You can reach ${item.user_name} at: ${contact}`,
            action: {
                label: 'Undo',
                onClick: () => console.log('Undo'),
            },
        });
    };

    const goBack = () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            router.visit('/');
        }
    };

    if (!item) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="text-center">
                    <h2 className="mb-4 text-2xl font-bold text-foreground">Item Not Found</h2>
                    <Button onClick={() => router.get('/found-items')}>Back to Found Items</Button>
                </div>
            </div>
        );
    }

    return (
        <Layout>
            <div className="min-h-screen bg-background">
                <CustomSection>
                    {/* Header */}
                    <div className="mb-8 flex items-center">
                        <Button variant={'ghost'} onClick={goBack} className="mr-4">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">{item.item_name}</h1>
                            <div className="mt-2 flex items-center gap-2">
                                <Badge variant={'secondary'}>{item.category_name}</Badge>
                                <Badge variant={item.status === 'Available' ? 'default' : 'secondary'}>{item.status}</Badge>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                        {/* Item Image */}
                        <div className="space-y-4">
                            <Card className="overflow-hidden border-border bg-card p-0">
                                <div className="aspect-square bg-muted">
                                    {item.photo_url ? (
                                        <img src={item.photo_url} alt={item.item_name} className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-muted-foreground">
                                            <span>No image available</span>
                                        </div>
                                    )}
                                </div>
                            </Card>

                            {/* Quick Actions */}
                            <div className="grid grid-cols-2 gap-4">
                                <Button variant="default" size="lg" onClick={handleClaimItem} className="w-full">
                                    Claim This Item
                                </Button>
                                <Button variant="outline" size="lg" onClick={handleContactFinder} className="w-full">
                                    <MessageCircle className="mr-2 h-4 w-4" />
                                    Contact Finder
                                </Button>
                            </div>
                        </div>

                        {/* Item Details */}
                        <div className="space-y-6">
                            {/* Desc */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-foreground">Description</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="leading-relaxed text-foreground">{item.description}</p>
                                </CardContent>
                            </Card>

                            {/* Location & Time */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-foreground">Found Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-center text-muted-foreground">
                                        <MapPin className="mr-3 h-5 w-5" />
                                        <span>{item.last_seen_location}</span>
                                    </div>
                                    <div className="flex items-center text-muted-foreground">
                                        <Calendar className="mr-3 h-5 w-5" />
                                        <span>{item.date_lost}</span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Additional Notes */}
                            {/* {item.additionalNotes && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-foreground">Additional Notes</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-foreground">{item.additionalNotes}</p>
                                    </CardContent>
                                </Card>
                            )} */}

                            {/* Finder Info */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Found By</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-foreground">{item.user_name}</span>
                                        <Button variant="outline" size="sm" onClick={handleContactFinder}>
                                            <Phone className="mr-2 h-4 w-4" />
                                            Contact
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Warning */}
                            <Card className="border-destructive/20 bg-destructive/5">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3">
                                        <AlertTriangle className="h-5 w-5 text-destructive" />
                                        <h4 className="font-medium text-destructive">Verification Required</h4>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-start space-x-3">
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                To claim this item, you'll need to provide proof of ownership to the finder. This may include
                                                describing unique features, providing purchase receipts, or other verification methods.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </CustomSection>
            </div>
        </Layout>
    );
};

export default Show;
