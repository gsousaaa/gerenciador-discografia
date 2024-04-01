<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Album extends Model
{
    protected $fillable = ['album_name'];

    public function musics(){
        // um album tem varias musicas
        return $this->hasMany(Music::class);
    }
}

