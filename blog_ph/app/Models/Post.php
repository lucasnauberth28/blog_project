<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'summary',
        'body',
        'status',
        'visibility',
        'published_at',
        'meta',
        'language',
        'featured',
        'pinned',
        'views_count',
        'comments_enabled',
    ];

    protected $casts = [
        'meta' => 'array',
        'published_at' => 'datetime',
        'featured' => 'boolean',
        'pinned' => 'boolean',
        'comments_enabled' => 'boolean',
    ];

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'post_tag')->withPivot('extra');
    }

    public function versions(): HasMany
    {
        return $this->hasMany(PostVersion::class);
    }

    public function media(): MorphMany
    {
        return $this->morphMany(Media::class, 'model');
    }
}