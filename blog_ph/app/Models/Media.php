<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Media extends Model
{
    use HasFactory;

    protected $fillable = [
        'file_name',
        'disk',
        'path',
        'size',
        'mime',
        'alt',
        'type',
        'model_type',
        'model_id',
        'order',
        'metadata',
    ];
    
    // Desativa created_at e updated_at para esta tabela se não precisar.
    // public $timestamps = false; 

    protected $casts = [
        'metadata' => 'array',
    ];

    /**
     * Relação Polimórfica: Mídia pertence a um modelo (Post, User, etc).
     */
    public function model(): MorphTo
    {
        return $this->morphTo();
    }
}