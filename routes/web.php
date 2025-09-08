<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

    // "/report-lost"
    // "/report-found"
    // "/found-items"
    // "/my-reports"

Route::get('/', function () {
    return Inertia::render('welcome/welcome');
})->name('home');

Route::get('/report-lost', function () {
    return Inertia::render('report-lost');
})->name('report-lost');

Route::get('report-found', function () {
    return Inertia::render('report-found');
})->name('report-found');

Route::get('/found-items', function () {
    return Inertia::render('found-items');
})->name('found-items');

Route::get('my-reports', function () {
    return Inertia::render('my-reports');
})->name('my-reports');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
