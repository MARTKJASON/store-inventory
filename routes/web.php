<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


Route::get('login', [UserController::class, 'showLoginForm'])->name('login');
Route::post('/loginUser', [UserController::class, 'userLogin'])->withoutMiddleware('auth');
Route::get('/register', [UserController::class, 'create'])->name('register.form');
Route::post('/register', [UserController::class, 'store']);

Route::get('/test-auth', function () {
    return Auth::check() ? Auth::user() : 'Not Authenticated';
});

Route::post('/logout', [UserController::class, 'logout']);

Route::middleware(['auth'])->group(function () {
    // Product-related routes
    Route::get('/products', [ProductController::class, 'index'])->name('products.index');
    Route::get('/', [ProductController::class, 'index'])->name('products.index');
    Route::post('/products/create', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::post('/products/bulk-destroy', [ProductController::class, 'bulkDestroy']);

    // Category-related routes
    Route::get('/category/{id}/details', [CategoryController::class, 'show']);
    Route::post('/category/create', [CategoryController::class, 'store']);
    Route::put('/category/{id}', [CategoryController::class, 'update']);
    Route::post('/categories/bulk-delete', [CategoryController::class, 'bulkDestroy']);
    Route::get('/categories', function () {
        return Inertia::render('categories');
    });
});






