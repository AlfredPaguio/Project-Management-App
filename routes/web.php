<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    // Route::get(
    //     '/dashboard',
    //     fn () => Inertia::render('Dashboard')
    // )->name('dashboard');
    Route::get(
        '/dashboard',
        [DashboardController::class, 'index']
    )->name('dashboard');

    Route::middleware(['role:admin|manager', 'permission:manage-projects'])->group(function () {
        Route::resource('project', ProjectController::class);
    });

    Route::middleware(['role_or_permission:admin|manager|view-tasks'])->group(function () {
        Route::get('/task/my-tasks', [TaskController::class, 'myTasks'])
            ->name('task.myTasks');

        Route::resource('task', TaskController::class);
    });

    Route::middleware(['role_or_permission:admin|manage-users'])->group(function () {
        Route::resource('user', UserController::class);
    });
});

Route::middleware('auth')->prefix('profile')->name('profile.')->group(function () {
    Route::get('/', [ProfileController::class, 'edit'])->name('edit');
    Route::patch('/', [ProfileController::class, 'update'])->name('update');
    Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
});

require __DIR__ . '/auth.php';
