<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Album;
use App\Models\Music;
use Illuminate\Validation\Rule;

class ApiController extends Controller
{
    public function getAlbums(Request $request)
    {
        $albuns = Album::with('musics')->get();
        if (!$albuns) {
            return response()->json(['error' => 'Erro ao buscar os albuns'], 404);
        }
        return response()->json($albuns);
    }

    public function getAlbum(Request $request, $album_id)
    {
        $album = Album::with('musics')->find($album_id);
        if (!$album) {
            return response()->json(['error' => 'Album não encontrado'], 404);
        }

        return response()->json($album, 200);
    }
    public function createAlbum(Request $request)
    {
        if (!$request->has('album_name')) {
            return response()->json(['error' => 'O parâmetro album_name é obrigatório.'], 400);
        }

        $albumName = strtoupper($request->album_name);

        // Verificar se o álbum já existe
        if (Album::where('album_name', $albumName)->exists()) {
            return response()->json(['error' => 'O álbum já existe.'], 400);
        }

        $request->validate([
            'album_name' => [
                'required',
                'string',
                Rule::unique('albums', 'album_name'),
            ],
        ]);

        $album = Album::create([
            'album_name' => $albumName
        ]);

        return response()->json($album);
    }


    public function addMusic(Request $request, $album_id)
    {
        $album = Album::find($album_id);

        if (!$album) {
            return response()->json(['error' => 'Album não encontrado'], 404);
        }

        $request->validate([
            'music_name' => [
                'required',
                'string'
            ]
        ]);

        $existingMusic = $album->musics()->where('music_name', strtoupper($request->input('music_name')))->first();

        if ($existingMusic) {
            return response()->json(['error' => 'Já existe uma música com esse nome neste álbum'], 400);
        }
        $music = new Music([
            'music_name' => strtoupper($request->input('music_name'))
        ]);

        $album->musics()->save($music);
        return response()->json($music, 201);
    }

    public function deleteMusic(Request $request, $album_id, $music_id)
    {
        $album = Album::find($album_id);
        if (!$album) {
            return response()->json(['error' => 'Album nao encontrado', 404]);
        }
        $music = Music::find($music_id);
        if (!$music) {
            return response()->json(['error' => 'Musica nao encontrado', 404]);
        }

        if ($music->album_id !== $album->id) {
            return response()->json(['error' => 'Esta música não pertence a este álbum'], 400);
        }

        $music->delete();
        return response()->json(['message' => 'Musica excluida com sucesso'], 200);
    }

    public function deleteAlbum(Request $request, $album_id)
    {
        $album = Album::find($album_id);

        if (!$album) {
            return response()->json(['error' => 'Album nao encontrado', 404]);
        }

        $album->delete();

        return response()->json(['message' => 'Album excluido com sucesso'], 200);
    }

    public function editAlbum(Request $request, $album_id)
    {
        $album = Album::find($album_id);
        if (!$album) {
            return response()->json(['error' => 'Album não encontrado', 404]);
        }

        $newAlbumname = strtoupper($request->input('album_name'));
        if ($newAlbumname !== $album->album_name) {
            $existingAlbum = Album::where('album_name', $newAlbumname)->first();
            if ($existingAlbum) {
                return response()->json(['error' => 'O novo nome do album já existe'], 400);
            }

            $album->album_name = $newAlbumname;
            $album->save();
        }

        return response()->json($album, 200);
    }

    public function editMusic(Request $request, $album_id, $music_id)
    {
        $album = Album::find($album_id);
        if (!$album) {
            return response()->json(['error' => 'Album nao encontrado', 404]);
        }

        $music = Music::find($music_id);
        if (!$music) {
            return response()->json(['error' => 'Musica nao encontrado', 404]);
        }

        if ($music->album_id !== $album->id) {
            return response()->json(['error' => 'Esta música não pertence a este álbum'], 400);
        }

        $request->validate([
            'music_name' => [
                'required',
                'string'
            ]
        ]);

        $newMusicName = strtoupper($request->input('music_name'));
        if ($newMusicName !== $music->music_name) {
            $existingMusic = Music::where('music_name', $newMusicName)->first();
            if ($existingMusic) {
                return response()->json(['error' => 'O novo nome da música já é utilizado'], 400);
            }
            $music->music_name = $newMusicName;
            $music->save();
        }

        return response()->json(['message' => 'Música atualizada com sucesso'], 200);
    }
}
