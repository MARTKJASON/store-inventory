<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use App\Models\User;
use App\Notifications\LowStockNotification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StockController extends Controller
{
    public function index()
    {

        $stocks = Stock::all(['product_id', 'supplier_id', 'quantity']);
        if (request()->wantsJson()) {
            return Stock::all();
        }
        // $notifications = auth()->user()->notifications()->latest()->get();

        // Default Inertia response
        return Inertia::render('test', [
            'stocks' => $stocks ,
            // 'notifications' => $notifications,
        ]);

    }

    public function notifyLowStock()
    {
        // Define the low-stock threshold
        $threshold = 5;

        // Fetch low-stock items
        $lowStockItems = Stock::where('quantity', '<=', $threshold)
            ->with('product') // Load related product info
            ->get();

            return Inertia::render('Stocks/LowStock', [
                'lowStockItems' => $lowStockItems,
                'message' => $lowStockItems->isEmpty()
                    ? 'No low-stock items to report.'
                    : 'Low-stock items found!',
            ]);

        // Fetch all admins
        $admins = User::where('is_admin', true)->get();

        // Notify admins
        foreach ($admins as $admin) {
            $admin->notify(new LowStockNotification($lowStockItems));
        }

        return redirect()->back()->with('success', 'Admins have been notified about low-stock items.');
    }
}
