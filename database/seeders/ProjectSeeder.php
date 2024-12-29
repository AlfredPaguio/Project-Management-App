<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;
use App\Models\Task;

use Illuminate\Support\Facades\DB;

class ProjectSeeder extends Seeder
{
    public function run()
    {
        // Project::factory()->count(100)->hasTasks(10)->create();
        // Project::factory()->count(10)->hasTasks(10)->create();
        // faster
        DB::transaction(function () {
            $projects = Project::factory(100)->create();
            // $projects->each(function ($project) {
            //     Task::factory(10)->create(['project_id' => $project->id]);
            // });
            // More memory but faster
            $tasks = $projects->flatMap(function ($project) {
                return Task::factory(10)->make(['project_id' => $project->id]);
            });
            Task::insert($tasks->toArray());
        });


    }
}
