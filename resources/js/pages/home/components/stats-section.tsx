import { Card, CardContent } from '@/components/ui/card';
import CustomSection from '@/layouts/custom-section';
import { CheckCircle, TrendingUp, Users } from 'lucide-react';

const statsSection = () => {
    const stats = [
        { label: 'Items Recovered', value: '1,247', icon: CheckCircle, color: 'text-cta' },
        { label: 'Active Users', value: '3,429', icon: Users, color: 'text-primary' },
        { label: 'Success Rate', value: '87%', icon: TrendingUp, color: 'text-accent-highlight' },
    ];

    return (
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
    );
};

export default statsSection;
