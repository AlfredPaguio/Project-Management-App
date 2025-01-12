<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run()
    {
        // id 1
        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('test12345'),
            'email_verified_at' => now(),
        ]);

        $user->assignRole('Super Admin');

        User::factory(10)->create();
        User::factory(2)->manager()->create();
    }
}
