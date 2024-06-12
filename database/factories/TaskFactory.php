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
            'description'=> fake()->realText(),
            'image_path'=> fake()->imageUrl(),
            'due_date'=> fake()->sentence(),
            $table->enum('status', ['pending', 'in_progress', 'completed']);
            $table->enum('priority', ['low', 'medium', 'high', 'highest']);
            $table->foreignId('assigned_user_id')->constrained("users");
            $table->foreignId('created_by')->constrained("users");
            $table->foreignId('updated_by')->constrained("users");
            $table->foreignId('project_id')->constrained("projects");
        ];
    }
}
