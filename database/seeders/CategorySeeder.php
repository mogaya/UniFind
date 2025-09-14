<?php
namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $categories = [
            'Identity Cards(IDs)',
            'Electronics',
            'Bags',
            'Clothing',
            'Books & Stationery',
            'Keys',
            'Jewelry & Accessories',
            'Sports Equipment',
            'Other',
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate(['category_name' => $category]);
        }
    }
}
