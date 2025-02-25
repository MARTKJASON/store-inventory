<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Sale;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use PhpOffice\PhpSpreadsheet\Cell\DataValidation;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ProductController extends Controller
{
     // Method to get all products
     public function index()
     {

         $products = Product::all();
         if (request()->wantsJson()) {
             return Product::all();
         }


         // Default Inertia response
         return Inertia::render('test', [
             'productList' => $products ,

         ]);

     }

     // Method to get a specific product by ID
     public function show($id)
     {
         return Product::findOrFail($id);  // Returns the product with the given ID
     }

     // Method to create a new product
     public function store(Request $request)
     {

         $validated = $request->validate([
             'product_name' => 'required|string|max:255',
             'category_id' => 'required|numeric',
             'pricing' => 'required|numeric',
             'stocks'=> 'required|numeric',
         ]);


         $product = Product::create($validated); // Create and store the new product
         return response()->json($product, 201);  // Return the created product
     }

     // Method to update a product
     public function update(Request $request, $id)
     {
         $product = Product::findOrFail($id); // Find the product to update

         $validated = $request->validate([
             'product_name' => 'string|max:255',
             'category_id' => 'numeric',
             'pricing' => 'numeric|min:0|max:9999999999.99',
         ]);

         $product->update($validated); // Update the product with new data
         return response()->json($product);  // Return the updated product
     }

     public function bulkUpdate(Request $request)
    {
        $validated = $request->validate([
            'products' => 'required|array',
            'products.*.id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
        ]);

        $totalSales = 0;
        DB::transaction(function () use ($validated, &$totalSales) {
            foreach ($validated['products'] as $product) {
                $dbProduct = Product::find($product['id']);

                if ($dbProduct->stocks >= $product['quantity']) {
                    $dbProduct->decrement('stocks', $product['quantity']);
                    $saleAmount = $dbProduct->pricing * $product['quantity'];
                    $totalSales += $saleAmount;

                    // Store in sales table
                    Sale::create([
                        'product_id' => $product['id'],
                        'quantity' => $product['quantity'],
                        'total_price' => $saleAmount,
                        'user_id' => auth()->id()
                    ]);
                }
            }
        });

        return response()->json([
            'message' => 'Stock updated successfully!',
            'total_sales' => $totalSales,
        ]);
    }




     // Method to delete a product
     public function destroy($id)
     {
         $product = Product::findOrFail($id); // Find the product to delete
         $product->delete();  // Delete the product
         return response()->json(['message' => 'Product deleted successfully']);
     }

     public function bulkDestroy(Request $request)
     {
        $request->validate([
            'ids' => 'required|array',
            'ids*' => 'integer|exist:products,id'
        ]);

        Product::whereIn('id', $request->ids)->delete();
     }

     public function exportCsv()
     {
        $products = Product::with('category')->select('id', 'product_name', 'category_id', 'stocks','pricing')->get();

        $response = new StreamedResponse(function () use ($products) {
            $handle = fopen('php://output', 'w');

             // Add CSV headers
        fputcsv($handle, ['Product ID', 'Product Name', 'Category', 'Stocks', 'Price']);

        // Add product data with category name
            foreach ($products as $product) {
                fputcsv($handle, [
                    $product->id,
                    $product->product_name,
                    $product->category ? $product->category->category_name : 'No Category',
                    $product->stocks,
                    $product->pricing
                ]);
            }

            fclose($handle);
          });
           $response->headers->set('Content-Type', 'text/csv');
           $response->headers->set('Content-Disposition', 'attachment; filename="products.csv"');

         return $response;
     }

     public function downloadTemplate()
     {
        $categories = Category::pluck('category_name')->toArray();

        // Create new Spreadsheet
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        // Add headers
        $sheet->setCellValue('A1', 'Product Name');
        $sheet->setCellValue('B1', 'Category');
        $sheet->setCellValue('C1', 'Stocks');
        $sheet->setCellValue('D1', 'Price');

        // Example row
        $sheet->setCellValue('A2', 'Sample Product');
        $sheet->setCellValue('B2', '');
        $sheet->setCellValue('C2', '0.00');
        $sheet->setCellValue('D2', '0');

        $categoryDropdown = implode(",", array_map(fn($c) => '"' . $c . '"', $categories));

     // Apply dropdown to "Category" column (B2:B1000)
        $validationCategory = new DataValidation();
        $validationCategory->setType(DataValidation::TYPE_LIST);
        $validationCategory->setErrorStyle(DataValidation::STYLE_STOP);
        $validationCategory->setAllowBlank(false);
        $validationCategory->setShowInputMessage(true);
        $validationCategory->setShowErrorMessage(true);
        $validationCategory->setFormula1('"' . $categoryDropdown . '"');

        // Apply number validation to "Price" column (C2:C1000)
          $validationPrice = new DataValidation();
          $validationPrice->setType(DataValidation::TYPE_DECIMAL);
          $validationPrice->setErrorStyle(DataValidation::STYLE_STOP);
          $validationPrice->setAllowBlank(false);
          $validationPrice->setShowInputMessage(true);
          $validationPrice->setShowErrorMessage(true);
          $validationPrice->setOperator(DataValidation::OPERATOR_GREATERTHAN);
          $validationPrice->setFormula1('0'); // Only allow numbers >= 0

        for ($row = 2; $row <= 1000; $row++) {
            $sheet->getCell("B$row")->setDataValidation(clone $validationCategory);
            $sheet->getCell("C$row")->setDataValidation(clone $validationPrice);
        }

        // Prepare file for download
        $writer = new Xlsx($spreadsheet);
        $fileName = "product_template.xlsx";
        $tempFile = tempnam(sys_get_temp_dir(), $fileName);
        $writer->save($tempFile);

        return response()->download($tempFile, $fileName)->deleteFileAfterSend(true);
     }
}
