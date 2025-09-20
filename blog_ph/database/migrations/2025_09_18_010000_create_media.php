<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->string('file_name')->nullable();
            $table->string('disk', 50)->default('s3');
            $table->string('path')->nullable();
            $table->unsignedInteger('size')->nullable();
            $table->string('mime', 100)->nullable();
            $table->string('alt')->nullable();
            $table->string('type', 20)->default('image')->comment('image | video | file | thumb');
            $table->morphs('model'); // Cria model_type e model_id
            $table->integer('order')->default(0);
            $table->json('metadata')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};