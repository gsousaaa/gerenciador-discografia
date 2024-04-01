<?php

use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Route;

Route::get('/albums', [ApiController::class, 'getAlbums']);
Route::get('/album/{album_id}', [ApiController::class, 'getAlbum']);
Route::post('/createalbum', [ApiController::class, 'createAlbum']);
Route::post('/album/{album_id}/music', [ApiController::class, 'addMusic']);
Route::put('/album/{album_id}', [ApiController::class, 'editAlbum']);
Route::put('/album/{album_id}/music/{music_id}', [ApiController::class, 'editMusic']);
Route::delete('/album/{album_id}', [ApiController::class, 'deleteAlbum']);
Route::delete('/album/{album_id}/music/{music_id}', [ApiController::class, 'deleteMusic']);
