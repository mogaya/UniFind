import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/layouts/Layout';
import { router } from '@inertiajs/react';
import { Package, Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import ReportCard from './ReportCard';

const MyReports = () => {
    // Mock data for user's reports
    const [lostReports, setLostReports] = useState([
        {
            id: 'lost-1',
            name: 'AirPods Pro',
            category: 'Electronics',
            description: 'White AirPods Pro with charging case, lost near the library',
            lastSeenLocation: 'Library - 2nd Floor',
            dateLost: '2024-01-25',
            status: 'active',
            dateReported: '2024-01-25',
            contactInfo: 'john.doe@university.edu',
            imageUrl:
                'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=1289&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            id: 'lost-2',
            name: 'Blue Water Bottle',
            category: 'Personal Items',
            description: 'Stainless steel water bottle with university logo stickers',
            lastSeenLocation: 'Gym',
            dateLost: '2024-01-20',
            status: 'found',
            dateReported: '2024-01-20',
            contactInfo: 'john.doe@university.edu',
            imageUrl:
                'https://images.unsplash.com/photo-1724992609118-551ad0b79421?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
    ]);

    const [foundReports, setFoundReports] = useState([
        {
            id: 'found-1',
            name: 'iPhone 14 Pro',
            category: 'Electronics',
            description: 'Space Black iPhone 14 Pro with blue case, found near the charging station',
            location: 'Library - 2nd Floor',
            dateFound: '2024-01-25',
            status: 'claimed',
            dateReported: '2024-01-25',
            contactInfo: 'john.doe@university.edu',
            imageUrl:
                'https://images.unsplash.com/photo-1680687688158-e9165395ff00?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            id: 'found-2',
            name: 'Bag',
            category: 'Bags',
            description: 'Large bag with laptop compartment and water bottle holder',
            location: 'Student Union',
            dateFound: '2024-01-24',
            status: 'pending',
            dateReported: '2024-01-24',
            contactInfo: 'john.doe@university.edu',
            imageUrl:
                'https://images.unsplash.com/photo-1622560480654-d96214fdc887?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
    ]);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active':
                return (
                    <Badge variant="default" className="bg-primary text-white">
                        Active
                    </Badge>
                );
            case 'found':
                return (
                    <Badge variant="default" className="bg-cta text-white">
                        Found
                    </Badge>
                );
            case 'claimed':
                return (
                    <Badge variant="default" className="bg-cta text-white">
                        Claimed
                    </Badge>
                );
            case 'pending':
                return <Badge variant="secondary">Pending</Badge>;
            default:
                return <Badge variant="outline">Unknown</Badge>;
        }
    };

    const handleViewDetails = (id: string, type: string) => {
        // Navigate to item detail page
        router.get(`/item-details/${id}`);
    };

    const handleEdit = (id: string, type: string) => {
        // Navigate to edit page
        if (type === 'lost') {
            router.get(`/report-lost?edit=${id}`);
        } else {
            router.get(`/report-found?edit=${id}`);
        }
    };

    const handleDelete = (id: string, type: string) => {
        if (type === 'lost') {
            setLostReports((prev) => prev.filter((report) => report.id !== id));
        } else {
            setFoundReports((prev) => prev.filter((report) => report.id !== id));
        }

        toast('Report Deleted', {
            description: 'Your report has been successfully removed.',
            action: {
                label: 'Close',
                onClick: () => console.log('Closed'),
            },
        });
    };

    const handleMarkAsResolved = (id: string, type: string) => {
        if (type === 'lost') {
            setLostReports((prev) => prev.map((report) => (report.id === id ? { ...report, status: 'found' } : report)));
        } else {
            setFoundReports((prev) => prev.map((report) => (report.id === id ? { ...report, status: 'claimed' } : report)));
        }

        toast('Status Updated', {
            description: 'Report has been marked as resolved.',
            action: {
                label: 'Close',
                onClick: () => console.log('Closed'),
            },
        });
    };

    return (
        <Layout>
            <div className="min-h-80 bg-background">
                <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="mb-4 text-3xl font-bold text-foreground">My Reports</h1>
                        <p className="text-muted-foreground">View and manage all your lost and found item reports.</p>
                    </div>
                    {/* Tabs */}
                    <Tabs defaultValue="lost" className="mb-1 w-full">
                        <TabsList className="mb-6 grid w-full grid-cols-2">
                            <TabsTrigger value="lost" className="text-center">
                                Lost Items({lostReports.length})
                            </TabsTrigger>
                            <TabsTrigger value="found" className="text-center">
                                Found Items({foundReports.length})
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="lost" className="space-y-6">
                            {lostReports.length > 0 ? (
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {lostReports.map((report) => (
                                        <ReportCard
                                            key={report.id}
                                            report={report}
                                            type="lost"
                                            getStatusBadge={getStatusBadge}
                                            handleViewDetails={handleViewDetails}
                                            handleEdit={handleEdit}
                                            handleMarkAsResolved={handleMarkAsResolved}
                                            handleDelete={handleDelete}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <Card className="mx-auto min-h-80 max-w-80 border-border bg-card py-12 text-center">
                                    <CardContent>
                                        <Package className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                                        <p className="my-5 text-lg text-muted-foreground">You haven't reported any lost items yet</p>
                                        <Button onClick={() => router.get('/report-lost')} className="mt-5 bg-primary hover:bg-primary/90">
                                            <Plus className="mr-2 h-4 w-4" />
                                            Report Lost Item
                                        </Button>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>

                        <TabsContent value="found" className="space-y-6">
                            {foundReports.length > 0 ? (
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {foundReports.map((report) => (
                                        <ReportCard
                                            key={report.id}
                                            report={report}
                                            type="found"
                                            getStatusBadge={getStatusBadge}
                                            handleViewDetails={handleViewDetails}
                                            handleEdit={handleEdit}
                                            handleMarkAsResolved={handleMarkAsResolved}
                                            handleDelete={handleDelete}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <Card className="mx-auto min-h-80 max-w-80 border-border bg-card py-12 text-center">
                                    <CardContent>
                                        <Package className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                                        <p className="my-5 text-lg text-muted-foreground">You haven't reported any found items yet</p>
                                        <Button onClick={() => router.get('/report-lost')} className="mt-5 bg-primary hover:bg-primary/90">
                                            <Plus className="mr-2 h-4 w-4" />
                                            Report Found Item
                                        </Button>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </Layout>
    );
};

export default MyReports;
