import ItemCard from '@/components/ItemCard';
import { Button } from '@/components/ui/button';
import CustomSection from '@/layouts/custom-section';
import Layout from '@/layouts/Layout';
import { type SharedData } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import HeroSection from '../home/components/hero-section';
import StatsSection from '../home/components/stats-section';

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
};

export default function Index() {
    const { recentFoundItems } = usePage<PageProps>().props;
    const { auth } = usePage<SharedData>().props;
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        if (searchQuery.trim()) {
            router.get(`/found-items?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handleViewDetails = (id: string) => {
        router.get(`/item/${id}`);
    };

    return (
        <Layout>
            <HeroSection />
            <StatsSection />

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
