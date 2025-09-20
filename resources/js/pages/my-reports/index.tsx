import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/layouts/Layout';
import { router, usePage } from '@inertiajs/react';
import { Package, Plus } from 'lucide-react';
import { toast } from 'sonner';
import ReportCard from './components/ReportCard';

type Report = {
    id: number;
    item_name: string;
    category_name: string;
    description: string;
    last_seen_location?: string; // for lost
    where_found?: string; // for found
    date_lost?: string;
    date_found?: string;
    status: string;
    created_at: string;
    contact_info: string;
    photo_url: string;
};

type PageProps = {
    lostReports: Report[];
    foundReports: Report[];
};

const Index = () => {
    const { lostReports, foundReports } = usePage<PageProps>().props;

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
                    <Badge variant="secondary" className="bg-green-500 text-white dark:bg-blue-600">
                        Claimed
                    </Badge>
                );
            case 'unclaimed':
                return <Badge variant="destructive">UnClaimed</Badge>;
            case 'pending':
                return <Badge variant="destructive">Pending</Badge>;
            default:
                return <Badge variant="outline">Unknown</Badge>;
        }
    };

    const handleViewDetails = (id: string, type: string) => {
        // Navigate to item detail page
        if (type == 'lost') {
            router.get(`/lost-items/${id}`);
        } else {
            router.get(`found-items/${id}`);
        }
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
        // if (type === 'lost') {
        //     setLostReports((prev) => prev.filter((report) => report.id !== id));
        // } else {
        //     setFoundReports((prev) => prev.filter((report) => report.id !== id));
        // }

        toast('Report Deleted', {
            description: 'Your report has been successfully removed.',
            action: {
                label: 'Close',
                onClick: () => console.log('Closed'),
            },
        });
    };

    const handleMarkAsResolved = (id: string, type: string) => {
        // if (type === 'lost') {
        //     setLostReports((prev) => prev.map((report) => (report.id === id ? { ...report, status: 'found' } : report)));
        // } else {
        //     setFoundReports((prev) => prev.map((report) => (report.id === id ? { ...report, status: 'claimed' } : report)));
        // }

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

export default Index;
