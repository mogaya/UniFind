import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import CustomSection from '@/layouts/custom-section';
import Layout from '@/layouts/Layout';
import { SharedData } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { AlertTriangle, ArrowLeft, Calendar, Edit, Mails, MapPin, MessageCircle, Phone, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { handleDelete, handleMarkAsResolved } from '../my-reports';

type ItemProps = {
    id: number;
    user_id: number;
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
    const { auth } = usePage<SharedData>().props;

    const handleFoundItem = () => {
        toast.success('Thank you', {
            description: 'Kindly notify the Owner. That you may have found their Item',
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
                            {auth.user.id === item.user_id ? (
                                <div className="flex flex-wrap gap-2">
                                    <Button
                                        variant="default"
                                        size="lg"
                                        className="flex-1"
                                        onClick={() => {
                                            router.get(`/lost-items/${item.id}/edit`);
                                        }}
                                    >
                                        <Edit className="mr-1 h-4 w-4" />
                                        Edit
                                    </Button>

                                    <Button
                                        variant="outline"
                                        size="lg"
                                        onClick={() => {
                                            handleMarkAsResolved(String(item.id), 'lost');
                                        }}
                                        className={`flex-1 rounded px-4 py-2 text-white ${item.status === 'pending' ? 'bg-green-600' : 'bg-red-400'}`}
                                    >
                                        {item.status === 'pending' ? 'Mark as Resolved' : 'Mark as Pending'}
                                    </Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="outline" size="lg" className="text-danger hover:text-danger">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Delete Report</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Are you sure you want to delete this report? This action cannot be undone.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() => handleDelete(item.id, 'lost')}
                                                    className="bg-danger hover:bg-danger/90"
                                                >
                                                    Delete
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-4">
                                    <Button variant="default" size="lg" onClick={handleFoundItem} className="w-full">
                                        I Found This
                                    </Button>

                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" size="lg" className="w-full">
                                                <MessageCircle className="mr-2 h-4 w-4" />
                                                Contact Owner
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-md">
                                            <DialogHeader>
                                                <DialogTitle>Select Channel to contact {item.user_name}</DialogTitle>
                                                <DialogDescription>You will be redirected to {item.user_name}'s accounts</DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter className="mt-5">
                                                <Button
                                                    variant="outline"
                                                    onClick={() => {
                                                        const phone = item.contact_info;
                                                        const message = encodeURIComponent(
                                                            `I am contacting you from Unifind in regards to an Item you found with the following details: \n\nItem Name: ${item.item_name}\nCategory: ${item.category_name}\nDescription: ${item.description}\n\nSee the image here: ${item.photo_url}`,
                                                        );
                                                        window.open(`https://wa.me/+254${phone}?text=${message}`, '_blank');
                                                    }}
                                                >
                                                    <MessageCircle className="mr-2 h-4 w-4" />
                                                    WhatsApp
                                                </Button>

                                                <Button variant="outline" onClick={() => window.open(`mailto:${item.user_email}`, '_blank')}>
                                                    <Mails className="mr-2 h-4 w-4" />
                                                    Email
                                                </Button>
                                                <DialogClose asChild>
                                                    <Button variant="outline">Cancel</Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            )}
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
                                    <CardTitle className="text-foreground">Last Seen</CardTitle>
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

                            <Card>
                                <CardHeader>
                                    <CardTitle>Lost By</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-foreground">{item.user_name}</span>

                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" size="sm">
                                                    <Phone className="mr-2 h-4 w-4" />
                                                    Contact Owner
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-md">
                                                <DialogHeader>
                                                    <DialogTitle>Select Channel to contact {item.user_name}</DialogTitle>
                                                    <DialogDescription>You will be redirected to {item.user_name}'s accounts</DialogDescription>
                                                </DialogHeader>
                                                <DialogFooter className="mt-5">
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => {
                                                            const phone = item.contact_info;
                                                            const message = encodeURIComponent(
                                                                `I am contacting you from Unifind in regards to an Item you found with the following details: \n\nItem Name: ${item.item_name}\nCategory: ${item.category_name}\nDescription: ${item.description}\n\nSee the image here: ${item.photo_url}`,
                                                            );
                                                            window.open(`https://wa.me/+254${phone}?text=${message}`, '_blank');
                                                        }}
                                                    >
                                                        <MessageCircle className="mr-2 h-4 w-4" />
                                                        WhatsApp
                                                    </Button>
                                                    <Button variant="outline" onClick={() => window.open(`mailto:${item.user_email}`, '_blank')}>
                                                        <Mails className="mr-2 h-4 w-4" />
                                                        Email
                                                    </Button>
                                                    <DialogClose asChild>
                                                        <Button variant="outline">Cancel</Button>
                                                    </DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Warning */}
                            <Card className="border-teal/20 bg-teal/5">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3">
                                        <AlertTriangle className="h-5 w-5 text-teal" />
                                        <h4 className="font-medium text-teal">Found This Item?</h4>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-start space-x-3">
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                If you've found this item, please contact the owner or click "I Found This!" to help reunite them with
                                                their belongings.
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
