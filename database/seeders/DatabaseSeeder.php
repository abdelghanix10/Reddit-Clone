<?php

namespace Database\Seeders;

use App\Models\User;
use App\Enum\RolesEnum;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Enum\PermissionsEnum;
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
        $userRole = Role::create(['name' => RolesEnum::User->value]);
        $commenterRole = Role::create(['name' => RolesEnum::Commenter->value]);
        $adminRole = Role::create(['name' => RolesEnum::Admin->value]);

        $mangeFeaturesPermission = Permission::create(['name' => PermissionsEnum::ManageFeatures->value]);
        $manageUsersPermission = Permission::create(['name' => PermissionsEnum::ManageUsers->value]);
        $manageCommentsPermission = Permission::create(['name' => PermissionsEnum::ManageComments->value]);
        $upvoteDownvotePermission = Permission::create(['name' => PermissionsEnum::UpvoteDownvote->value]);

        $userRole->syncPermissions($upvoteDownvotePermission);
        $commenterRole->syncPermissions([$manageCommentsPermission, $upvoteDownvotePermission]);
        $adminRole->syncPermissions(Permission::all());
        
        User::factory()->create([
            'name' => 'User User',
            'email' => 'User@example.com',
        ])->assignRole(RolesEnum::User);
        
        User::factory()->create([
            'name' => 'Commenter User',
            'email' => 'commenter@example.com',
        ])->assignRole(RolesEnum::Commenter);
        
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
        ])->assignRole(RolesEnum::Admin);
    }
}