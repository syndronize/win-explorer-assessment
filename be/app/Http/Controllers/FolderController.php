<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Folder;
use Exception;

class FolderController extends Controller
{

    public function index()
    {
        try {
            $folders = Folder::with(['children' => function ($query) {
                $query->withCount('children');
            }])
                ->whereNull('parent_id')
                ->get();

            return response()->json($folders);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Failed to load folders',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show(Folder $folder)
    {
        try {
            $folder->load(['children', 'files']);

            return response()->json([
                'current' => $folder,
                'contents' => [
                    'folders' => $folder->children,
                    'files' => $folder->files
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to load folder contents',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $r)
    {
        $validated = $r->validate([
            'name' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:folders,id'
        ]);

        $folder = Folder::create($validated);

        if ($folder->parent_id) {
            $parent = Folder::find($folder->parent_id);
            $folder->path = $parent->path ? $parent->path . '/' . $parent->id : $parent->id;
            $folder->save();
        }

        return response()->json($folder, 201);
    }
}
