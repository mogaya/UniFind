import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Edit, Eye, MapPin, Package, Trash2 } from 'lucide-react';

interface Report {
    id: number;
    item_name: string;
    category_name: string;
    description: string;
    last_seen_location?: string; // for lost
    where_found?: string; // for found
    date_lost?: string;
    date_found?: string;
    status: string;
    created_at: string;
    contact_info: string;
    photo_url: string;
}

interface ReportCardProps {
    report: Report;
    type: 'lost' | 'found';
    getStatusBadge: (status: Report['status']) => React.ReactNode;
    handleViewDetails: (id: string, type: string) => void;
    handleEdit: (id: string, type: string) => void;
    handleMarkAsResolved: (id: string, type: string) => void;
    handleDelete: (id: number, type: string) => void;
}

const ReportCard: React.FC<ReportCardProps> = ({
    report,
    type,
    getStatusBadge,
    handleViewDetails,
    handleEdit,
    handleMarkAsResolved,
    handleDelete,
}) => {
    return (
        <Card className="border-border bg-card transition-shadow duration-200 hover:shadow-lg">
            <CardHeader className="pb-3">
                <div className="flex flex-wrap items-start justify-between">
                    <div className="mt-2 flex-1">
                        <CardTitle className="text-lg font-semibold text-foreground">{report.item_name}</CardTitle>
                        <div className="mt-2 flex items-center gap-2">
                            {getStatusBadge(report.status)}
                            <Badge variant="outline" className="text-xs">
                                {report.category_name}
                            </Badge>
                        </div>
                    </div>
                    <img src={report.photo_url} alt={report.item_name} className="mt-2 h-16 w-16 rounded-lg border border-border object-cover" />
                </div>
            </CardHeader>

            <CardContent className="space-y-3">
                <p className="line-clamp-2 text-sm text-muted-foreground">{report.description}</p>

                <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{type === 'lost' ? report.last_seen_location : report.where_found}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{type === 'lost' ? `Lost on ${report.date_lost}` : `Found on ${report.date_found}`}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        <span>Reported on {report.created_at}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 border-t border-border pt-3">
                    <Button variant="outline" size="sm" onClick={() => handleViewDetails(String(report.id), type)} className="flex-1">
                        <Eye className="mr-1 h-4 w-4" />
                        View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(String(report.id), type)} className="flex-1">
                        <Edit className="mr-1 h-4 w-4" />
                        Edit
                    </Button>
                    {(report.status === 'active' || report.status === 'pending') && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleMarkAsResolved(String(report.id), type)}
                            className="flex-1 text-cta hover:text-cta"
                        >
                            {report.status === 'pending' ? 'Mark as Resolved' : 'Mark as Pending'}
                        </Button>
                    )}
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-danger hover:text-danger">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete Report</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to delete this report? This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(report.id, type)} className="bg-red-500 hover:bg-red-600">
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </CardContent>
        </Card>
    );
};

export default ReportCard;
