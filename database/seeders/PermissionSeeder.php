<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    public function run()
    {
        $roles = ['admin', 'manager', 'user'];
        $permissions = [
            'tasks.view',
            'tasks.edit',
            'projects.manage',
            'users.manage',
        ];

        foreach ($roles as $role) {
            Role::create(['name' => $role]);
        }

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        $user = User::find(1);
        $user->assignRole('admin');

        $rolePermissions = [
            'admin' => $permissions,
            'manager' => ['tasks.view', 'tasks.edit', 'projects.manage'],
            'user' => ['tasks.view'],
        ];

        foreach ($rolePermissions as $role => $permissions) {
            $role = Role::findByName($role);
            $role->givePermissionTo($permissions);
        }
    }
}
