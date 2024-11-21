<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
     // Method to get all products
     public function index()
     {
         return Product::all();  // Returns all products from the database
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
             'name' => 'required|string|max:255',
             'price' => 'required|numeric',
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
}
