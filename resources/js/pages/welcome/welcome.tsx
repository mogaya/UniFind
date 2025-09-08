import Layout from '@/layouts/Layout';
import { type SharedData } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import HeroSection from './components/hero-section';
import RecentFoundSection from './components/recent-found-section';
import StatsSection from './components/stats-section';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        if (searchQuery.trim()) {
            router.get(`/found-items?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <Layout>
            <HeroSection />
            <StatsSection />
            <RecentFoundSection />
        </Layout>
    );
}
