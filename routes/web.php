<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\ClaimController;
use App\Http\Controllers\FoundItemController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LostItemController;
use App\Http\Controllers\MyReportsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Home
Route::resource('/', HomeController::class)->names('home');

// lost items
Route::resource('lost-items', LostItemController::class);

// found items
Route::resource('found-items', FoundItemController::class);

// "/my-reports"
Route::resource('my-reports', MyReportsController::class);

// dashboard
Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// Update Status
Route::patch('/lost-items/{id}/status', [LostItemController::class, 'updateStatus'])
    ->name('lost-items.updateStatus')
    ->middleware('auth');

// Admin Dashboard
Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::resource('admin-dashboard', AdminDashboardController::class);

});

// claim
Route::resource('claims', ClaimController::class)->middleware('auth');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
