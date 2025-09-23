import ItemCard from '@/components/ItemCard';
import SearchBar from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Layout from '@/layouts/Layout';
import { router, usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { useState } from 'react';

type PageProps = {
    lostItems: {
        id: number;
        item_name: string;
        category_name: string;
        description: string;
        last_seen_location: string;
        date_lost: string;
        photo_url: string;
    }[];

    categories: { id: number; category_name: string }[];
};

const Index = () => {
    const { lostItems, categories } = usePage<PageProps>().props;

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    const locations = ['Library', 'Chiltons', 'Computer Lab', 'Cafeteria', 'LR', 'Gym'];

    // Filter items based on search query and filters
    const filteredItems = lostItems.filter((item) => {
        const matchesSearch =
            !searchQuery ||
            item.item_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.last_seen_location.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = !selectedCategory || item.category_name === selectedCategory;
        const matchesLocation = !selectedLocation || item.last_seen_location === selectedLocation;

        return matchesSearch && matchesCategory && matchesLocation;
    });

    const handleViewDetails = (id: string) => {
        router.get(`/lost-items/${id}`);
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
                        <h1 className="mb-4 text-3xl font-bold text-foreground">Lost Items</h1>
                        <p className="text-muted-foreground">
                            These are items that have been lost by the community, should you find any of them contact the owner.
                        </p>
                    </div>

                    {/* Search and Filter Bar */}
                    <div className="mb-6 space-y-4">
                        <SearchBar
                            placeholder="Search lost items..."
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
                                                        <SelectItem key={category.id} value={category.category_name}>
                                                            {category.category_name}
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
                            Showing {filteredItems.length} of {lostItems.length} items
                        </p>
                    </div>

                    {/* Items Grid */}
                    {filteredItems.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {filteredItems.map((item) => (
                                <ItemCard type={'lost'} key={item.id} {...item} onViewDetails={handleViewDetails} />
                            ))}
                        </div>
                    ) : (
                        <Card className="border-border bg-card py-12 text-center">
                            <CardContent>
                                <p className="mb-4 text-lg text-muted-foreground">No items lost matching your criteria</p>
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

export default Index;
