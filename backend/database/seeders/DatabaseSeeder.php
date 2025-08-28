<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Priority;
use App\Models\Status;
use App\Models\Task;
use App\Models\TaskList;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        Schema::disableForeignKeyConstraints();
        Category::truncate();
        Task::truncate();
        Schema::enableForeignKeyConstraints();


        Priority::create([
            'name'=>'low'
        ]);
        Priority::create([
            'name'=>'medium'
        ]);
        Priority::create([
            'name'=>'high'
        ]);        
        
        Status::create([
            'name'=>'Not started',
        ]);
        Status::create([
            'name'=>'Active',
        ]);
        Status::create([
            'name'=>'Finished',
        ]);

        User::factory()->create([
            'first_name' => 'Admin',
            'last_name'  => 'User',
            'email'      => 'admin@example.com',
            'username'   => 'admin',
            'password'   => Hash::make('admin123'),
            'role'       => 'admin',
            'is_verified'=> true,
        ]);

        User::factory()->create([
            'first_name' => 'Ana',
            'last_name'  => 'Anic',
            'email'      => 'ana@gmail.com',
            'username'   => 'ana123',
            'password'   => Hash::make('ana123'),
            'role'       => 'user',
            'is_verified'=> false,
        ]);

        User::factory(5)->create()->each(function ($user) {
            $categories = Category::factory(3)->create(['user_id' => $user->id]);

            Task::factory(5)->create([
                'status'=>Status::all()->random()->name,
                'priority'=>Priority::all()->random()->name,
                'user_id' => $user->id,
            ])->each(function ($task) use ($categories) {
                $task->category_id = $categories->random()->id;
                $task->save();
            });
        });
    }
}
