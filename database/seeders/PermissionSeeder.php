<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    public function run()
    {
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
    }
}
