<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       return Category::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
    //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_name' => 'required|string|max:255|unique:categories,category_name',
            'description' => 'nullable|string|max:255',
            'notes' => 'nullable|string|max:255',
        ]);

        $product = Category::create($validated); // Create and store the new product
        return response()->json($product, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $category = Category::with('products')->findOrFail($id); // Fetch the category and its related products
        return response()->json([
            'category' => $category
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $category = Category::findOrFail($id);

        $validated = $request->validate([
            'category_name' => 'string|max:255',
            'description' => 'string|max:255',
            'notes' => 'nullable|string|max:255',
        ]);

        $category->update($validated);
        return response()->json($category);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function bulkDestroy(Request $request)
    {
       $request->validate([
           'ids' => 'required|array',
           'ids.*' => 'integer|exists:categories,id'
       ]);

       Category::bulkDestroy($request->ids);

       // Delete categories
       return response()->json(['message' => 'Categories and their associated products have been deleted.']);
    }
}
