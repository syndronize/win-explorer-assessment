<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FolderController;
use App\Http\Controllers\FileController;

Route::apiResource('folders', FolderController::class)->except(['update']);
Route::apiResource('files', FileController::class)->only([
    'index',
    'store',
    'show',
    'destroy'
]);
Route::get('folders/{folder}/contents', [FolderController::class, 'show']);
Route::get('folders/{folder}/files', [FileController::class, 'indexByFolder']);
