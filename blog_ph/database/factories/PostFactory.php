<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->sentence(6);
        return [
            'user_id' => User::factory(),
            'title' => $title,
            'slug' => Str::slug($title) . '-' . uniqid(),
            'summary' => $this->faker->paragraph(2),
            'body' => $this->faker->paragraphs(10, true),
            'status' => 'published',
            'visibility' => 'public',
            'published_at' => now(),
            'language' => 'pt-BR',
        ];
    }
}