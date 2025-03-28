<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Folder extends Model
{
    protected $fillable = ['name', 'parent_id', 'path'];
    public function children(): HasMany
    {
        return $this->hasMany(Folder::class, 'parent_id');
    }

    public function files(): HasMany
    {
        return $this->hasMany(File::class);
    }

    protected static function booted()
    {
        static::creating(function ($folder) {
            if ($folder->parent_id) {
                $parent = Folder::find($folder->parent_id);
                $folder->path = $parent->path ? $parent->path . '/' . $parent->id : $parent->id;
            }
        });
    }
}
