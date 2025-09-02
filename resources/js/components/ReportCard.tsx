import { Calendar, Edit, Eye, MapPin, Package, Trash2 } from 'lucide-react';
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
} from './ui/alert-dialog';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface Report {
    id: string;
    name: string;
    category: string;
    description: string;
    lastSeenLocation?: string;
    location?: string;
    dateLost?: string;
    dateFound?: string;
    status: 'active' | 'found' | 'claimed' | 'pending';
    dateReported: string;
    contactInfo: string;
    imageUrl: string;
}

interface ReportCardProps {
    report: Report;
    type: 'lost' | 'found';
    getStatusBadge: (status: Report['status']) => React.ReactNode;
    handleViewDetails: (id: string, type: string) => void;
    handleEdit: (id: string, type: string) => void;
    handleMarkAsResolved: (id: string, type: string) => void;
    handleDelete: (id: string, type: string) => void;
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
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <CardTitle className="text-lg font-semibold text-foreground">{report.name}</CardTitle>
                        <div className="mt-2 flex items-center gap-2">
                            {getStatusBadge(report.status)}
                            <Badge variant="outline" className="text-xs">
                                {report.category}
                            </Badge>
                        </div>
                    </div>
                    <img src={report.imageUrl} alt={report.name} className="h-16 w-16 rounded-lg border border-border object-cover" />
                </div>
            </CardHeader>

            <CardContent className="space-y-3">
                <p className="line-clamp-2 text-sm text-muted-foreground">{report.description}</p>

                <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{type === 'lost' ? report.lastSeenLocation : report.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{type === 'lost' ? `Lost on ${report.dateLost}` : `Found on ${report.dateFound}`}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        <span>Reported on {report.dateReported}</span>
                    </div>
                </div>

                <div className="flex gap-2 border-t border-border pt-3">
                    <Button variant="outline" size="sm" onClick={() => handleViewDetails(report.id, type)} className="flex-1">
                        <Eye className="mr-1 h-4 w-4" />
                        View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(report.id, type)} className="flex-1">
                        <Edit className="mr-1 h-4 w-4" />
                        Edit
                    </Button>
                    {(report.status === 'active' || report.status === 'pending') && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleMarkAsResolved(report.id, type)}
                            className="text-cta hover:text-cta flex-1"
                        >
                            Mark Resolved
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
                                <AlertDialogAction onClick={() => handleDelete(report.id, type)} className="bg-danger hover:bg-danger/90">
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
