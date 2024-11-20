<?php
// database/seeders/SupplierSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class SupplierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        foreach (range(1, 10) as $index) {
            DB::table('suppliers')->insert([
                'supplier_name' => $faker->company,
                'contact_info' => $faker->email,
                'address' => $faker->address,
            ]);
        }
    }
}
