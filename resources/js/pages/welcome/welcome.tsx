import Layout from '@/layouts/Layout';
import { type SharedData } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { CheckCircle, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';
import Hero from './components/hero';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [searchQuery, setSearchQuery] = useState('');

    // Mock data for recent found items
    const recentFoundItems = [
        {
            id: '1',
            name: 'iPhone 14 Pro',
            category: 'Electronics',
            description: 'Space Black iPhone 14 Pro with blue case, found near the charging station',
            location: 'Library',
            dateFound: '2024-01-25',
            imageUrl:
                'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            id: '2',
            name: 'Bag',
            category: 'Bags',
            description: 'Bag with laptop compartment and water bottle holder',
            location: 'Chiltons',
            dateFound: '2024-01-24',
            imageUrl:
                'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            id: '3',
            name: 'Silver MacBook Air',
            category: 'Electronics',
            description: 'MacBook Air M2 with university stickers and black sleeve',
            location: 'Computer Lab',
            dateFound: '2024-01-23',
            imageUrl:
                'https://images.unsplash.com/photo-1650750018363-ff7ffe460f4b?q=80&w=1009&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
    ];

    const stats = [
        { label: 'Items Recovered', value: '1,247', icon: CheckCircle, color: 'text-cta' },
        { label: 'Active Users', value: '3,429', icon: Users, color: 'text-primary' },
        { label: 'Success Rate', value: '87%', icon: TrendingUp, color: 'text-accent-highlight' },
    ];

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
            <Hero />
            <div>Home</div>
        </Layout>
    );
}
