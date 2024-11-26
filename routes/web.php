<?php

use App\Http\Controllers\ProductController;
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

Route::get('/', function () {
    return Inertia::render('test'); // This will get component Test.jsx from the resources/js/Pages/Test.jsx
});
Route::post('/products/create', [ProductController::class, 'store']);
Route::put('/products/{id}', [ProductController::class, 'update']);
Route::post('/products/bulk-destroy', [ProductController::class, 'bulkDestroy']);
Route::get('/categories', function () {
    return Inertia::render('categories'); // This will get component Test.jsx from the resources/js/Pages/Test.jsx
});
