import ItemCard from '@/components/ItemCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import CustomSection from '@/layouts/custom-section';
import Layout from '@/layouts/Layout';
import { type SharedData } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { PackageSearch, SearchCheck, UserRoundCheck } from 'lucide-react';
import { useState } from 'react';
import HeroSection from '../home/components/hero-section';

type PageProps = {
    recentFoundItems: {
        id: number;
        item_name: string;
        category_name: string;
        description: string;
        where_found: string;
        date_found: string;
        photo_url: string;
    }[];
    lostItemsCount: number;
    foundItemsCount: number;
    usersCount: number;
};

export default function Index() {
    const { recentFoundItems, lostItemsCount, foundItemsCount, usersCount } = usePage<PageProps>().props;
    const { auth } = usePage<SharedData>().props;
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        if (searchQuery.trim()) {
            router.get(`/found-items?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    const stats = [
        { label: 'Lost Items', value: `${lostItemsCount}`, icon: PackageSearch, color: 'text-cta' },
        { label: 'Found Items', value: `${foundItemsCount}`, icon: SearchCheck, color: 'text-primary' },
        { label: 'Active Users', value: `${usersCount}`, icon: UserRoundCheck, color: 'text-accent-highlight' },
    ];

    const handleViewDetails = (id: string) => {
        router.get(`/item/${id}`);
    };

    return (
        <Layout>
            <HeroSection />
            {/* Statistics Section */}
            <CustomSection>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={stat.label} className="border-border bg-card p-6 text-center">
                                <CardContent className="p-0">
                                    <div className="mb-3 flex justify-center">
                                        <Icon className={`h-8 w-8 ${stat.color}`} />
                                    </div>
                                    <div className="mb-2 text-3xl font-bold text-foreground">{stat.value}</div>
                                    <div className="text-muted-foreground">{stat.label}</div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </CustomSection>

            {/* Recent Found Items */}
            <CustomSection>
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-foreground">Recently Found Items</h2>
                    <Button variant="outline" onClick={() => router.get('/found-items')}>
                        View All Items
                    </Button>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {recentFoundItems.map((item) => (
                        <ItemCard key={item.id} {...item} onViewDetails={handleViewDetails} />
                    ))}
                </div>
            </CustomSection>
        </Layout>
    );
}
