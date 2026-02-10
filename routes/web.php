<?php

use Inertia\Inertia;
use Laravel\Fortify\Features;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\UpvoteController;
use \App\Http\Controllers\FeatureController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('features', FeatureController::class);

    Route::post('features/{feature}/upvote', [UpvoteController::class, 'store'])->name('features.upvote');
    Route::delete('features/{feature}/upvote', [UpvoteController::class, 'destroy'])->name('features.upvote.destroy');
    Route::post('features/{feature}/comments', [CommentController::class, 'store'])->name('features.comments.store');
    Route::delete('features/{feature}/comments/{comment}', [CommentController::class, 'destroy'])->name('features.comments.destroy');
});

require __DIR__.'/settings.php';
