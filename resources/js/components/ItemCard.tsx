import { Calendar, Eye, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';

interface ItemCardProps {
    id: string;
    name: string;
    category: string;
    description: string;
    location: string;
    dateFound: string;
    imageUrl?: string;
    onViewDetails: (id: string) => void;
}

const ItemCard = (Item: ItemCardProps) => {
    return (
        <Card className="overflow-hidden border-border bg-card pt-0 transition-shadow duration-200 hover:shadow-lg">
            <div className="relative aspect-video overflow-hidden bg-muted">
                {Item.imageUrl ? (
                    <img src={Item.imageUrl} alt={Item.name} className="h-full w-full object-cover" />
                ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                        <Eye className="h-8 w-8" />
                    </div>
                )}
                <div className="absolute top-3 left-3">
                    <span className="rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">{Item.category}</span>
                </div>
            </div>

            <CardContent className="space-y-3 p-4">
                <div>
                    <h3 className="line-clamp-1 text-lg font-semibold text-foreground">{Item.name}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{Item.description}</p>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-2 h-4 w-4" />
                        <span>{Item.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Found on {Item.dateFound}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={() => Item.onViewDetails(Item.id)} className="w-full" variant="default">
                    View Details
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ItemCard;
