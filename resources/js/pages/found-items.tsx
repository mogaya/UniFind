import ItemCard from '@/components/ItemCard';
import SearchBar from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Layout from '@/layouts/Layout';
import { router } from '@inertiajs/react';
import { X } from 'lucide-react';
import { useState } from 'react';

const FoundItems = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    // // Mock data for found items
    const [allItems] = useState([
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
        {
            id: '4',
            name: 'Black Leather Wallet',
            category: 'Personal Items',
            description: 'Black leather bifold wallet with student ID visible',
            location: 'Cafeteria',
            dateFound: '2024-01-22',
            imageUrl:
                'https://images.unsplash.com/photo-1629958513881-a086d21383cd?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            id: '5',
            name: 'Calculus Textbook',
            category: 'Books',
            description: 'Calculus: Early Transcendentals textbook with highlighted notes',
            location: 'LR',
            dateFound: '2024-01-21',
            imageUrl:
                'https://plus.unsplash.com/premium_photo-1667251760504-096946b820af?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            id: '6',
            name: 'Wireless Earbuds',
            category: 'Electronics',
            description: 'White AirPods Pro with charging case',
            location: 'Gym',
            dateFound: '2024-01-20',
            imageUrl:
                'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=1289&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
    ]);

    const categories = ['Electronics', 'Bags', 'Personal Items', 'Books', 'Clothing', 'Other'];
    const locations = ['Library', 'Chiltons', 'Computer Lab', 'Cafeteria', 'LR', 'Gym'];

    // Filter items based on search query and filters
    const filteredItems = allItems.filter((item) => {
        const matchesSearch =
            !searchQuery ||
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.location.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = !selectedCategory || item.category === selectedCategory;
        const matchesLocation = !selectedLocation || item.location === selectedLocation;

        return matchesSearch && matchesCategory && matchesLocation;
    });

    const handleViewDetails = (id: string) => {
        router.get(`/item/${id}`);
    };

    const clearFilters = () => {
        setSelectedCategory('');
        setSelectedLocation('');
        setSearchQuery('');
    };

    return (
        <Layout>
            <div className="min-h-screen">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="mb-4 text-3xl font-bold text-foreground">Found Items</h1>
                        <p className="text-muted-foreground">
                            Browse through items that have been found around campus. See something that's yours? Click to claim it!
                        </p>
                    </div>

                    {/* Search and Filter Bar */}
                    <div className="mb-6 space-y-4">
                        <SearchBar
                            placeholder="Search found items..."
                            value={searchQuery}
                            onChange={setSearchQuery}
                            onFilterClick={() => setShowFilters(!showFilters)}
                        />

                        {/* Filters */}
                        {showFilters && (
                            <Card className="border-border bg-card p-4">
                                <CardContent className="p-0">
                                    <div className="mb-4 flex items-center justify-between">
                                        <h3 className="font-semibold text-foreground">Filters</h3>
                                        <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-foreground">Category</label>
                                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                                <SelectTrigger className="rounded-xl border-border bg-card">
                                                    <SelectValue placeholder="All categories" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {categories.map((category) => (
                                                        <SelectItem key={category} value={category}>
                                                            {category}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-foreground">Location</label>
                                            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                                                <SelectTrigger className="rounded-xl border-border bg-card">
                                                    <SelectValue placeholder="All locations" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {locations.map((location) => (
                                                        <SelectItem key={location} value={location}>
                                                            {location}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="flex items-end">
                                            <Button variant="outline" onClick={clearFilters} className="w-full">
                                                Clear Filters
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Results Count */}
                    <div className="mb-6">
                        <p className="text-muted-foreground">
                            Showing {filteredItems.length} of {allItems.length} items
                        </p>
                    </div>

                    {/* Items Grid */}
                    {filteredItems.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {filteredItems.map((item) => (
                                <ItemCard key={item.id} {...item} onViewDetails={handleViewDetails} />
                            ))}
                        </div>
                    ) : (
                        <Card className="border-border bg-card py-12 text-center">
                            <CardContent>
                                <p className="mb-4 text-lg text-muted-foreground">No items found matching your criteria</p>
                                <Button variant="outline" onClick={clearFilters}>
                                    Clear Filters
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default FoundItems;
