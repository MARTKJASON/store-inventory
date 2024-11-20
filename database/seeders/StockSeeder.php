<?php
// database/seeders/StockSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class StockSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        foreach (range(1, 10) as $index) {
            DB::table('stocks')->insert([
                'product_id' => $faker->numberBetween(1, 10), // Assuming product IDs are between 1 and 10
                'supplier_id' => $faker->numberBetween(1, 10), // Assuming supplier IDs are between 1 and 10
                'quantity' => $faker->numberBetween(10, 100),  // Random quantity between 10 and 100
            ]);
        }
    }
}
