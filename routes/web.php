<?php

use Inertia\Inertia;
use Laravel\Fortify\Features;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\UpvoteController;
use \App\Http\Controllers\PostController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->name('dashboard');



Route::resource('posts', PostController::class);

    Route::post('posts/{post}/upvote', [UpvoteController::class, 'store'])->name('posts.upvote');
    Route::delete('posts/{post}/upvote', [UpvoteController::class, 'destroy'])->name('posts.upvote.destroy');
    Route::post('posts/{post}/comments', [CommentController::class, 'store'])->name('posts.comments.store');
    Route::delete('posts/{post}/comments/{comment}', [CommentController::class, 'destroy'])->name('posts.comments.destroy');



require __DIR__.'/settings.php';