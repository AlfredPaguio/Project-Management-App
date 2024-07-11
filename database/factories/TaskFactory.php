<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

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
        return [
            'name' => fake()->sentence(),
            'description' => fake()->realText(),
            'image_path' => fake()->imageUrl(),
            'due_date' => fake()->dateTimeBetween('now', '+1 year'),
            'updated_at' => fake()->randomElement([null, fake()->dateTimeBetween('+1 day', '+3 year')]),
            'status' => fake()->randomElement(['pending', 'in_progress', 'completed', 'cancelled']),
            'priority' => fake()->randomElement(['low', 'medium', 'high', 'highest']),
            'assigned_user_id' => 1,
            'created_by' => 1,
            'updated_by' => 1,
            'project_id' => 1,
        ];
    }
}
