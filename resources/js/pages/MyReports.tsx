import { Badge } from '@/components/ui/badge';
import Layout from '@/layouts/Layout';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

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

    const handleEdit = (id: string, type: 'lost' | 'found') => {
        // Navigate to edit page
        if (type === 'lost') {
            router.get(`/report-lost?edit=${id}`);
        } else {
            router.get(`/report-found?edit=${id}`);
        }
    };

    const handleDelete = (id: string, type: 'lost' | 'found') => {
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

    const handleMarkAsResolved = (id: string, type: 'lost' | 'found') => {
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
            <div className="min-h-screen bg-background">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="mb-4 text-3xl font-bold text-foreground">My Reports</h1>
                        <p className="text-muted-foreground">View and manage all your lost and found item reports.</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default MyReports;
