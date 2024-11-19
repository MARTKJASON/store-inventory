<?
// database/seeders/ProductSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        foreach (range(1, 10) as $index) {
            DB::table('products')->insert([
                'product_name' => $faker->word,
                'category_id' => $faker->numberBetween(1, 10), // Assuming category IDs are between 1 and 10
                'supplier_id' => $faker->numberBetween(1, 10), // Assuming supplier IDs are between 1 and 10
                'pricing' => $faker->randomFloat(2, 10, 1000),  // Random price between 10 and 1000
            ]);
        }
    }
}
