<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Carbon\Carbon;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SaleController extends Controller
{
    //total sales
    public function getTotalSales()
    {
        $totalSales = Sale::sum('total_price'); // Sum of all sales
        return response()->json(['total_sales' => $totalSales]);
    }

    //can request on specific date
    public function dailySales()
    {
        $totalSales = Sale::whereDate('created_at', Carbon::today())->sum('total_price');

        return response()->json([
            'date' => Carbon::today()->toDateString(),
            'total_sales' => $totalSales
        ]);
    }

    public function monthlySales(Request $request)
    {
        // Get the requested month and year, or use the current month by default
        $month = $request->query('month', Carbon::now()->month);
        $year = $request->query('year', Carbon::now()->year);

        // Calculate total sales for the given month and year
        $totalSales = Sale::whereYear('created_at', $year)
                          ->whereMonth('created_at', $month)
                          ->sum('total_price');

        return response()->json([
            'month' => $month,
            'year' => $year,
            'total_sales' => $totalSales
        ]);
    }

    public function salesReport(): Response
    {
        $sales = Sale::selectRaw('MONTH(created_at) as month, SUM(total_price) as total_sales')
            ->whereYear('created_at', Carbon::now()->year)
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        return Inertia::render('salesReport', [
            'salesData' => $sales
        ]);
    }

}
