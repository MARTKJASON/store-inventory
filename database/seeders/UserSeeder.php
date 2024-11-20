<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        foreach (range(1, 10) as $index) {
            DB::table('users')->insert([
                'first_name' => $faker->firstName,
                'last_name' => $faker->lastName,
                'is_admin' => $faker->boolean(50),  // 50% chance for true or false
                'is_warehousestaff' => $faker->boolean(50),
                'is_salesperson' => $faker->boolean(50),
                'password' => Hash::make('password123'),
                'store_id' => $faker->unique()->uuid,  // Generate a unique UUID
                'remember_token' => $faker->optional()->uuid,  // Optionally generate a remember token
            ]);
        }
    }
}
