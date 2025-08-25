import { Filter, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface SearchBarProps {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    onFilterClick?: () => void;
    showFilter?: boolean;
}

const SearchBar = ({ placeholder = 'Search Items...', value = '', onChange, onFilterClick, showFilter = true }: SearchBarProps) => {
    return (
        <div className="flex gap-2">
            <div className="relative flex-1">
                <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-muted-foreground" />
                <Input
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    className="h-12 rounded-2xl border-border bg-card py-3 pr-4 pl-10 shadow-sm focus:border-transparent focus:ring-2 focus:ring-primary"
                />
            </div>
            {showFilter && (
                <Button variant="outline" size="icon" onClick={onFilterClick} className="h-12 w-12 rounded-2xl">
                    <Filter className="h-5 w-5" />
                </Button>
            )}
        </div>
    );
};

export default SearchBar;
