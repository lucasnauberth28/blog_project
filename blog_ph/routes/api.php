<?php

use App\Http\Controllers\Api\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

    Route::get('/healthcheck', function () {
        return response()->json(['status' => 'ok'])->header('Access-Control-Allow-Origin', '*');
    });

    Route::get('/posts', [PostController::class, 'index']);
    Route::get('/posts/{post:slug}', [PostController::class, 'show'])->where('post', '[a-zA-Z0-9\-]+');
    
    Route::post('/auth/send-code', [AuthController::class, 'sendVerificationCode']);
    Route::post('/auth/verify-code', [AuthController::class, 'verifyAndLogin']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/posts', [PostController::class, 'store']);
        Route::put('/posts/{post}', [PostController::class, 'update']);
        Route::patch('/posts/{post}', [PostController::class, 'update']);
        Route::delete('/posts/{post}', [PostController::class, 'destroy']);
        
        Route::get('/user', function (Request $request) {
            return $request->user();
        });
});