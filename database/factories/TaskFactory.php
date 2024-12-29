<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Project;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $assignedUser = User::inRandomOrder()->first()->id;
        $createdBy = User::inRandomOrder()->first()->id;
        $updatedBy = User::inRandomOrder()->first()->id;
        $project = Project::inRandomOrder()->first()->id;



        $createdAt = fake()->dateTimeBetween('-1 year', '+1 day');
        $updatedAt = fake()->randomElement([null, fake()->dateTimeBetween($createdAt, '+3 year')]);

        return [
            'name' => fake()->sentence(),
            'description' => fake()->realText(),
            'image_path' => fake()->imageUrl(),
            'due_date' => fake()->dateTimeBetween('now', '+1 year'),
            'created_at' => $createdAt,
            'updated_at' => $updatedAt,
            'status' => fake()->randomElement(['pending', 'in_progress', 'completed', 'cancelled']),
            'priority' => fake()->randomElement(['low', 'medium', 'high', 'highest']),

            // Assign existing random users
            'assigned_user_id' => $assignedUser,
            'project_id' => $project,
            'created_by' => $createdBy,
            'updated_by' => $updatedBy,
        ];
    }
}
