<?php

namespace Database\Seeders;

use App\Models\TaskList;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaskListSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TaskList::factory()->create([
            'user_id'=>User::all()->random()
        ]);
        TaskList::factory()->create([
            'user_id'=>User::all()->random()
        ]);
        TaskList::factory()->create([
            'user_id'=>User::all()->random()
        ]);
    }
}
