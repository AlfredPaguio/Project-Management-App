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
        // https://spatie.be/docs/laravel-permission/v6/advanced-usage/seeding
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = [
            'tasks.view',
            'tasks.manage',
            'tasks.manage.own',
            'projects.manage',
            'projects.manage.own',
            'users.manage',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $roles = ['Super Admin', 'Admin', 'Manager', 'User'];

        foreach ($roles as $role) {
            Role::create(['name' => $role]);
        }

        $rolePermissions = [
            'Admin' => $permissions,
            'Manager' => ['tasks.view', 'tasks.manage', 'tasks.manage.own', 'projects.manage', 'projects.manage.own'],
            'User' => ['tasks.view', 'tasks.manage.own', 'projects.manage.own'],
        ];

        foreach ($rolePermissions as $role => $permissions) {
            $role = Role::findByName($role);
            $role->givePermissionTo($permissions);
        }
    }
}
