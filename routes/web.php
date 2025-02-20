<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DepositController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\SupplierController;
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

Route::get('/auth', function () {
    return Auth::check() ? Auth::user() : 'Not Authenticated';
});

Route::post('/logout', [UserController::class, 'logout']);
Route::get('/POS', function () {
    return Inertia::render('POS');
})->where('any', '.*');
Route::post('/products/bulk-update', [ProductController::class, 'bulkUpdate'])->name('products.bulk-update');

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

    Route::get('/suppliers', [SupplierController::class, 'index'])->name('supplier.index');
    Route::post('/send-welcome-notification', [NotificationController::class, 'sendWelcomeNotification']);
    Route::get('/notifications', [NotificationController::class, 'notifications']);
    Route::post('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);

    Route::post('/deposit', [DepositController::class, 'deposit'])->name('deposit');

    // Route::get('/stocks', [StockController::class, 'index'])->name('stocks.index');
    Route::get('/products/export-csv', [ProductController::class, 'exportCsv'])->name('products.export');

    Route::get('/products/template', [ProductController::class, 'downloadTemplate'])->name('products.template');

});






