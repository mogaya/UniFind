import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/layouts/Layout';
import { useForm, usePage } from '@inertiajs/react';
import { Camera, Upload } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

type PageProps = {
    categories: { id: number; category_name: string }[];
};

const create = () => {
    const { categories } = usePage<PageProps>().props;

    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        item_name: '',
        category_id: '',
        description: '',
        where_found: '',
        date_found: '',
        contact_info: '',
        photo: null as File | null,
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setData('photo', file);

        const reader = new FileReader();

        reader.onload = (e) => {
            setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/found-items', {
            onSuccess: () => {
                toast('Found item reported successfully', {
                    description: "We've added the item to Found Items. The owner will contact you.",
                    style: { color: 'green' },
                });
            },
        });
        // console.log(data);
    };

    return (
        <Layout>
            <div className="min-h-screen">
                <Card className="mx-auto mt-6 max-w-xl border-border shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl text-foreground">Report Found Item</CardTitle>
                        <p className="text-muted-foreground">Help reunite someone with their lost belongings</p>
                    </CardHeader>

                    <form action="" onSubmit={handleSubmit} className="space-y-6">
                        <CardContent className="space-y-6">
                            {/* ItemName */}
                            <div className="space-y-2">
                                <Label htmlFor="itemName" className="font-medium text-foreground">
                                    Item Name
                                </Label>
                                <Input
                                    id="itemName"
                                    placeholder="e.g., iPhone 14 Pro, Black Bag, etc."
                                    value={data.item_name}
                                    onChange={(e) => setData('item_name', e.target.value)}
                                    className="rounded-xl border-border"
                                ></Input>
                            </div>

                            {/* Category */}
                            <div className="space-y-2">
                                <Label htmlFor="category" className="font-medium text-foreground">
                                    Category
                                </Label>
                                <Select onValueChange={(value) => setData('category_id', value)}>
                                    <SelectTrigger className="rounded-xl border-border">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={String(category.id)}>
                                                {category.category_name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label htmlFor="description" className="font-medium text-foreground">
                                    Description
                                </Label>
                                <Textarea
                                    id="description"
                                    placeholder="Describe your item in detail (color, size, brand, distinctive features, etc.)"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="min-h-[100px] rounded-xl border-border"
                                    required
                                />
                            </div>

                            {/* Where did you find it? */}
                            <div className="space-y-2">
                                <Label htmlFor="location" className="font-medium text-foreground">
                                    Where did you find it?
                                </Label>
                                <Input
                                    id="location"
                                    placeholder="e.g., Library, ICT block, Cafeteria, etc."
                                    value={data.where_found}
                                    onChange={(e) => setData('where_found', e.target.value)}
                                    className="rounded-xl border-border"
                                    required
                                />
                            </div>

                            {/* Date Found */}
                            <div className="space-y-2">
                                <Label htmlFor="dateLost" className="font-medium text-foreground">
                                    Date Found
                                </Label>
                                <Input
                                    id="dateLost"
                                    type="date"
                                    value={data.date_found}
                                    onChange={(e) => setData('date_found', e.target.value)}
                                    className="rounded-xl border-border"
                                    required
                                />
                            </div>

                            {/* Your Contact Information */}
                            <div className="space-y-2">
                                <Label htmlFor="contactInfo" className="font-medium text-foreground">
                                    Your Contact Information
                                </Label>
                                <Input
                                    id="contactInfo"
                                    placeholder="Your email or phone number"
                                    value={data.contact_info}
                                    onChange={(e) => setData('contact_info', e.target.value)}
                                    className="rounded-xl border-border"
                                />
                            </div>

                            {/* Photo of the Item */}
                            <div className="space-y-2">
                                <Label className="font-medium text-foreground">Photo of the Item</Label>
                                <div className="rounded-xl border-2 border-dashed border-border p-6 text-center">
                                    {imagePreview ? (
                                        <div className="space-y-4">
                                            <img src={imagePreview} alt="Preview" className="mx-auto h-48 max-w-full rounded-lg object-cover" />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => {
                                                    setSelectedImage(null);
                                                    setImagePreview(null);
                                                }}
                                            >
                                                Remove Photo
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <Camera className="mx-auto h-12 w-12 text-muted-foreground" />
                                            <div>
                                                <label htmlFor="photo" className="cursor-pointer">
                                                    <Button type="button" variant="outline" asChild>
                                                        <span>
                                                            <Upload className="mr-2 h-4 w-4" />
                                                            Choose Photo
                                                        </span>
                                                    </Button>
                                                </label>
                                                <input id="photo" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                            </div>
                                            <p className="text-sm text-muted-foreground">Upload a clear photo to help identify your item</p>
                                        </div>
                                    )}
                                </div>
                                <p className="text-xs text-muted-foreground">A clear photo helps owners identify their items faster.</p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            {/* Submit Button */}
                            <Button type="submit" size="lg" className="w-full">
                                Submit Lost Item Report
                            </Button>
                            <p className="text-center text-xs text-muted-foreground">
                                By submitting this form, you agree to help facilitate the return of this item to its rightful owner.
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </Layout>
    );
};

export default create;
