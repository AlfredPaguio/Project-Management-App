<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $createdBy = User::inRandomOrder()->first()->id;
        $updatedBy = User::inRandomOrder()->first()->id;

        $createdAt = fake()->dateTimeBetween('-1 year', '+1 day');
        $updatedAt = fake()->randomElement([null, fake()->dateTimeBetween($createdAt, '+3 year')]);

        return [
            'name' => fake()->sentence(),
            'description' => fake()->realText(),
            'image_path' => fake()->imageUrl(),
            'due_date' => fake()->dateTimeBetween('now', '+3 year'),
            'updated_at' => fake()->randomElement([null, fake()->dateTimeBetween('+1 day', '+3 year')]),
            'status' => fake()->randomElement(['pending', 'in_progress', 'completed', 'cancelled']),
            'created_at' => $createdAt,
            'updated_at' => $updatedAt,

            'created_by' => $createdBy,
            'updated_by' => $updatedBy,
        ];
    }
}
