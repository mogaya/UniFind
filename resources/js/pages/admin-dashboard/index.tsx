import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CustomSection from '@/layouts/custom-section';
import Layout from '@/layouts/Layout';
import { BarChart3, CheckCircle, Eye, Package, PackageSearch, PackageX, Search, SquarePen, UserRoundPen, UserRoundX, Users } from 'lucide-react';
import { useState } from 'react';

const index = () => {
    const [dashboardData] = useState({
        // Summary statistics
        totalLostItems: 45,
        totalFoundItems: 38,
        activeLostItems: 32,
        claimedItems: 21,
        pendingItems: 17,

        // Users list
        users: [
            {
                id: 'u1',
                name: 'Sarah Wilson',
                email: 'sarah.wilson@university.edu',
                role: 'Student',
                joinDate: '2023-09-15',
                reportsSubmitted: 3,
                itemsClaimed: 1,
                status: 'active',
            },
            {
                id: 'u2',
                name: 'Mike Chen',
                email: 'mike.chen@university.edu',
                role: 'Faculty',
                joinDate: '2022-08-20',
                reportsSubmitted: 8,
                itemsClaimed: 2,
                status: 'active',
            },
            {
                id: 'u3',
                name: 'Alex Johnson',
                email: 'alex.johnson@university.edu',
                role: 'Student',
                joinDate: '2024-01-10',
                reportsSubmitted: 2,
                itemsClaimed: 0,
                status: 'active',
            },
            {
                id: 'u4',
                name: 'Emma Davis',
                email: 'emma.davis@university.edu',
                role: 'Staff',
                joinDate: '2021-03-05',
                reportsSubmitted: 12,
                itemsClaimed: 4,
                status: 'active',
            },
            {
                id: 'u5',
                name: 'John Smith',
                email: 'john.smith@university.edu',
                role: 'Student',
                joinDate: '2023-08-25',
                reportsSubmitted: 1,
                itemsClaimed: 0,
                status: 'inactive',
            },
        ],

        // Lost items list
        lostItems: [
            {
                id: 'lost-15',
                name: 'MacBook Pro 16-inch',
                category: 'Electronics',
                location: 'Engineering Building',
                reportedBy: 'sarah.wilson@university.edu',
                date: '2024-01-25',
                time: '14:30',
                status: 'active',
                description: 'Silver MacBook Pro with university stickers',
            },
            {
                id: 'lost-14',
                name: 'Blue Jansport Backpack',
                category: 'Bags',
                location: 'Library - 3rd Floor',
                reportedBy: 'alex.johnson@university.edu',
                date: '2024-01-25',
                time: '11:45',
                status: 'active',
                description: 'Blue backpack with textbooks inside',
            },
            {
                id: 'lost-13',
                name: 'Black Wallet',
                category: 'Personal Items',
                location: 'Recreation Center',
                reportedBy: 'john.smith@university.edu',
                date: '2024-01-24',
                time: '16:20',
                status: 'active',
                description: 'Black leather wallet with student ID',
            },
            {
                id: 'lost-12',
                name: 'House Keys',
                category: 'Personal Items',
                location: 'Parking Lot B',
                reportedBy: 'emma.davis@university.edu',
                date: '2024-01-23',
                time: '18:00',
                status: 'found',
                description: 'Keys with blue keychain',
            },
        ],

        // Found items list
        foundItems: [
            {
                id: 'found-12',
                name: 'Red Gym Water Bottle',
                category: 'Personal Items',
                location: 'Recreation Center',
                reportedBy: 'mike.chen@university.edu',
                date: '2024-01-25',
                time: '13:15',
                status: 'pending',
                description: 'Red water bottle with gym logo',
            },
            {
                id: 'found-11',
                name: 'iPhone 15 Pro Max',
                category: 'Electronics',
                location: 'Student Union Food Court',
                reportedBy: 'emma.davis@university.edu',
                date: '2024-01-24',
                time: '19:20',
                status: 'claimed',
                description: 'iPhone in black case with cracked screen',
            },
            {
                id: 'found-10',
                name: 'Chemistry Textbook',
                category: 'Books',
                location: 'Science Building - Room 204',
                reportedBy: 'sarah.wilson@university.edu',
                date: '2024-01-23',
                time: '14:45',
                status: 'pending',
                description: 'Organic Chemistry textbook, 3rd edition',
            },
            {
                id: 'found-9',
                name: 'AirPods Pro',
                category: 'Electronics',
                location: 'Library - Study Room 5',
                reportedBy: 'alex.johnson@university.edu',
                date: '2024-01-22',
                time: '10:30',
                status: 'claimed',
                description: 'White AirPods Pro in charging case',
            },
        ],
    });

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active':
                return <Badge variant={'destructive'}>Active</Badge>;
            case 'found':
            case 'claimed':
                return <Badge variant={'default'}>Resolved</Badge>;
            case 'pending':
                return <Badge variant={'secondary'}>Pending</Badge>;
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
                                <div className="text-2xl font-bold text-foreground">{dashboardData.totalLostItems}</div>
                                <p className="text-xs text-muted-foreground">
                                    <span className="text-destructive">{dashboardData.activeLostItems} active</span>
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
                                <div className="text-2xl font-bold text-foreground">{dashboardData.totalFoundItems}</div>
                                <p className="text-xs text-muted-foreground">
                                    <span className="text-cta">{dashboardData.pendingItems} active</span>
                                </p>
                            </CardContent>
                        </Card>
                        {/* Successfully Claimed */}
                        <Card className="border-border bg-card">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Successfully Claimed</CardTitle>
                                <CheckCircle className="h-4 w-4 text-cta" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-foreground">{dashboardData.claimedItems}</div>
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
                                    {Math.round((dashboardData.claimedItems / dashboardData.totalLostItems) * 100)}%
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
                                                <TableHead>Reports</TableHead>
                                                <TableHead>Claims</TableHead>
                                                <TableHead>Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {dashboardData.users.map((user) => (
                                                <TableRow key={user.id}>
                                                    <TableCell className="font-medium">{user.name}</TableCell>
                                                    <TableCell className="text-sm">{user.email}</TableCell>
                                                    <TableCell className="text-sm">{user.joinDate}</TableCell>
                                                    <TableCell className="text-sm">{user.reportsSubmitted}</TableCell>
                                                    <TableCell className="text-sm">{user.itemsClaimed}</TableCell>
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
                                            {dashboardData.foundItems.map((item) => (
                                                <TableRow key={item.id}>
                                                    <TableCell className="font-medium">{item.name}</TableCell>
                                                    <TableCell>{item.category}</TableCell>
                                                    <TableCell className="text-sm">{item.location}</TableCell>
                                                    <TableCell className="text-sm">{item.reportedBy}</TableCell>
                                                    <TableCell className="text-sm">
                                                        {item.date} at {item.time}
                                                    </TableCell>
                                                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                                                    <TableCell>
                                                        <Button variant={'default'} size={'icon'} className="mr-2 size-8 bg-cta">
                                                            <Eye />
                                                        </Button>
                                                        <Button variant={'default'} size={'icon'} className="mr-2 size-8">
                                                            <SquarePen />
                                                        </Button>
                                                        <Button variant={'destructive'} size={'icon'} className="mr-2 size-8">
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
                                            {dashboardData.lostItems.map((item) => (
                                                <TableRow key={item.id}>
                                                    <TableCell className="font-medium">{item.name}</TableCell>
                                                    <TableCell>{item.category}</TableCell>
                                                    <TableCell className="text-sm">{item.location}</TableCell>
                                                    <TableCell className="text-sm">{item.reportedBy}</TableCell>
                                                    <TableCell className="text-sm">
                                                        {item.date} at {item.time}
                                                    </TableCell>
                                                    <TableCell className="text-sm">{getStatusBadge(item.status)}</TableCell>
                                                    <TableCell>
                                                        <Button variant={'default'} size={'icon'} className="mr-2 size-8 bg-cta">
                                                            <Eye />
                                                        </Button>
                                                        <Button variant={'default'} size={'icon'} className="mr-2 size-8">
                                                            <SquarePen />
                                                        </Button>
                                                        <Button variant={'destructive'} size={'icon'} className="mr-2 size-8">
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
