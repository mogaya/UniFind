<?php

use App\Http\Controllers\FoundItemController;
use App\Http\Controllers\LostItemController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// "/report-found"
// "/found-items"
// "/my-reports"

// Public Routes
Route::get('/', function () {
    return Inertia::render('welcome/welcome');
})->name('home');

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
