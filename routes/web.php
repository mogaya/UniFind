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
    return Inertia::render('ReportLost');
})->name('ReportLost');

Route::get('report-found', function () {
    return Inertia::render('ReportFound');
})->name('ReportFound');

Route::get('/found-items', function () {
    return Inertia::render('FoundItems');
})->name('FoundItems');

Route::get('my-reports', function () {
    return Inertia::render('MyReports');
})->name('MyReports');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
