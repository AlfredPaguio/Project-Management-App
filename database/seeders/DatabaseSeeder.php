<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('test12345'),
            'email_verified_at' => now(),
        ]);

        Role::create(['name' => 'admin']);
        Role::create(['name' => 'manager']);
        Role::create(['name' => 'user']);

        Permission::create(['name' => 'view tasks']);
        Permission::create(['name' => 'edit tasks']);

        Permission::create(['name' => 'manage-projects']);
        Permission::create(['name' => 'manage-users']);

        $adminRole = Role::findByName('admin');
        $adminRole->givePermissionTo(['view tasks', 'edit tasks', 'manage-projects', 'manage-users']);

        $managerRole = Role::findByName('manager');
        $managerRole->givePermissionTo(['view tasks', 'edit tasks', 'manage-projects']);

        $userRole = Role::findByName('user');
        $userRole->givePermissionTo(['view tasks']);

        $user = User::find(1);
        $user->assignRole('admin');

        Project::factory()->count(100)->hasTasks(10)->create();
    }
}
