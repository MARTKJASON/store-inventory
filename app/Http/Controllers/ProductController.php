<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ProductController extends Controller
{
     // Method to get all products
     public function index()
     {

        if (request()->wantsJson()) {
            return Product::all();
        }

        // Default Inertia response
        return Inertia::render('test', [
            'products' => Product::all(),
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
        $products = Product::with('category')->select('id', 'product_name', 'category_id', 'pricing')->get();

        $response = new StreamedResponse(function () use ($products) {
            $handle = fopen('php://output', 'w');

             // Add CSV headers
        fputcsv($handle, ['Product ID', 'Product Name', 'Category', 'Price']);

        // Add product data with category name
            foreach ($products as $product) {
                fputcsv($handle, [
                    $product->id,
                    $product->product_name,
                    $product->category ? $product->category->category_name : 'No Category',
                    $product->pricing
                ]);
            }

            fclose($handle);
          });
           $response->headers->set('Content-Type', 'text/csv');
           $response->headers->set('Content-Disposition', 'attachment; filename="products.csv"');

         return $response;
     }
}
