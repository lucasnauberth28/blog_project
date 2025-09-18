<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $creator = User::factory()->create([
            'name' => 'Colaborador Principal',
            'email' => 'criador@suaempresa.com',
            'password' => Hash::make('password'),
            'role' => 'creator',
        ]);

        $tags = Tag::factory()->count(10)->create();

        Post::factory()
            ->count(20)
            ->for($creator, 'author')
            ->create()
            ->each(function ($post) use ($tags) {
                $post->tags()->attach(
                    $tags->random(rand(1, 3))->pluck('id')->toArray()
                );
            });
    }
}