<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DepositController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SaleController;
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


// Authentication Routes
Route::get('login', [UserController::class, 'showLoginForm'])->name('login');
Route::post('/loginUser', [UserController::class, 'userLogin'])->withoutMiddleware('auth');
Route::get('/register', [UserController::class, 'create'])->name('register.form');
Route::post('/register', [UserController::class, 'store']);
Route::post('/logout', [UserController::class, 'logout']);
Route::get('/auth', fn() => Auth::check() ? Auth::user() : 'Not Authenticated');

// ✅ POS Routes (Accessible to All Authenticated Users)
Route::middleware(['auth'])->group(function () {
    Route::get('/POS', fn() => Inertia::render('POS'))->where('any', '.*');
    Route::post('/products/bulk-update', [ProductController::class, 'bulkUpdate'])->name('products.bulk-update');
});

// ✅ Admin-Only Routes
Route::middleware(['auth', 'admin'])->group(function () {
    // Product Routes
    Route::get('/products', [ProductController::class, 'index'])->name('products.index');
    Route::get('/', [ProductController::class, 'index'])->name('products.index');
    Route::post('/products/create', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::post('/products/bulk-destroy', [ProductController::class, 'bulkDestroy']);

    // Category Routes
    Route::get('/category/{id}/details', [CategoryController::class, 'show']);
    Route::post('/category/create', [CategoryController::class, 'store']);
    Route::put('/category/{id}', [CategoryController::class, 'update']);
    Route::post('/categories/bulk-delete', [CategoryController::class, 'bulkDestroy']);
    Route::get('/categories', fn() => Inertia::render('categories'));

    // Sales Reports
    Route::get('/sales/total', [SaleController::class, 'getTotalSales']);
    Route::get('/sales/daily', [SaleController::class, 'dailySales']);
    Route::get('/sales/monthly', [SaleController::class, 'monthlySales']);
    Route::get('/sales-report', [SaleController::class, 'salesReport'])->name('sales.report');

    // Supplier & Notifications
    Route::get('/suppliers', [SupplierController::class, 'index'])->name('supplier.index');
    Route::post('/send-welcome-notification', [NotificationController::class, 'sendWelcomeNotification']);
    Route::get('/notifications', [NotificationController::class, 'notifications']);
    Route::post('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);

    // Deposits
    Route::post('/deposit', [DepositController::class, 'deposit'])->name('deposit');

    // Product Export & Template
    Route::get('/products/export-csv', [ProductController::class, 'exportCsv'])->name('products.export');
    Route::get('/products/template', [ProductController::class, 'downloadTemplate'])->name('products.template');
});






