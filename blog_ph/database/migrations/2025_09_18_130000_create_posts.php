<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('summary')->nullable();
            $table->longText('body');
            $table->string('status', 20)->default('draft')->comment('draft | published | archived');
            $table->string('visibility', 20)->default('public')->comment('public | private | internal');
            $table->timestamp('published_at')->nullable();
            $table->json('meta')->nullable();
            $table->char('language', 5)->default('pt-BR');
            $table->boolean('featured')->default(false);
            $table->boolean('pinned')->default(false);
            $table->unsignedBigInteger('views_count')->default(0);
            $table->boolean('comments_enabled')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};