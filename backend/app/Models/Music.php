<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Music extends Model
{
    protected $fillable = ['music_name', 'album_id'];

    public function album(){
        // uma musica pertence a um album
        return $this->belongsTo(Album::class)->onDelete('cascade');
    }
}
