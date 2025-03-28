<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class File extends Model
{
    protected $fillable = ['name', 'folder_id', 'size', 'size', 'mime_type'];
    public function folder(): BelongsTo
    {
        return $this->belongsTo(Folder::class);
    }
    public function getExtensionAttribute(): string
    {
        return pathinfo($this->name, PATHINFO_EXTENSION);
    }
}
