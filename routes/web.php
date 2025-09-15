<?php

use App\Http\Controllers\FoundItemController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LostItemController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// "/my-reports"

// Public Routes
// Home
Route::resource('/', HomeController::class);

Route::get('/my-reports', function () {
    return Inertia::render('my-reports/my-reports');
})->name('my-reports');

Route::get('/item-details', function () {
    return Inertia::render('item-details');
})->name('item-details');

// lost items
Route::resource('lost-items', LostItemController::class);

// found items
Route::resource('found-items', FoundItemController::class);

// Protected Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
