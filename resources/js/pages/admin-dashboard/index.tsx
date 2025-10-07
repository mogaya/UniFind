import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CustomSection from '@/layouts/custom-section';
import Layout from '@/layouts/Layout';
import { usePage } from '@inertiajs/react';
import { BarChart3, CheckCircle, Eye, Package, PackageSearch, PackageX, Search, SquarePen, UserRoundPen, UserRoundX, Users } from 'lucide-react';
import { handleDelete } from '../my-reports';

type PageProps = {
    lostItemsCount: number;
    foundItemsCount: number;
    resolvedCount: number;
    claimedCount: number;
    users: {
        id: number;
        name: string;
        email: string;
        role: number;
        found: number;
        lost: number;
        created_at: string;
    }[];
    lostItems: {
        id: number;
        item_name: string;
        category: string;
        last_seen_location: string;
        user_email: string;
        user_name: string;
        date: string;
        time: string;
        status: string;
    }[];
    foundItems: {
        id: number;
        item_name: string;
        category: string;
        where_found: string;
        user_email: string;
        user_name: string;
        date: string;
        time: string;
        status: string;
    }[];
};

const index = () => {
    const { lostItemsCount, foundItemsCount, users, lostItems, foundItems, claimedCount, resolvedCount } = usePage<PageProps>().props;
    // const [dashboardData] = useState({
    //     activeLostItems: 32,
    //     claimedItems: 21,
    //     pendingItems: 17,
    // });

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'unclaimed':
                return <Badge variant={'destructive'}>Unclaimed</Badge>;
            case 'claimed':
                return (
                    <Badge variant={'default'} className="bg-cta">
                        claimed
                    </Badge>
                );
            case 'pending':
                return <Badge variant={'destructive'}>Pending</Badge>;
            case 'resolved':
                return (
                    <Badge variant={'default'} className="bg-cta">
                        Resolved
                    </Badge>
                );
            default:
                return <Badge variant={'outline'}>Unknown</Badge>;
        }
    };

    const getTypeColor = (type: string) => {
        return type === 'lost' ? 'text-destructive' : 'text-cta';
    };

    return (
        <Layout>
            <div className="min-h-screen bg-background">
                <CustomSection>
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="mb-4 text-3xl font-bold text-foreground">Admin Dashboard</h1>
                        <p className="text-muted-foreground">Comprehensive overview of all lost and found items by the Daystar community.</p>
                    </div>

                    {/* Key Metrics */}
                    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {/* Lost Items */}
                        <Card className="border-border bg-card">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Total Lost Items</CardTitle>
                                <Search className="h-4 w-4 text-destructive" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-foreground">{lostItemsCount}</div>
                                <p className="text-xs text-muted-foreground">
                                    <span className="text-destructive">{lostItemsCount - resolvedCount} active</span>
                                </p>
                            </CardContent>
                        </Card>
                        {/* Found Items */}
                        <Card className="border-border bg-card">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Total Found Items</CardTitle>
                                <Package className="h-4 w-4 text-cta" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-foreground">{foundItemsCount}</div>
                                <p className="text-xs text-muted-foreground">
                                    <span className="text-cta">{foundItemsCount - claimedCount} active</span>
                                </p>
                            </CardContent>
                        </Card>
                        {/* Successfully Claimed */}
                        <Card className="border-border bg-card">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Successfully Claimed & Resolved</CardTitle>
                                <CheckCircle className="h-4 w-4 text-cta" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-foreground">{resolvedCount + claimedCount}</div>
                                <p className="text-xs text-muted-foreground">Solved by Unifind</p>
                            </CardContent>
                        </Card>
                        {/* Success Rate */}
                        <Card className="border-border bg-card">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Success Rate</CardTitle>
                                <BarChart3 className="h-4 w-4 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-foreground">
                                    {lostItemsCount > 0 ? Math.round(((claimedCount + resolvedCount) / (lostItemsCount + foundItemsCount)) * 100) : 0}
                                    %
                                </div>
                                <p className="text-xs text-muted-foreground">Items Reunited with owners</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Content Tabs */}
                    <Tabs defaultValue="users" className="w-full">
                        <TabsList className="mb-6 grid w-full grid-cols-3">
                            <TabsTrigger value="users">Users</TabsTrigger>
                            <TabsTrigger value="found-items">Found Items</TabsTrigger>
                            <TabsTrigger value="lost-items">Lost Items</TabsTrigger>
                        </TabsList>

                        {/* Users Tab */}
                        <TabsContent value="users" className="border-border bg-card">
                            <Card className="border-border bg-card">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Users className="h-5 w-5" />
                                        All Users
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Name</TableHead>
                                                <TableHead>Email</TableHead>
                                                <TableHead>Join Date</TableHead>
                                                <TableHead>Items Found</TableHead>
                                                <TableHead>Items Lost</TableHead>
                                                <TableHead>Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {users.map((user) => (
                                                <TableRow key={user.id}>
                                                    <TableCell className="font-medium">{user.name}</TableCell>
                                                    <TableCell className="text-sm">{user.email}</TableCell>
                                                    <TableCell className="text-sm">{user.created_at}</TableCell>
                                                    <TableCell className="text-sm">{user.found}</TableCell>
                                                    <TableCell className="text-sm">{user.lost}</TableCell>
                                                    <TableCell>
                                                        <Button variant={'default'} size={'icon'} className="mr-2 size-8">
                                                            <UserRoundPen />
                                                        </Button>
                                                        <Button variant={'destructive'} size={'icon'} className="size-8">
                                                            <UserRoundX />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Found Items Tab */}
                        <TabsContent value="found-items" className="space-y-6">
                            <Card className="border-border bg-card">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Package className="h-5 w-5" />
                                        Found Items
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Item Name</TableHead>
                                                <TableHead>Category</TableHead>
                                                <TableHead>Where Found</TableHead>
                                                <TableHead>Found By</TableHead>
                                                <TableHead>Date & Time</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {foundItems.map((item) => (
                                                <TableRow key={item.id}>
                                                    <TableCell className="font-medium">{item.item_name}</TableCell>
                                                    <TableCell>{item.category}</TableCell>
                                                    <TableCell className="text-sm">{item.where_found}</TableCell>
                                                    <TableCell className="text-sm">{item.user_name}</TableCell>
                                                    <TableCell className="text-sm">
                                                        {item.date} at {item.time}
                                                    </TableCell>
                                                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                                                    <TableCell>
                                                        <Button variant={'default'} size={'icon'} className="mr-2 size-8 bg-blue-500">
                                                            <Eye />
                                                        </Button>
                                                        <Button variant={'default'} size={'icon'} className="mr-2 size-8">
                                                            <SquarePen />
                                                        </Button>
                                                        <Button
                                                            variant={'destructive'}
                                                            size={'icon'}
                                                            onClick={() => {
                                                                handleDelete(item.id, 'found');
                                                            }}
                                                            className="mr-2 size-8"
                                                        >
                                                            <PackageX />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Lost Items Tab */}
                        <TabsContent value="lost-items" className="space-y-6">
                            <Card className="border-border bg-card">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <PackageSearch className="h-5 w-5" />
                                        Lost Items
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Item Name</TableHead>
                                                <TableHead>Category</TableHead>
                                                <TableHead>Last Seen Location</TableHead>
                                                <TableHead>Lost By</TableHead>
                                                <TableHead>Date & Time</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {lostItems.map((item) => (
                                                <TableRow key={item.id}>
                                                    <TableCell className="font-medium">{item.item_name}</TableCell>
                                                    <TableCell>{item.category}</TableCell>
                                                    <TableCell className="text-sm">{item.last_seen_location}</TableCell>
                                                    <TableCell className="text-sm">{item.user_name}</TableCell>
                                                    <TableCell className="text-sm">
                                                        {item.date} at {item.time}
                                                    </TableCell>
                                                    <TableCell className="text-sm">{getStatusBadge(item.status)}</TableCell>
                                                    <TableCell>
                                                        <Button variant={'default'} size={'icon'} className="mr-2 size-8 bg-blue-500">
                                                            <Eye />
                                                        </Button>
                                                        <Button variant={'default'} size={'icon'} className="mr-2 size-8">
                                                            <SquarePen />
                                                        </Button>
                                                        <Button
                                                            variant={'destructive'}
                                                            size={'icon'}
                                                            className="mr-2 size-8"
                                                            onClick={() => {
                                                                handleDelete(item.id, 'lost');
                                                            }}
                                                        >
                                                            <PackageX />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </CustomSection>
            </div>
        </Layout>
    );
};

export default index;
