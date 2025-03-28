<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Folder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileController extends Controller
{
    public function index()
    {
        try {
            $files = File::with('folder')->latest()->get();
            return response()->json($files);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch files',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $r)
    {
        try {
            $validated = $r->validate([
                'file' => 'required|file|max:10240',
                'folder_id' => 'required|exists:folders,id',
                'name' => 'sometimes|string|max:255'
            ]);

            $uploadedFile = $r->file('file');
            $folder = Folder::findOrFail($validated['folder_id']);

            $originalName = $uploadedFile->getClientOriginalName();
            $filename = $validated['name'] ?? $originalName;

            $extension = pathinfo($originalName, PATHINFO_EXTENSION);
            $uniqueName = Str::random(10) . '_' . time() . '.' . $extension;

            $path = $uploadedFile->storeAs(
                "files/{$folder->path}/{$folder->id}",
                $uniqueName
            );

            $file = File::create([
                'name' => $filename,
                'folder_id' => $folder->id,
                'path' => $path,
                'size' => $uploadedFile->getSize(),
                'mime_type' => $uploadedFile->getMimeType()
            ]);

            return response()->json([
                'message' => 'File uploaded successfully',
                'file' => $file
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'File upload failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show(File $file)
    {
        return response()->json([
            'file' => [
                'id' => $file->id,
                'name' => $file->name,
                'extension' => $file->extension,
                'size' => $file->size,
                'mime_type' => $file->mime_type,
                'folder' => $file->folder
            ]
        ]);
    }

    public function destroy(File $file)
    {
        try {
            Storage::delete($file->path);
            $file->delete();

            return response()->json([
                'message' => 'File deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete file',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function indexByFolder(Folder $folder)
    {
        try {
            $files = $folder->files()->latest()->get();
            return response()->json($files);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch folder files',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
